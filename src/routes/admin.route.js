import express from "express";
import AdminController from "../app/controllers/AdminControllers.js";
import AdminPost from './admin.post.route.js';
import AdminUser from './admin.user.route.js'


const router = express.Router();

router.use('/posts' ,AdminPost )
router.use('/users', AdminUser)  
router.get('/', AdminController.index);

export default router;