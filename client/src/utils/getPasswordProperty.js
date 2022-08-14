const getPasswordProperty = (e) => {
    const currentInput = e.target.parentElement.firstChild.getAttribute('for');
    const currentInputCapitalized = currentInput.slice(0, 1).toLocaleUpperCase() + currentInput.slice(1);
    const stateProperty = `visible${currentInputCapitalized}`;
    
    return stateProperty;
};

export default getPasswordProperty; 