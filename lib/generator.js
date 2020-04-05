const fs = require('fs');
const path = require('path');
const pify = require('pify');
const YAML = require('yamljs');
const { parseDateOutput } = require('./datetime');
const { cyrillicToTranslit } = require('./text');

function prepareResult(answers) {
    // yyyy-mm-dd-event-name.yml
    const { year, month, day } = parseDateOutput(answers['date-start']);
    const filename = `${year}`.padStart('0', 4) + '-' +
        `${month}`.padStart('0', 4) + '-' +
        `${day}`.padStart('0', 4) + '-' + cyrillicToTranslit(answers.name) + '.yml';

    const result = {
        name: answers.name.includes('#') ? `'${answers.name}'` : answers.name,
        date: answers['date-start'] + (answers['one-day'] ? '' : '-' + answers['date-end']),
        time: answers['time-start'] + '-' + answers['time-end'],
        city: answers.city,
        link: answers.link,
    };

    if (answers.online) {
        result.online = true;
    }

    return {
        output: result,
        filename,
    };
}

function saveToFile({ output, filename }) {
    const PATH_EVENTS = path.resolve(__dirname, '../events');
    const PATH_NEW_FILE = path.resolve(PATH_EVENTS, filename);

    if (!fs.existsSync(PATH_EVENTS)) {
        fs.mkdirSync(PATH_EVENTS);
    }

    const writeFile = pify(fs.writeFile);
    const yaml = YAML.stringify(output, 4);

    console.log('\n' + yaml);
    console.log('Сохранено в файл ' + PATH_NEW_FILE);

    return writeFile(PATH_NEW_FILE, yaml);
}

module.exports = {
    prepareResult,
    saveToFile,
};
