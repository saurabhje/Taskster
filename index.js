#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { input } from "@inquirer/prompts";
import figlet from "figlet";
import gradient from "gradient-string";

// Welcome screen

console.log()
console.log(gradient.cristal(figlet.textSync('Project-Todo', {font: 'Banner3'})))
console.log()

program
	.name('Project Todo')
	.version("0.0.1")
	.description("Project Todo CLI");
program
	.option('-r, --red', 'shows red color')
	.option('-b, --blue', 'shows blue color')

const ops = program.opts()
program
	.command('name <task>')
	.description('Asks for your task and then shows')
	.action(async (task) => {
		const answer = await input({ message: 'What is your name big boy?' });
		const red = ops.red;
		const blue = ops.blue
		if (red) {
			console.log(chalk.red(answer));
		}else if(blue){
			console.log(chalk.cyanBright(answer));
		}else {
			console.log(chalk.bgWhiteBright.black(answer));
		}
		console.log(`Task: ${task}`);
	})

program.parse(process.argv)


