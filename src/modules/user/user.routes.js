import {Router} from 'express'
import * as usercontroller from './user.controller.js'
import * as uservalidation from './user.validation.js'
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import userEndPoints from './user.endPoints.js';
import validation from '../../utils/validation.js';
const router=Router()
router.patch('/updateUser',
        validation(uservalidation.tokenSchema,true),
        auth(userEndPoints.update),
        validation(uservalidation.userUdateSchema),
        asyncHandler(usercontroller.updateUser))

    .delete('/deleteUser',
        validation(uservalidation.tokenSchema,true),
        auth(userEndPoints.delete),
        asyncHandler(usercontroller.deleteUser))

    .get('/getUserData',
        validation(uservalidation.tokenSchema,true),
        auth(userEndPoints.get),
        asyncHandler(usercontroller.getUserData))

    .get('/getAnotherAccount',
        validation(uservalidation.tokenSchema,true),
        auth(userEndPoints.get),
        validation(uservalidation.userEmailSchema),
        asyncHandler(usercontroller.getAnotherAccount))

    .patch('/updatePassword',
        validation(uservalidation.tokenSchema,true),
        auth(userEndPoints.update),
        validation(uservalidation.passwordSchema),
        asyncHandler(usercontroller.updatePassword))

export default router 

 
 