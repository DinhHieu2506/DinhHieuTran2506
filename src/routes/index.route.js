import postRouter from './post.route.js';
import siteRouter from './site.route.js';
import siteController from "../app/controllers/SiteController.js";
import PostController from '../app/controllers/PostController.js';
import Auth from '../app/helpers/Auth.js';
import authRouter from './auth.route.js';
import adminRouter from './admin.post.route.js'
// import taskRouter from './task.route.js';
// import userRouter from './user.route.js';

const route = (app) => {
    app.use('/admin',Auth.verifyJWTToken,Auth.verifyAdmin, adminRouter);
    app.use('/posts', Auth.verifyJWTToken, siteRouter);
    app.use('/auth', authRouter);
    // app.use('/tasks', taskRouter);
    // app.use('/user/create', userRouter);
    app.use('/', siteRouter);
    
}

export default route;