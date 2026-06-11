#!/usr/bin/env node
/**
 * Sitemap generator for Villa Adora
 * Run: node scripts/generate-sitemap.js
 * Outputs: public/sitemap.xml
 * 
 * Generates a multilingual sitemap with hreflang annotations.
 * Each page is listed once with alternates for all supported languages.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://villa-adora-bled.si';
const LANGUAGES = ['en', 'sl', 'de', 'it'];
const DEFAULT_LANG = 'en';

// Page definitions with per-language path overrides (if different from default)
const pages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/suites', priority: 0.9, changefreq: 'weekly' },
  { path: '/activities', priority: 0.7, changefreq: 'monthly' },
  { path: '/gallery', priority: 0.7, changefreq: 'monthly' },
  { path: '/wellness', priority: 0.7, changefreq: 'monthly' },
  { path: '/weddings', priority: 0.8, changefreq: 'monthly' },
  { path: '/offers', priority: 0.8, changefreq: 'weekly' },
  { path: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { path: '/reservation', priority: 0.9, changefreq: 'monthly' },
  { path: '/gift-voucher', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
];

/**
 * Build the URL for a given page and language.
 * Default language (en) uses the root path without prefix.
 * Other languages use /{lang}/ prefix.
 */
function buildUrl(path, lang) {
  if (lang === DEFAULT_LANG) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${lang}${path}`;
}

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  const totalUrls = pages.length * LANGUAGES.length;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const page of pages) {
    // For each page, emit one <url> block per language with alternates
    for (const lang of LANGUAGES) {
      const loc = buildUrl(page.path, lang);
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;

      // Hreflang alternates for all languages
      for (const altLang of LANGUAGES) {
        const altLoc = buildUrl(page.path, altLang);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}"/>\n`;
      }

      // x-default points to the default language
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(page.path, DEFAULT_LANG)}"/>\n`;

      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  const outputPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`   Pages: ${pages.length} × ${LANGUAGES.length} languages = ${totalUrls} URLs`);
}

generateSitemap();
