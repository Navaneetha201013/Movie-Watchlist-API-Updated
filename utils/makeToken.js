const jwt = require("jsonwebtoken");

const makeToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES || "1d"
        }
    );
};

module.exports = makeToken;