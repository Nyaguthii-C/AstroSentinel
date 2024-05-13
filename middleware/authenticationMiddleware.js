// creates session for session based athentication
const authenticationMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        // If session exists and user is logged in, proceed to the next middleware
        return next();
    } else {
        // If session or user is not present, redirect to login page
        return res.redirect('/login');
    }
};

module.exports = authenticationMiddleware;
