import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3

const router = express.Router(); // step 2

// router.use('/postdetails/:id', postController.detail);
// router.use('/:id', postController.show); 
// router.use('/', postController.index);


export default router;