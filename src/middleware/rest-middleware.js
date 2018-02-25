const bodyParser = require('body-parser');

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const headerMiddleware = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE,OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Content-Length');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const tokenMiddleware = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token)
        jwt.verify(token, require("../utils/constants").STATIC_SECRET_TOKEN, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    else
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
}
