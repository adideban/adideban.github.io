import fs from 'fs';
import path from 'path';

export function getRandomIcons(count: number): string[] {
  const iconsDirectory = path.join(process.cwd(), 'public/icons');
  const iconFiles = fs.readdirSync(iconsDirectory);
  
  const shuffled = iconFiles.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(file => `/icons/${file}`);
}