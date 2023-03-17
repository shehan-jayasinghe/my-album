const toTitleCase = text => {
    let upper = true;
    let newStr = "";
    const str=text.replace(/[-_]/g," ").trim();
    for (let i = 0, l = str.length; i < l; i++) {
        if (str[i] === " ") {
            upper = true;
            newStr += " ";
            continue;
        }
        newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
        upper = false;
    }
    return newStr;
};

export {
    toTitleCase,
};
