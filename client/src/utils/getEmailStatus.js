const getEmailStatus = (value) => {
    if (value.length == 0) return 'invalid empty';
    else if (!/^[a-z]+\@[a-z]+\.[a-z]+$/.test(value)) return 'invalid';
    else return 'valid';
};

export default getEmailStatus; 