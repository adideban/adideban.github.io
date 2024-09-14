import fs from 'fs';
import path from 'path';

export function getImageFilenames(): string[] {
  const printsDirectory = path.join(process.cwd(), 'public', 'prints');
  
  try {
    const filenames = fs.readdirSync(printsDirectory);
    
    // filter for image files by default
    const imageFilenames = filenames.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(extension);
    });
    
    return imageFilenames;
  } catch (error) {
    console.error('Error reading prints directory:', error);
    return [];
  }
}