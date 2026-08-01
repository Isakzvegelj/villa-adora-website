import { useEffect, useRef } from 'react';

interface BentralEmbedProps {
  /** Bentral embed src, e.g. "//www.bentral.com/service/embed/booking.js?id=...&width=full&key=..." */
  src: string;
  /** Extra classes for the container div */
  className?: string;
  /** Optional container id */
  id?: string;
}

/**
 * Safely embeds a Bentral script-based widget (booking, calendar, price-list).
 *
 * React does not execute raw <script> tags from JSX. Bentral's embed scripts
 * render by calling document.write() with an <iframe> pointing at the matching
 * `.html` endpoint. document.write() is dropped (and can clobber the document)
 * when a script runs dynamically after page load, so we shim it to capture the
 * markup. Because every embed instance would otherwise fight over the single
 * global document.write, embeds are run through a module-level serial queue so
 * only one script is executing at a time — each gets an exclusive shim and the
 * captured iframe is injected into its own container.
 */
export default function BentralEmbed({ src, className, id }: BentralEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const srcRef = useRef(src);
  srcRef.current = src;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const originalWrite = document.write.bind(document);

    const run = () =>
      new Promise<void>((resolve) => {
        if (cancelled) return resolve();

        // Exclusive shim for this embed's execution window.
        const chunks: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).write = (chunk: string) => chunks.push(String(chunk));
        const shutdown = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (document as any).write = originalWrite;
        };

        const absolute = srcRef.current.startsWith('//')
          ? `https:${srcRef.current}`
          : srcRef.current;

        const script = document.createElement('script');
        script.src = absolute;
        script.async = false; // keep execution/order deterministic within queue
        const finish = () => {
          try {
            if (chunks.length) {
              container.insertAdjacentHTML('afterbegin', chunks.join(''));
            }
          } catch {
            /* ignore injection errors */
          }
          shutdown();
          resolve();
        };
        script.onload = finish;
        script.onerror = () => {
          shutdown();
          resolve();
        };
        container.appendChild(script);
      });

    // Serialize all embeds on this page to avoid document.write collisions.
    queue = queue.then(run);

    return () => {
      cancelled = true;
      container.querySelectorAll('script').forEach((s) => s.remove());
    };
  }, []);

  return <div ref={containerRef} id={id} className={className} />;
}

// Module-level promise chain serializes every BentralEmbed on the page.
let queue: Promise<void> = Promise.resolve();
