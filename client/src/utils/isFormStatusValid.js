const isFormStatusValid = (state) => {
    return (Object.entries(state).filter(([k, v]) => v.status).every(([k, v]) => v.status === 'valid'));
};

export default isFormStatusValid; 