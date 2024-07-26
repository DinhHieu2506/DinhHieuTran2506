class AdminController {
    index(req,res){
        res.render('admin', {isAdmin: true});
    }
}
export default new AdminController();