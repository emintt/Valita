/**
 * @api {post} /api/company Create a new company
 * @apiName CreateCompany
 * @apiGroup Company
 * 
 * @apiDescription Create a new company and save it to the database.
 * 
 * @apiParam {String} company_name Name of the company to be created.
 * 
 * @apiSuccess {Object} company Company information.
 * @apiSuccess {String} message Success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "company_id": 123,
 *       "message": "Company added successfully"
 *     }
 * 
 * @apiError (Error 500) ServerError Error adding company to DB.
 * @apiErrorExample {json} Server-Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error adding company to DB"
 *     }
 */