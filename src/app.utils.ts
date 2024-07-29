export const pluralise = (terms: Array<string>, seperator: string = ", ", concatTerm: string = " and "): string => {
    let output = "";
    const last = terms.pop() as string;

    if (terms.length === 0) {
        return last;
    }

    output = terms.join(seperator);
    output = output + `${concatTerm}${last}`

    return output;
}