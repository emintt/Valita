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

/**
 * @api {Server Action} getPostWithCompanyNameAction Get post with company name by ID
 * @apiName GetPostWithCompanyName
 * @apiGroup Post
 * 
 * @apiDescription Retrieves a post with the associated company name by its ID.
 * 
 * @apiParam {String} id ID of the post.
 * 
 * @apiSuccess {Object} post Post object with associated company name.
 * @apiSuccessExample {Object} Success-Response:
 *     {
 *       post_id: 1,
 *       title: "Post title",
 *       content: "Post content",
 *       company_name: "Company A",
 *       company_id: 1,
 *       filename: "wbwjdbhfy.png",
 *       fileisze: 6543,
 *       media_type: "image/png",
 *       created_at: "2024-05-05 16:46:22" 
 *     }
 * 
 * @apiError (Error) InvalidId Invalid ID parameter.
 * @apiErrorExample {Object} Invalid-Id-Response:
 *     {
 *       type: "error",
 *       message: "Invalid id parameter"
 *     }
 * 
 * @apiError (Error) ServerError Error fetching post.
 * @apiErrorExample {Object} Server-Error-Response:
 *     {
 *       type: "error",
 *       message: "Error fetching post"
 *     }
 */

/**
 * @api {Server Action} deletePostByIdAction Delete post by ID
 * @apiName DeletePostById
 * @apiGroup Post
 * 
 * @apiDescription Deletes a post by its ID.
 * @apiUse AuthHeader
 * 
 * @apiParam {Number} id ID of the post to delete.
 * 
 * @apiSuccess {String} type Type of the response ('error' or 'success').
 * @apiSuccess {String} message Response message.
 * @apiSuccessExample {Object} Success-Response:
 *     {
 *       type: "success",
 *       message: "Post deleted successfully"
 *     }
 * 
 * @apiError (Error) InvalidId Invalid ID parameter.
 * @apiErrorExample {Object} Invalid-Id-Response:
 *     {
 *       type: "error",
 *       message: "Invalid id parameter"
 *     }
 * 
 * @apiError (Error) ServerError Error deleting post or fetching user.
 * @apiErrorExample {Object} Server-Error-Response:
 *     {
 *       type: "error",
 *       message: "Error deleting post"
 *     }
 */


