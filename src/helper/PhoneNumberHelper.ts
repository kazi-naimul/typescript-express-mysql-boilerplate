const usaNumberFormatForView = (phoneNumberString: string) => {
    // eslint-disable-next-line no-param-reassign
    phoneNumberString = phoneNumberString.replace('+', '');
    let formattedNumber = '+';
    formattedNumber += phoneNumberString.substring(0, 1);
    formattedNumber += `(${phoneNumberString.substring(1, 4)})`;
    formattedNumber += `${phoneNumberString.substring(4, 7)}-`;
    formattedNumber += phoneNumberString.substring(7, 11);
    return formattedNumber;
};

const checkIfClientPhoneNumberValid = (phoneNumber: number | string) => {
    let number = phoneNumber.toString();
    number = number.replace('+', '').trim();

    return number.length === 11;
};

module.exports = {
    usaNumberFormatForView,
    checkIfClientPhoneNumberValid,
};
