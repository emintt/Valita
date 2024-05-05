/**
 * @api {get} /api/search Search companies by name
 * @apiName SearchCompanies
 * @apiGroup Search
 * 
 * @apiDescription Search for companies by name.
 * 
 * @apiParam {String} q Search query for company name.
 * 
 * @apiSuccess {Object} result Search result.
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object[]} data Array of companies found.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Companies found",
 *       "data": [
 *           {
 *               "company_id": 1,
 *               "company_name": "Company A"
 *           },
 *           {
 *               "company_id": 2,
 *               "company_name": "Company B"
 *           }
 *       ]
 *     }
 * 
 * @apiError (Error 400) BadRequest Missing search parameter.
 * @apiErrorExample {json} Bad-Request-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Search param is required",
 *       "data": null
 *     }
 * 
 * @apiError (Error 200) NoResults No companies found for the search query.
 * @apiErrorExample {json} No-Results-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "No companies found",
 *       "data": null
 *     }
 */