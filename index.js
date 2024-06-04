#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { input } from "@inquirer/prompts";
import { welcomeScreen, displayHelpTable } from "./methods/welcome.js";
import { addRandom, showRandom } from "./methods/task.js";

program.helpInformation = function () {
	return ''
};

program
	.name('Task Tracker')
	.version("0.0.1")
	.usage('[command] [options]')
	.description('Task tracker for your project');

program
	.option('-r, --red', 'shows red color')
	.option('-b, --blue', 'shows blue color')

const ops = program.opts()
program
	.command('add <task>')
	.description('Asks for your task and then shows')
	.action(async (task) => {
		const answer = await input({ message: 'What is your name big boy?' });
		const red = ops.red;
		const blue = ops.blue
		if (red) {
			console.log(chalk.red(answer));
		} else if (blue) {
			console.log(chalk.cyanBright(answer));
		} else {
			console.log(chalk.bgWhiteBright.black(answer));
		}
		console.log(`Task: ${task}`);
	})

program
	.command('rand')
	.description('Adds random things to the file')
	.action(async () => {
		const ans1 = await input({ message: 'what do you want to add' });
		addRandom(ans1)
	})

program
	.command('list')
	.description('List all the file content')
	.action(() => {
		showRandom()
	})
	
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
