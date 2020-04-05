const URL = require('url').URL;
const {
    dateFormat,
    getDateFromString,
    isValidDate,
    timeFormat,
    getTimeFromString,
    isValidTime,
} = require('./datetime');
const constants = require('./constants');

function prepareQuestions() {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'Название события',
            validate(value) {
                if (!value.trim()) return constants.EMPTY_STRING_MESSAGE;
                return true;
            },
            filter(value) {
                return value.trim();
            },
        },
        {
            type: 'list',
            name: 'one-day',
            message: 'Событие однодневное?',
            choices: ['Да', 'Нет'],
            default: 0,
            filter(input) {
                return input === 'Да';
            },
        },
        {
            type: 'input',
            name: 'date-start',
            message: (answers) => answers['one-day'] ?
                'День события (dd.mm.yyyy)' :
                'Первый день события (dd.mm.yyyy)',
            transformer: value => dateFormat(value, true),
            validate: function(value) {
                if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return constants.DATE_FORMAT_MESSAGE;

                if (!isValidDate(value)) {
                    return constants.DATE_CHECK_DATE_MESSAGE;
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'date-end',
            message: 'Последний день события (dd.mm.yyyy)',
            transformer: value => dateFormat(value, true),
            validate: function(value, answers) {
                if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return constants.DATE_FORMAT_MESSAGE;

                if (!isValidDate(value)) {
                    return constants.DATE_CHECK_DATE_MESSAGE;
                }

                const start = getDateFromString(answers['date-start']);
                const end = getDateFromString(value);
                if (start.getTime() >= end.getTime()) {
                    return constants.TIME_TRAVEL_MESSAGE;
                }

                return true;
            },
            when: answers => !answers['one-day'],
            default(answers) {
                const dateStart = getDateFromString(answers['date-start']);
                dateStart.setDate(dateStart.getDate() + 1);
                return `${dateStart.getDate()}`.padStart('0', 2) + '.' +
                    `${dateStart.getMonth() + 1}`.padStart('0', 2) + '.' +
                    `${dateStart.getFullYear()}`;
            }
        },
        {
            type: 'input',
            name: 'time-start',
            message: 'Время начала (hh:mm)',
            transformer: value => timeFormat(value, true),
            validate: function(value) {
                if (!isValidTime(value)) return constants.TIME_FORMAT_MESSAGE;

                return true;
            },
        },
        {
            type: 'input',
            name: 'time-end',
            message: 'Время окончания (hh:mm)',
            transformer: value => timeFormat(value, true),
            validate: function(value, answers) {
                if (!isValidTime(value)) return constants.TIME_FORMAT_MESSAGE;

                const timeStart = getTimeFromString(answers['time-start']);
                const timeEnd = getTimeFromString(value);

                if (timeEnd <= timeStart) {
                    return constants.TIME_TRAVEL_MESSAGE;
                }

                return true;
            },
        },
        {
            type: 'input',
            name: 'city',
            message: 'Город',
            validate(value) {
                if (!value.trim()) return constants.EMPTY_STRING_MESSAGE;
                return true;
            },
            filter(value) {
                return value.trim();
            },
        },
        {
            type: 'input',
            name: 'link',
            message: 'Ссылка на страничку события в Интернете',
            validate(value) {
                try {
                    new URL(value);
                } catch (_) {
                    return 'Введите валидный адрес странички, начинающийся с http(s)://';
                }

                return true;
            },
            filter(value) {
                return value.trim();
            },
        },
        {
            type: 'list',
            name: 'online',
            message: 'Событие пройдёт онлайн?',
            choices: ['Да', 'Нет'],
            default: 0,
            filter(input) {
                return input === 'Да';
            },
        },
    ];
}

module.exports = {
    prepareQuestions,
};
