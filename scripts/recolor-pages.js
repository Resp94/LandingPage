import fs from 'fs';
import path from 'path';

const files = [
    'src/pages/privacidade.astro'
];

for (const file of files) {
    const filePath = path.resolve(file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace colors
    content = content
        // Backgrounds
        .replace(/bg-zinc-950/g, 'bg-surface-primary')
        .replace(/bg-zinc-900/g, 'bg-surface-secondary')
        .replace(/bg-zinc-800/g, 'bg-surface-tertiary')
        .replace(/bg-emerald-500\/10/g, 'bg-accent/10')
        .replace(/bg-emerald-500\/20/g, 'bg-accent/20')
        // Texts
        .replace(/text-zinc-100/g, 'text-white/90')
        .replace(/text-zinc-300/g, 'text-white/80')
        .replace(/text-zinc-400/g, 'text-white/60')
        .replace(/text-zinc-500/g, 'text-white/50')
        .replace(/text-emerald-\d+([a-zA-Z\/0-9]*)/g, 'text-accent$1')
        // Borders
        .replace(/border-zinc-800/g, 'border-surface-tertiary')
        .replace(/border-zinc-700/g, 'border-surface-tertiary')
        .replace(/border-emerald-500/g, 'border-accent')
        .replace(/border-emerald-400/g, 'border-accent')
        // Rings
        .replace(/ring-emerald-500/g, 'ring-accent')
        .replace(/ring-offset-zinc-950/g, 'ring-offset-surface-primary')
        // Misc
        .replace(/shadow-emerald-500\/10/g, 'shadow-accent/10')
        .replace(/shadow-\[inset_0_0_12px_rgba\(16,185,129,0\.1\)\]/g, 'shadow-[inset_0_0_12px_rgba(252,84,0,0.1)]')
        .replace(/shadow-\[0_0_15px_rgba\(16,185,129,0\.1\)\]/g, 'shadow-[0_0_15px_rgba(252,84,0,0.1)]')
        .replace(/prose-emerald/g, 'prose-accent');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
}
