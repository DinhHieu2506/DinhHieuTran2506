
class PostController {

    index(req,res){
        res.render('postdetails');
    }

    detail(req,res){
        res.render('postdetails');
    }
    
    // async show(req,res) {
    //     try{
    //         const db = await connection.connect();
    //         const resultByID = await Post.findAll(db, new ObjectId(req.params.id))
    //         res.render('postsdetails',{postsID: {resultByID}});
    //     } catch (err) {
    //         console.error(err);
    //     }finally {
    //         await connection.close();
    //     }
    // }
}
    

export default new PostController();