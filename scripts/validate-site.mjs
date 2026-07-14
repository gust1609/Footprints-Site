import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
const issues = [];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const jsonLdBlocks = [];

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      jsonLdBlocks.push(JSON.parse(match[1]));
    } catch (error) {
      issues.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|data:|#)/.test(value)) continue;

    const [relativePath, fragment] = value.split('#');
    const targetPath = path.resolve(path.dirname(filePath), relativePath);
    if (!fs.existsSync(targetPath)) {
      issues.push(`${file}: missing local target ${value}`);
      continue;
    }

    if (fragment && targetPath.endsWith('.html')) {
      const targetHtml = fs.readFileSync(targetPath, 'utf8');
      const idPattern = new RegExp(`id=["']${escapeRegExp(fragment)}["']`);
      if (!idPattern.test(targetHtml)) issues.push(`${file}: missing fragment ${value}`);
    }
  }

  if (!/rel="canonical"/.test(html)) issues.push(`${file}: missing canonical URL`);

  if (file === 'faq.html') {
    const graph = jsonLdBlocks.flatMap((block) => block['@graph'] ?? [block]);
    const faqSchema = graph.find((entry) => entry['@type'] === 'FAQPage');
    const schemaQuestions = faqSchema?.mainEntity?.map((entry) => entry.name) ?? [];
    const visibleQuestions = [...html.matchAll(/<button[^>]*>([^<]+)<span class="faq-icon"/g)].map((match) => match[1].trim());

    if (schemaQuestions.length !== visibleQuestions.length) {
      issues.push(`faq.html: ${schemaQuestions.length} schema questions but ${visibleQuestions.length} visible questions`);
    } else {
      for (const question of visibleQuestions) {
        if (!schemaQuestions.includes(question)) issues.push(`faq.html: schema is missing “${question}”`);
      }
    }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files: JSON-LD, canonicals, local links, images, fragments, and FAQ parity.`);
