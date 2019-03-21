import { UNKNOWN_ERROR } from "./InternalErrorCodes";

export const AI_DUMMY_ID = "0";
export const MILLIS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const logger = require('log4js').getLogger("adelagio");
export const sleep = require('util').promisify(setTimeout);

export function objectSize(obj) {
    return Object.keys(obj).length;
}

export function printJSON(obj, message) {
    if (!message) {
        message = '';
    } else {
        message = message + ' ';
    }
    logger.info(message + JSON.stringify(obj));
}

/**
 * @param {Array} array
 */
export function getRandom(array) {
    if (array.length > 0) {
        if (array.length === 1) {
            return array[0];
        }
        else {
            let rand = Math.round(Math.random() * (array.length - 1));
            return array[rand];
        }
    }
    else {
        return null;
    }
}

export function timeDiff(date1, date2?) {
    if (date2 === undefined) {
        date2 = new Date();
    }
    return Math.floor(Math.abs((date1 - date2) * 0.001));
}

/**
 * Converts Enum to Array of it's values
 * @param {any} Enum
 */
export function enumToArray(Enum) {
    let array = [];
    for(let item in Enum) {
        array.push(item);
    }
    return array;
}

/**
 * Validates model of given candidate. Removes all redundant fields from object.
 * Unlike Object.assign() write in model only that properties that are present in model.
 * @param {any} candidate
 * @param {any} model
 */
export function validateModel (candidate: any, model) {
    let result = {};
    for (let property of Object.keys(model)) {
        if (candidate[property]) result[property] = candidate[property]
    }
    return result;
}

/**
 * Generate random int between two values including boarder values
 * @param {number} min
 * @param {number} max
 */
export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function jsonError(message: string = UNKNOWN_ERROR) {
    return {error: message ? message : UNKNOWN_ERROR}
}

export function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

export function removeFromArray(array, item) {
    let index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
}
