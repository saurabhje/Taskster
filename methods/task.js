import fs from 'fs';
import path from 'path';
import os from 'os'

const appDir = path.join(os.homedir(), '.tasktracker');
const filepath = path.join(appDir, 'data.json');

export function addRandom(task) {
    fs.appendFileSync(filepath, task);
    console.log('Content appended successfully!');
}

export function showRandom() {
    const data = fs.readFileSync(filepath)
    console.log(data.toString())
}
