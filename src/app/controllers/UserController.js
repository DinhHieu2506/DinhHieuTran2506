class UserController {
    index(req, res) {
        res.render('user');
    }

    about(req, res) {
        res.render('about');
    }
    show(req, res) {
        console.log(req.params.id);
        res.send('show:' + req.params.id );
    }

   register(req, res) {
        res.render('user');
    }
}

export default new UserController();