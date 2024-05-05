/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Cookies User's cookies value.
 */

/**
 * @apiDefine ErrorResponse
 * @apiError (Error 401) Unauthorized User is not authenticated.
 * @apiErrorExample {json} Unauthorized-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Unauthorized"
 *     }
 */

/**
 * @api {post} /api/post Create a new post
 * @apiName CreatePost
 * @apiGroup Post
 * 
 * @apiDescription Create a new post and save it to the database.
 * 
 * @apiUse AuthHeader
 * 
 * @apiParam {String} title Title of the post.
 * @apiParam {String} company_name Name of the company.
 * @apiParam {String} content Content of the post.
 * @apiParam {String} company_name Name of the company.
 * @apiParam {File} [file] Optional file to be uploaded with the post.
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post added to database"
 *     }
 * 
 * @apiUse ErrorResponse
 * 
 * @apiError (Error 400) MissingFields Missing required fields.
 * @apiErrorExample {json} Missing-Fields-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Title, company name and content is required"
 *     }
 * 
 * @apiError (Error 500) ServerError Error adding post to DB.
 * @apiErrorExample {json} Server-Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error adding post to DB"
 *     }
 * 
 * @apiError (Error 500) UploadError Error uploading post.
 * @apiErrorExample {json} Upload-Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error uploading post"
 *     }
 * 
 * @apiError (Error 500) CreatePostError Error creating post.
 * @apiErrorExample {json} Create-Post-Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error creating post"
 *     }
 */

/**
 * @apiDefine TokenContent
 * @apiDescription Content of the JWT token.
 * @apiSuccess {String} user_id ID of the user.
 * @apiSuccess {String} role Role of the user.
 * @apiSuccess {Number} iat Token issuance time.
 * @apiSuccess {Number} exp Token expiration time.
 */



