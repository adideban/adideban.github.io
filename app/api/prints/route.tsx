import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const printsDirectory = path.join(process.cwd(), 'public', 'prints');
  
  try {
    const filenames = fs.readdirSync(printsDirectory);
    const imageFilenames = filenames.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(extension);
    });
    
    return NextResponse.json(imageFilenames);
  } catch (error) {
    console.error('Error reading prints directory:', error);
    return NextResponse.json([]);
  }
}