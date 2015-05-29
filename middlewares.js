function checkAuth(req) {
    username = req.body.username;
    return (username != '' && !global.chat.isUserAuthenticated(username)) ? (isAuth = true) : (isAuth = false);
}

function sessionExist(req) {
    return (req.session && req.session.username) ? true : false;
}
function loginAttempt(req){
        return req.body.username ? true : false;
}
module.exports = {
    sessionManager: function(req, res, next) {
    if (sessionExist(req)) {
        console.log(req.session.username + " logged in.");
        return next();
    }
  
    if (!loginAttempt(req)) {
        return res.render('login');
    }
    else {
        if (checkAuth(req)) {
            console.log(req.body.username + " login successful.");
            req.session.username = req.body.username;
            console.log("username:"+req.session.username);
            return next();
        } 
        else {
            console.log("login failed.");
            return res.render('login', { error: "This username is already taken, please choose another. "})
        }
    }
    }
}