export const encodeToBase64 = (string) => Buffer.from(string).toString('base64');

export const decodeToAscii = (encodedString) =>
    Buffer.from(encodedString, 'base64').toString('ascii');

export const sleep = (ms: number) =>
    new Promise((resolve) => {
        console.log('Sleeping');
        // eslint-disable-next-line no-promise-executor-return
        setTimeout(resolve, ms);
    });
