import { readFileSync } from 'fs';

export const readFile = (filePath) => {
  const file = readFileSync(filePath, 'utf8');
  
  return file
    .split('\n')
    .filter(Boolean);
};
