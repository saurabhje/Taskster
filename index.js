#!/usr/bin/env node

import { program } from "commander";
import { input } from "@inquirer/prompts";
import { select } from '@inquirer/prompts';
import { welcomeScreen, displayHelpTable } from "./methods/welcome.js";
import { addTask, clearFile, readTasks, deleteTask, editTask } from "./methods/task.js";

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
	})

program
	.command('list')
	.alias('lt')
	.description('List all the tasks')
	.action(() => {
		const tasks = readTasks()
		console.log(tasks)
	})

program
	.command('delete')
	.alias('d')
	.description('Remove the task(s) using ID')
	.option('-a, --all', 'Delete all tasks')
	.action(async(cmdargs) => {
		if (cmdargs.all) {
			clearFile();
			console.log('Cleared all the tasks');
		} else {
			const id = await input ({message: 'ID of the task you want to delete'})
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
	});

program
	.command('edit <id>')
	.alias('e')
	.description('Edit tasks(title/priority) using ID')
	.action(async (id) => {
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

process.on("SIGINT", function () {
	console.log("Exiting the program...");
	process.exit();
  });
program.parse(process.argv)
