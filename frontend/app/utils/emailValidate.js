import { isEmail } from "validator"

export function validateEmail(email) {
    const isValid = isEmail(email, { host_whitelist: ['exampleuniversity.edu'] })
    return isValid

}
