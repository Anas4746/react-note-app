
import jwt from "jsonwebtoken";

const secret = "MySecretKey"

export function generateToken(user) {
    const payload = {
        userId: user._id,
        password: user.password
    }
    const token = jwt.sign(payload, secret);

    // console.log(token)
    return token;
};

export function verifyToken(token) {
    try {
        const decode = jwt.verify(token, secret);
        return decode;
    } catch (err) {
        return null;
    };
};
