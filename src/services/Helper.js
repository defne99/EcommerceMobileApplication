export default class Helper {
    static isFalsy = (data) => {
        return data === '' || data === null || data === 'null' || data === undefined || data === 'undefined' || (Array.isArray(data) && data.length === 0)
    }

    static isNotNumeric = (value) => {
        return isNaN(value) || value === 'NaN';
    }

    static validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    static validateMobilePhone = (mobilePhone) => {
        const regex = /^(\+9)?0?5\d{9}$/;
        return regex.test(mobilePhone);
    }
}
