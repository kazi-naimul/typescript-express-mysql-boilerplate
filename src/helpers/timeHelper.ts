import { parseISO } from 'date-fns';
import * as dateFns from 'date-fns-tz';

const { format, utcToZonedTime, zonedTimeToUtc } = dateFns;
/**
 * Covert timezone
 * @param {String/Date} inputTime
 * @param {String} currentTimezone = 'UTC'
 * @param {String} convertTimezone = ''
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */

export const convertTimezone = (
    inputTime: string | Date,
    currentTimezone = 'UTC',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    convertTimezone = '',
    formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
    try {
        if (convertTimezone === '') {
            // eslint-disable-next-line no-param-reassign
            convertTimezone = currentTimezone;
        }
        let currentTimeInGivenTimezone;

        if (currentTimezone === 'UTC') {
            currentTimeInGivenTimezone = utcToZonedTime(inputTime, convertTimezone);
        } else {
            const currentTimezoneToUtc = zonedTimeToUtc(inputTime, currentTimezone);
            if (convertTimezone === 'UTC') {
                currentTimeInGivenTimezone = currentTimezoneToUtc;
            } else {
                currentTimeInGivenTimezone = utcToZonedTime(currentTimezoneToUtc, convertTimezone);
            }
        }
        return format(currentTimeInGivenTimezone, formatPattern, { timeZone: convertTimezone });
    } catch (e) {
        return format(new Date(), formatPattern);
    }
};
/**
 * format time
 * @param {String/Date} time
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */
export const formatTime = (
    time: string | Date | undefined = new Date(),
    formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
    let newDate = new Date();
    if (typeof time !== undefined) {
        // eslint-disable-next-line no-param-reassign
        newDate = new Date(time);
    }
    if (typeof time !== 'string') {
        return format(newDate, formatPattern);
    }
    return format(new Date(newDate), formatPattern);
};
/**
 * Parse date or string to date instance
 * @param {String/Date} time
 * @returns {Date}
 */
export const parseTime = (time: string | Date) => {
    if (typeof time !== 'string') {
        return time;
    }
    return parseISO(time);
};
