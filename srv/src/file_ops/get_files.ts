import { readdir } from 'fs/promises';
import path from 'path';
async function getFiles(dir: string, extenstion: string): Promise<string[]> {
    const subdirs = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir.name);
      return subdir.isDirectory() ? getFiles(res,extenstion) : res;
    }));
    return files.flat().filter(file => file.endsWith(extenstion));
}

export {getFiles}