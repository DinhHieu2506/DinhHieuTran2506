import Post from "../models/Post.js";
import User from "../models/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";
class SiteController {
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findAll(db);
                // console.log(result);
                res.render('home', { posts: result,  });
             } catch (err) {
                console.error(err);
            }   finally {
                await connection.close();
            }
        });
    }
    async detail(req,res) {
        try{
            const db = await connection.connect();
            const resultByID = await Post.findById(db, new ObjectId(req.params.id))
            res.render('postdetails',{postsID: resultByID});
        } catch (err) {
            console.error(err);
        }finally {
            await connection.close();
        }
    }

    
    create(req, res) {
        res.render('post/create');   
    }

    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const emailUser = await User.findByEmail(db, req.email);
                const createAuthor = emailUser._id.toString();
                const post = new Post(undefined, req.body.title, req.body.image, req.body.content, req.body.date, createAuthor );
                const result = await post.save(db);
                console.log(result);
                res.redirect('/posts');
                // res.json(result)
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }

    async show(req,res) {
        try{
            const db = await connection.connect();
            const resultByID = await Post.findById(db, new ObjectId(req.params.id))
            res.render('postsdetails',{postsID: {resultByID}});
        } catch (err) {
            console.error(err);
        }finally {
            await connection.close();
        }
    }
    async showUserWall(req, res) {
        connection.connect().then(async (db) => {
        try{
            const emailUser = await User.findByEmail(db, req.email);


            res.render('userUser', {userUser: emailUser});
            
            // res.json(resultByID);
        }catch (err){
            console.error(err);
        } finally{
            await connection.close();
        }
    })
    }

    async showPostByAuthor(req, res) {
        connection.connect().then(async (db) => {
        try{
            const emailUser = await User.findByEmail(db, req.email);
            const createAuthor = emailUser._id.toString();
            const resultByAuthor= await Post.findByAuthor(db, createAuthor);
            // console.log(resultByAuthor);
            res.render('userPost', {post: resultByAuthor});
            // res.json(resultByID);
        }catch (err){
            console.error(err);
        } finally{
            await connection.close();
        }
    })
    }
    del(req, res) {
        connection.connect().then(async (db) => {
          try {
            const id = req.params.id;
            const post = new Post();
            const result = await post.del(db, new ObjectId(id));
            console.log(result);
            res.redirect('/posts/wall');
            
          } 
          catch (err) {
            console.error(err);
            res.status(500).send("An error occurred");
          } finally {
            await connection.close();
          }
        });
      }
    formupdate(req, res) {
        connection.connect().then(async (db) => {
          
            try {
                const id = req.params.id;
                // console.log(id);
                const result = await Post.findById(db, new ObjectId(id));
                // console.log(result);
                res.render('userPostUpdate', { post: result, postId: id});
                if (!result) {
                    return res.status(404).json({ message: "Không tìm thấy post" });
                }
                // res.json(result);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } finally {
                await connection.close();
            }
        })
    }

    updateUser(req, res) {
      const id = req.params.id;   
      try {              
        connection.connect().then(async (db) => {
            const post = new Post(undefined, req.body.title, req.body.image, req.body.content, req.body.date);
            const result = await post.update(db,new ObjectId(id));
            // console.log(result);
            res.redirect('/posts/wall');
            if (!result) {
                return res.status(404).json({ message: "Không tìm thấy bài viết" });
            }
        })                  
              // res.json(result);             
      } catch (err) {
          console.error(err);
          res.status(500).send('An error occurred');
      }
    }

}

export default new SiteController();
