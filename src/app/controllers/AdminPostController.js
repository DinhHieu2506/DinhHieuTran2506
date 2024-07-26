import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";
class AdminPostController {

index(req, res) {
    connection.connect().then(async (db) => {
        try {
            const result = await Post.findAll(db);
            res.render("sever/managePosts/posts", {postsAdmin: result, isAdmin :true });
            // res.json(result)
        } catch (err) {
            console.error(err);
        } finally {
            await connection.close();
        }
    });
    // res.render('post',);
}


// POST /posts/store
dele(req, res) {
    connection.connect().then(async (db) => {
      try {
        const id = req.params.id;
        const post = new Post();
        const result = await post.del(db, new ObjectId(id));
        // console.log(result);
        res.redirect('/admin/posts');
        
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
            const result = await User.findById(db, new ObjectId(id));
            // console.log(result);
            res.render('sever/manageUsers/updateUsers', { user: result, userId: id, isAdmin: true });
            if (!result) {
                return res.status(404).json({ message: "Không tìm thấy user" });
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
      bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
              console.error(`Error: ${err}`);
          } else {
              connection.connect().then(async (db) => {
                  const user = new User(undefined, req.body.name, req.body.email, hash, req.body.role);
                  const result = await user.update(db,new ObjectId(id));
                  // console.log(result);
                  res.redirect('/admin/users');
                  if (!result) {
                      return res.status(404).json({ message: "Không tìm thấy bài viết" });
                  }
              })
          }
          // res.json(result);
      })
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
}

}

export default new AdminPostController();