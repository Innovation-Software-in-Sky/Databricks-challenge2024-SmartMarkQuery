import { readFile } from 'fs/promises';
async function readFileContent(filePath: string): Promise<string> {
    return readFile(filePath, 'utf8');
}
export {readFileContent}
