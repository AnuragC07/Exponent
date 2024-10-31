require('dotenv').config();
const jwt = require('jsonwebtoken');


const jwtAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res.status(400).json({ error: 'Token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded.id || !decoded.username) {
            return res.status(401).json({ error: 'Invalid Token' });
        }
        console.log("Decoded Token: ", decoded);
        req.user = decoded
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_KEY, { expiresIn: 864000 });
}

const extractUsernameFromToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return res.status(401).json({ message: 'Token not found' });
    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.username = decoded.username;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = { jwtAuth, generateToken, extractUsernameFromToken }