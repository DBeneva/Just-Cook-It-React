const getPasswordStatus = (value, form) => {
    if (value.length == 0) return 'invalid empty';
    else if (value.length < 5) return 'invalid too-short';
    else if (form && /[а-яА-Я]/.test(value)) return 'invalid non-latin-letters';
    else if (form && !/[\!\?@\#\$%\^\&\*\(\)]/.test(value)) return 'invalid no-special-symbol';
    else return 'valid';
};

export default getPasswordStatus; 