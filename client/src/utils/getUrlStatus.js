const getUrlStatus = (value) => {
    if (value.length == 0) return 'invalid empty';
    else if (!/^https?:\/\/.+/.test(value)) return 'invalid';
    else return 'valid';
};

export default getUrlStatus; 