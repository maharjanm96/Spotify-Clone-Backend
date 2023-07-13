const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(400).send({ message: "Access denied, No Token Provided." });

    jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
        if (error) {
            return res.status(400).send({ message: "Invalid Token" });

        } else {
            if (!validToken.isAdmin)
                return res.status(403).send({ message: "You don't have access to this content." })
            req.user = validToken;
            next();
        }
    })
}