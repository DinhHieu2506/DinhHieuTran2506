import express from "express"; // step 1
import adminPostController from "../app/controllers/AdminPostController.js";

const router = express.Router(); // step 2

// router.post('/store', adminPostController.store); 
// router.get('/create', adminPostController.create); 
// router.get('/:id', adminPostController.show);
router.get('/dele/:id',adminPostController.dele);
router.get('/', adminPostController.index);  



export default router;