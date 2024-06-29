import chalk from "chalk";
import Table from 'cli-table3';
import boxen from "boxen";

// Function to display welcome screen
const welcomeScreen = (program) => {
    const message = `${chalk.bold.bgMagentaBright(program.name())}\n${program.description()}\n ${program.version()}`
    const options = {
        padding: 1,
        margin: 1,
        align: 'center',
        borderColor: '#5d8390',
        title : 'TaskTracker',
        titleAlignment: 'center'
    }
    const box = boxen(message, options);
    console.log(box);
}


// Function to display help table
const displayHelpTable = (program) => {
    const helptable = new Table();
    helptable.push([
        { colSpan: 2, content: chalk.blueBright('Options') }
    ]);

    program.options.forEach(option => {
        helptable.push({
            [chalk.greenBright(option.flags)]: option.description
        });
    });

    helptable.push([
        { colSpan: 2, content: chalk.blueBright('Commands') }
    ]);

    program.commands.forEach(command => {
        helptable.push({
            [chalk.greenBright(command.name() + '' + command.usage())]: command.description()
        });
    });
    console.log(helptable.toString());
}

export { displayHelpTable, welcomeScreen };
