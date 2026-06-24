import jwt from "jsonwebtoken"
const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
        },
        process.env.JWT_Secret,
        {
            expiresIn:"2d"
        }
    );

};
export default generateToken;