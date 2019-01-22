
import { validate } from 'validate.js'



export var constraints = {
    name: {
        presence: true,
        length: {
            minimum: 1,
            message: "is required"
        }
    },
    password: {
        presence: { message: 'is required' },
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    },
    email: {
        presence: {
            message: '^Please enter an email address'
        },
        email: {
            message: '^Please enter a valid email address'
        }
    },
    phoneNo: {
        presence: { message: 'is required' },
        length: {
            minimum: 7,
            message: "must be at least 7 characters"
        },
        numericality: {
            message: '^ digits only'
        }
    },
    code: {
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    },
    referral: {
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    },
    confirmpassword: {
        equality: {
            attribute: "password",
            message: '^Passwords do not match'
        }
    },
    birthPlace: {
        presence: true,
        length: {
            minimum: 1,
            message: "is required"
        }
    },
    birthCity:{
        presence: true,
        length: {
            minimum: 1,
            message: "is required"
        }
    }
};

export function ValidateInput(key, value) {
    return validate({ [key]: value }, { [key]: constraints[key] }, { format: "flat" })
}
