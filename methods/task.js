import fs from 'fs';
import path from 'path';
import os from 'os';
import Table from 'cli-table3';
import chalk from "chalk";


const appDir = path.join(process.cwd(), '.taskster');
const filepath = path.join(appDir, 'data.json');

function generateID() {
    const idCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let id = '';

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * idCharacters.length);
        id += idCharacters[randomIndex];
    }
    return id;
}


function readTasks() {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log('Error reading the tasks:', error)
        return [];
    }
}

function clearFile() {
    fs.writeFileSync(filepath, '');
}


function addTask(title, priority) {
    const tasks = readTasks()
    const newTask = {
        "id": generateID(),
        "title": title,
        "priority": priority,
        "dateAdded": new Date().toDateString(),
        "timeAdded": new Date().toLocaleTimeString()
    }
    tasks.push(newTask)
    try {
        fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2))
    } catch (error) {
        console.log('Error Adding Task : ', error);
    }
    console.log('Content appended successfully!: ', title, 'priority: ', priority);

}

function editTask(id, { editType, newTitle, newPrior }) {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        console.log('No such task found');
        return;
    }

    let updatedTask = tasks[taskIndex];

    if (editType === 'title') {
        updatedTask.title = newTitle;
    } else if (editType === 'priority') {
        updatedTask.priority = newPrior;
    } else {
        console.log('Invalid edit type');
        return;
    }

    tasks[taskIndex] = updatedTask;

    try {
        fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
        console.log('Task updated');
    } catch (error) {
        console.log('Error updating task:', error);
    }
}

function deleteTask(id) {
    const tasks = readTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    try {
        fs.writeFileSync(filepath, JSON.stringify(updatedTasks, null, 2));
        console.log(`Task with ID ${id} deleted successfully!`);
    } catch (error) {
        console.log('Error deleting task:', error);
    }
}

function listAlltasks(){
    const tasks = readTasks()
    if(tasks.length == 0 ){
        console.log(chalk.bgMagentaBright('There are no tasks to display :('))
        return;
    }
    const taskTable = new Table({
        head: [
            chalk.blue('ID'),
            chalk.blue('Task'),
            chalk.blue('Priority'),
            chalk.blue('Time Added'),
            chalk.blue('Date Added')
          ],
    })
    tasks.forEach(element => {
        let formattedTitle =  element.title;
        if (element.priority === 'high'){
            formattedTitle = chalk.redBright(element.title)
          } else if(element.priority === 'medium'){
            formattedTitle =  chalk.yellowBright(element.title)
          }else{
            formattedTitle = chalk.greenBright(element.title)
          }
        taskTable.push([
          element.id,
          formattedTitle,
          element.priority,
          element.timeAdded,
          element.dateAdded,
        ]);
      });
      
    console.log(taskTable.toString())
}
function userPromptError(message){
    if (message.includes('User force closed the prompt')) {
        console.log(chalk.yellow(`Prompt was interrupted by the user.\n Exiting the program...`));			
    }else{
        console.log(chalk.redBright(`An unexpected error encountered\n Exiting the program...`, message))
    }
}
export { addTask, readTasks, clearFile, deleteTask, editTask, listAlltasks, userPromptError };
