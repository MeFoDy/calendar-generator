function cyrillicToTranslit(input) {
    const cyrillicMap = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'j',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sch',
        'ы': 'i',
        'э': 'e',
        'ю': 'u',
        'я': 'ya',
    };
    return input
        .toLowerCase()
        .split('')
        .map(letter => {
            if (/[a-z\-\d]/.test(letter)) return letter;
            if (letter === ' ') return '-';
            if (cyrillicMap.hasOwnProperty(letter)) return cyrillicMap[letter];
        })
        .filter(Boolean)
        .join('');
}

module.exports = {
    cyrillicToTranslit,
};
