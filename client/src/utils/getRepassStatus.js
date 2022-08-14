const getRepassStatus = (value, valuePassword) => {
    if (value.length == 0) return 'invalid empty';
    else if (value !== valuePassword) return 'invalid no-match';
    else return 'valid';
};

export default getRepassStatus; 