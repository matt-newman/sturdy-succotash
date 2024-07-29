export const pluralise = (terms: Array<string>, seperator: string = ", ", joiningTerm: string = " and "): string => {
    let output = "";
    const last = terms.pop() as string;

    if (terms.length === 0) {
        return last;
    }
    
    output = `${terms.join(seperator)}${joiningTerm}${last}`

    return output;
}

export const calculatePrice = ( pouchSizes: Array<string> = [] ): number => {
    type Prices = { A: number, B: number, C: number, D: number, E: number, F: number };
    const prices = {
        "A": 55.5,
        "B": 59.5,
        "C": 62.75,
        "D": 66.0,
        "E": 69.0,
        "F": 71.25,
    };

    const totalPrice = pouchSizes.reduce((prev:number, curr:string) => {
        return prev + prices[curr as keyof Prices];
    }, 0);

    return totalPrice;
}