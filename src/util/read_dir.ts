import fs from 'fs';
import path from 'path';

/**
 * Given a directory within the 'public' folder of the root directory, returns a list of all file names.
 * Note that this function needs to work on a hosted website, so it must be able to read files from the 'public' folder.
 * @param dir
 */
export function readDirFiles(dir: string) {
    const directoryPath = path.join(__dirname, '../public', dir);
    const files = fs.readdirSync(directoryPath);
    return files;
}