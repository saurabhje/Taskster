#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { input } from "@inquirer/prompts";
import { select } from '@inquirer/prompts';
import { welcomeScreen, displayHelpTable } from "./methods/welcome.js";
import { addTask, clearFile, readTasks, deleteTask } from "./methods/task.js";

program.helpInformation = function () {
	return ''
};

program
	.name('Task Tracker')
	.version("0.0.1")
	.usage('[command] [options]')
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
					description: 'tasks that can be neglected.'
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
	.command('delete <id>')
	.alias('d')
	.description('Remove the task(s)')
	.option('-a, --all', 'Delete all tasks')
	.action((id, cmdargs) => {
		if (cmdargs.all) {
			clearFile();
			console.log('Cleared all the tasks');
		} else {
			if (id) {
				const tasks = readTasks()
				
				deleteTask(id);
			} else {
				console.log('No option provided. Use --all to clear all tasks or provide a task ID to delete a specific task.');
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
