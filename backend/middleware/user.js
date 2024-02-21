const jwt = require('jsonwebtoken');

const JWT_SECRET = "SecurePassword";

const fetchUser = async (req, res, next) => {
    console.log(req.header('token'))
    const token = req.header('token');
    if (!token) {
        return res.status(401).send({ error: "Invalid Token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Invalid Token" })
    }

}

module.exports = fetchUser;