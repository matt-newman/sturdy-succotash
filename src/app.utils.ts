import { PRICES } from "./constants";
import { Prices } from "./types";

// could make the args to this env vars if wanted
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
    const totalPrice = pouchSizes.reduce((prev:number, curr:string) => {
        return prev + PRICES[curr as keyof Prices];
    }, 0);

    return totalPrice;
}