import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get('count') || '5', 10);

  const iconsDirectory = path.join(process.cwd(), 'public/icons');
  const iconFiles = fs.readdirSync(iconsDirectory);
  
  const shuffled = iconFiles.sort(() => 0.5 - Math.random());
  const selectedIcons = shuffled.slice(0, count).map(file => `/icons/${file}`);

  return NextResponse.json(selectedIcons);
}