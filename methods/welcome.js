import gradient from "gradient-string";
import figlet from "figlet";
import chalk from "chalk";
import Table from 'cli-table3';

// Function to display welcome screen
const welcomeScreen = (program) => {
    console.log();
    console.log(gradient.cristal(figlet.textSync('Task Tracker', { horizontalLayout: 'full' })));
    
    //CLI info table
    const table = new Table({
        head: [chalk.blueBright('Name'), chalk.blueBright('value')],
    });
    table.push(
        { 'Name': program.name() },
        { 'Description': program.description() }
        , { 'version': program.version() }
    );
    console.log(table.toString())
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
