import express from "express";
import adminUserController from "../app/controllers/AdminUserController.js";


const router = express.Router();

// router.post('/store', AdminUserController.store); // localhost:3000/posts/store
// router.get('/create', AdminUserController.create); // localhost:3000/posts/create
// router.get('/:id', AdminUserController.show)
router.route('/update/:id')
    .get(adminUserController.formupdate)
    .post(adminUserController.updateUser);
router.get('/dele/:id',adminUserController.dele);
router.get('/', adminUserController.index);



export default router;