import fs from 'fs';
import path from 'path';
import os from 'os'

const appDir = path.join(os.homedir(), '.tasktracker');
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


function addTask(task, priority) {
    const tasks = readTasks()
    const newTask = {
        "id": generateID(),
        "task": task,
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
    console.log('Content appended successfully!: ', task);

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


export { addTask, readTasks, clearFile, deleteTask, editTask };