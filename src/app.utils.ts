export const pluralise = (terms: Array<string>, seperator: string = ", ", joiningTerm: string = " and "): string => {
    let output = "";
    const last = terms.pop() as string;

    if (terms.length === 0) {
        return last;
    }
    
    output = `${terms.join(seperator)}${joiningTerm}${last}`

    return output;
}

export const calculatePrice = ( pouchSizes: Array<string> = [] ) => {
    return 0;
}