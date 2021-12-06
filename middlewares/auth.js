const jwt = require('jsonwebtoken');
const config = require('../config/secret');
var response = require('../library/response');

function auth() {
    return function (req, rest, next) {
        //cek authorizzation header
        var tokenWithBearer = req.headers.authorization;

        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];

            //verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({
                        response_code: 210, 
                        response_message: 'Sorry, your token not found!',
                        response_status: false,
                        result: [], 
                    });
                } else {
                    req.auth = decoded;
                    next();
                }
            });
        } else {
            return rest.status(401).send({ 
                response_code: 210,
                response_message: 'Sorry, token required!',
                response_status: false,
                result: []
             });
        }
    }
}

module.exports = auth;