import fs from 'fs';
import path from 'path';
import os from 'os'

// This adds a tasktracker directory in the project's dir
const appDir = path.join(os.homedir(), '.tasktracker');
const filepath = path.join(appDir, 'data.json');

if(!fs.existsSync(appDir)){
    fs.mkdirSync(appDir)
}
if(!fs.existsSync(filepath)){
    fs.writeFileSync(appDir)
}

