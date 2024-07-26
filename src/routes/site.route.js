import express from "express";
import siteController from "../app/controllers/SiteController.js";

const router = express.Router();

router.post('/store', siteController.store);
router.get('/create',siteController.create);
router.use('/postdetails/:id',siteController.detail);
router.get('/wall', siteController.showPostByAuthor); 
router.get('/userwall', siteController.showUserWall); 
router.route('/update/:id').get(siteController.formupdate).post(siteController.updateUser);
router.get('/dele/:id', siteController.del); 
router.get('/posts',siteController.index);
// router.get('/:id',siteController.show);
router.get('/', siteController.index);



export default router;
