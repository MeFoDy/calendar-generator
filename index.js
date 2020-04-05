const inquirer = require('inquirer');
const { prepareQuestions } = require('./lib/questions');
const { prepareResult, saveToFile } = require('./lib/generator');

inquirer
    .prompt(prepareQuestions())
    .then(prepareResult)
    .then(saveToFile)
    .catch(err => {
        console.error('Что-то пошло не так... \n' + err);
        process.exit(1);
    });

