#!/usr/bin/env node
/**
 * Sitemap generator for Villa Adora
 * Run: node scripts/generate-sitemap.js
 * Outputs: public/sitemap.xml
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://villa-adora-bled.si';
const LANGUAGES = ['en', 'sl', 'de', 'it'];

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

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const page of pages) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;

    // Hreflang alternates
    for (const lang of LANGUAGES) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${page.path}"/>\n`;
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const outputPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated: ${outputPath} (${pages.length} URLs)`);
}

generateSitemap();
