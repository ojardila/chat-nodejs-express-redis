module.exports = function (app) {

    app.all("/", function (req, res) {
        res.render('chat', { username: req.session.username });
    });

    app.get('/logout', function (req, res) {
        username = req.session.username
        global.chat.deleteUser(username);
        req.session.destroy(function(){
        console.log("session closed.");
    });
        res.redirect('/');
	});

};