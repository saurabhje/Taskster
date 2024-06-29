import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname
const __direname = path.dirname(__filename);
// This adds a tasktracker directory in the project's dir

const appDir = path.resolve(__dirname,'..', '.tasktracker');
const filepath = path.join(appDir, 'data.json');

if(!fs.existsSync(appDir)){
    fs.mkdirSync(appDir)
}
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify([], { spaces: 2 }), 'utf8');
  }

