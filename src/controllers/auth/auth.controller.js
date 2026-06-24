import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import asyncHandler from "../../utils/asynchandler.js"
import { registerSchema } from "../../validators/auth.validator.js"
import ApiError from "../../utils/ApiError.js"
import { create_user, FindUserByEmail } from "../../models/user/user.model.js"
import generateToken from "../../utils/generateToken.js"
import ApiResponse from "../../utils/ApiResponse.js"

const register=asyncHandler(async(req,res)=>{

    const {error}=registerSchema.validate(req.body)
    if(error)
    {
        throw new ApiError(400,error.details[0].message)
    }
    const {name,email,password}=req.body;

    const existingUser=await FindUserByEmail(email)
    if(existingUser)
    {
        throw new ApiError(409,"User Already exist");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await create_user(name,email,hashedPassword);
    const token=generateToken(user)

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user,
                token,
            },
            "User registered successfully"
        )
    );

})
export default register;