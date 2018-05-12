
const chalk = require('chalk');

const OutputTypes = {
    "none": (x) => { return x; },
    "info": (x) => { return chalk.cyan(x);},
    "warning": (x) => { return chalk.yellow(x);},
    "error": (x) => { return chalk.red(x);},
    "success": (x) => { return chalk.green(x);}
};

function formatConsoleOutput(msg, type="none" ){
    console.log(OutputTypes[type](msg), '\n');
}

module.exports = formatConsoleOutput;