const getNameStatus = (value, form) => {
    if (value.length == 0) return 'invalid empty';
    else if (form && /[^a-zA-Z]/.test(value)) return 'invalid non-alphanumeric';
    else if (value.length < 3) return 'invalid too-short';
    else return 'valid';
};

export default getNameStatus; 