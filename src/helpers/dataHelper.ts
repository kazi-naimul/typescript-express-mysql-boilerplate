/* eslint-disable no-plusplus */
const arrayDiff = (a1: Array<number | string>, a2: Array<number | string>) => {
    const a = [];
    const diff: string[] = [];

    for (let i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (let i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const k in a) {
        diff.push(k);
    }

    return diff;
};
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        // eslint-disable-next-line no-param-reassign
        array[i] = array[j];
        // eslint-disable-next-line no-param-reassign
        array[j] = temp;
    }
    return array;
};

const arrayRand = (array, limit = 1) => {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.splice(0, limit).sort();
};
const randomNumberBetweenRange = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export { arrayDiff, shuffleArray, arrayRand, randomNumberBetweenRange, randomId };
