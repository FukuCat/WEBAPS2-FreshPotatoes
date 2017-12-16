let jwt = require("jsonwebtoken");

exports.check = (req, res, next) => {
    let authHeader = req.headers.authorization || "";

    if(authHeader.startsWith("Bearer ")) {
        let token = authHeader.substr(7); 
        jwt.verify(token, "secret", (err, decoded) => {
            if(!err) {
                next();
            } else {
                console.log(err);
                res.status(401).send();
            }
        });
    } else {
        res.status(401).send();
    }

}
