const getRequiredInputStatus = (value) => {
    if (value.length == 0) return 'invalid empty';
    else return 'valid';
};

export default getRequiredInputStatus; 