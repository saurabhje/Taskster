#!/usr/bin/env node
import { program } from "commander";
import { confirm, input, select} from "@inquirer/prompts";
import { welcomeScreen, displayHelpTable } from "./methods/welcome.js";
import { addTask, clearFile, readTasks, deleteTask, editTask, listAlltasks, userPromptError } from "./methods/task.js";
import fs from 'fs';
import path from 'path';

// This adds a tasktracker directory in the project's dir

const appDir = path.join(process.cwd(), '.taskster');
const filepath = path.join(appDir, 'data.json');

if(!fs.existsSync(appDir)){
    fs.mkdirSync(appDir)
}
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify([], { spaces: 2 }), 'utf8');
  }

  
program.helpInformation = function () {
	return ''
};

program
	.name('Task Tracker')
	.version("0.0.1")
	.description('Task tracker for your project');


program
	.command('add')
	.description('Add a new task')
	.alias('a')
	.action(async () => {
		try {
			const ans1 = await input({ message: 'Task title?' });
			const priority = await select({
				message: 'Select the task priority',
				choices: [
					{
						name: 'High priority',
						value: 'high',
						description: 'Urgent and important, requires immediate attention.'
					},
					{
						name: 'Medium priority',
						value: 'medium',
						description: 'Important task, but don\'t need immediate attention.'
					},
					{
						name: 'Low priority',
						value: 'low',
						description: 'tasks that can be neglected for current time being.'
					}
				]
			})
			console.log(priority)
			addTask(ans1, priority)
		} catch (error) {
			if (error.message){
				userPromptError(error.message)
			}
		}
	})
program
	.command('list')
	.alias('l')
	.description('List all the tasks')
	.action(() => {
		listAlltasks();
	})

program
	.command('delete')
	.alias('d')
	.description('Remove the task(s) using ID')
	.option('-a, --all', 'Delete all tasks')
	.action(async (cmdargs) => {
		try{
			if (cmdargs.all) {
				const ans = await confirm({ message: 'Doing this will delete all the tasks, Are you sure?' })
				if (ans == true) {
					clearFile();
					console.log('Deleted all the tasks');
				} else {
					return;
				}
			} else {
				const id = await input({ message: 'ID of the task you want to delete' })
				if (id) {
					const tasks = readTasks();
					const taskWithID = tasks.find(task => task.id == id);
					if (taskWithID) {
						deleteTask(id);
					} else {
						console.log(`No task found with ID: ${id}`);
					}
				} else {
					console.log('No option provided. Use --all to clear all tasks or provide a task ID to delete a specific task.');
				}
			}
		}catch(error){
			if (error.message){
				userPromptError(error.message)
			}
		}
	});

program
	.command('edit <id>')
	.alias('e')
	.description('Edit tasks(title/priority) using ID')
	.action(async (id) => {
		try{
			const editType = await select({
				message: 'What do you want to edit',
				choices: [
					{
						name: 'title',
						description: 'edit the title of the task',
						value: 'title'
					},
					{
						name: 'priority',
						description: 'change the priority of the task',
						value: 'priority'
					},
				]
			});
	
			if (editType === 'title') {
				const newTitle = await input({ message: `New Title of the task` });
				editTask(id, { editType, newTitle });
			}
	
			if (editType === 'priority') {
				const newPrior = await select({
					message: 'Choose new task priority',
					choices: [
						{
							name: 'High priority',
							value: 'high',
							description: 'Urgent and important task, requires immediate attention.'
						},
						{
							name: 'Medium priority',
							value: 'medium',
							description: 'Important task, but don\'t need immediate attention.'
						},
						{
							name: 'Low priority',
							value: 'low',
							description: 'tasks that can be neglected for current time being.'
						}
					]
				});
				editTask(id, { editType, newPrior });
			}
		}catch(error){
			if (error.message){
				userPromptError(error.message)
			}
		}
	});


program
	.command('help')
	.description('Displays help information')
	.action(() => {
		displayHelpTable(program)
	})

if (process.argv.length <= 2) {
	welcomeScreen(program);
	displayHelpTable(program);
}

program.parse(process.argv)
