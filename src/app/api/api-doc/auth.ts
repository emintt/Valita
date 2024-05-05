/**
 * @api {function} getSession() Retrieve session data
 * @apiName GetSession
 * @apiGroup Auth
 * 
 * @apiDescription Retrieve session data from the session cookie.
 * 
 * @apiSuccess {TokenContent} session User session data.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": "123456",
 *       "role": "admin",
 *       "iat": 1630442038,
 *       "exp": 1630528438
 *     }
 * 
 */

/**
 * Retrieve session data from the session cookie.
 * @returns {TokenContent | null} User session data if available, otherwise null.
 */

/**
 * @api {Server action} login Login user
 * @apiName LoginUser
 * @apiGroup Authentication
 * 
 * @apiDescription Logs in a user using provided credentials.
 * 
 * @apiParam {FormData} formData User credentials including email and password.
 * 
 * @apiSuccess {String} type Type of the response ('error' or 'success').
 * @apiSuccess {String} message Response message.
 * @apiSuccessExample {} Success-action:
 *     set cookies
 * 
 * @apiError (Error) InvalidCredentials Invalid email or password.
 * @apiErrorExample {object} Invalid-Credentials-Response:
 *     return
 *     {
 *      type: 'error',
 *     message: 'Virheellinen sähköpostiosoite tai salasana',
 *     }
 * 
 */

/**
 * @api {Server action} logout Logout user
 * @apiName LogoutUser
 * @apiGroup Authentication
 * 
 * @apiDescription Logs out the current user.
 * 
 * @apiSuccessExample {json} Success-action:
 *     delete cookies
 * 
 */

/**
 * @api {Server action} doRegisterAction Register a new user
 * @apiName RegisterUser
 * @apiGroup Authentication
 * 
 * @apiDescription Registers a new user with the provided email and password.
 * 
 * @apiParam {FormData} data User registration data including email and password.
 * 
 * @apiSuccess {String} action Create new user in DB 
 *  
 * 
 * @apiError (Error) MissingData Missing email or password in the registration data.
 * @apiErrorExample {object} Missing-Data-Response:
 *     return
 *     {
 *       type: "error",
 *       message: "Rekisteröinti epäonnistui"
 *     }
 * 
 * @apiError (Error 400) The provided email already exists in the database.
 * @apiErrorExample {object} Email-Exists-Response:
 *     Return
 *     {
 *       type: "error",
 *       message: "Virheellinen tai jo olemassa oleva sähköpostiosoite"
 *     }
 * 
 * @apiError (Error 500) ServerError Error processing registration request.
 * @apiErrorExample {object} Server-Error-Response:
 *     return
 *     {
 *       type: "error",
 *       message: "Palvelinvirhe"
 *     }
 */