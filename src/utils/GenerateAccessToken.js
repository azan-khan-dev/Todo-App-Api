import jwt from "jsonwebtoken";

const generateAccesstoken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            email: user.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
             expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}
export default generateAccesstoken;