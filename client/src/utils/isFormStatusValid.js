const isFormStatusValid = (state, form) => {
    const fieldsWithStatus = Object.entries(state).filter(([k, v]) => v.status);

    return form
        ? fieldsWithStatus.every(([k, v]) => v.status === 'valid')
        : fieldsWithStatus.every(([k, v]) => v.status === 'valid' || v.status === 'untouched');
};

export default isFormStatusValid;