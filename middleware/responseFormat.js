/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Anjan Rai
 * @since   2020
 */

/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
const successResponse = (message, results, statusCode) => {
    return {
        message,
        code: statusCode,
        data: results
    };
};

  
/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
const errorResponse = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
    };
};

  
/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
const validationErrorResponse = (errors) => {
    let errorMessages = errors.array().map(errorObj => {
        /** 
         * the following section of code is to parse the errors from validation using express-validator
         * express-validator provides validation errors as [
                {
                    value: 'anjanraiz',
                    msg: 'Username not available.',
                    param: 'username',
                    location: 'body'
                },
                {
                    value: 'rai.unknown@gmail.com',
                    msg: 'Email already registered.',
                    param: 'email',
                    location: 'body'
                }
                ]
         * so need to parse and format it as [
             {"username": "Username not available"},
             {"email": "Email already registered"}
            ]
        */
        let key = errorObj.param
        let computedObj = {};
        computedObj[key] = errorObj.msg
        return computedObj
    })
    return {
        message: "Validation errors",
        code: 422,
        errorMessages
    };
};

module.exports = {
    successResponse, errorResponse, validationErrorResponse
}