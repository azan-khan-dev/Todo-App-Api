import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import asyncHandler from "../../utils/asynchandler.js"
import { loginSchema, registerSchema } from "../../validators/auth.validator.js"
import ApiError from "../../utils/ApiError.js"
import { create_user, FindUserByEmail, RemoveRefreshToken, UpdateRefreshToken } from "../../models/user/user.model.js"
import ApiResponse from "../../utils/ApiResponse.js"
import generateAccesstoken from "../../utils/GenerateAccessToken.js"
import generateRefreshToken from "../../utils/GenerateRefreshToken.js"

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

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user,
                
            },
            "User registered successfully.Please Login to continue"
        )
    );

})

const login=asyncHandler(async(req,res)=>{
    const {error}=loginSchema.validate(req.body);

    if(error){
        throw new ApiError(404,error.details[0].message)
    }
    const {email,password}=req.body;
    
const user =await FindUserByEmail(email)

    if(!user)
    {
        throw new ApiError(404,"User not found");
    }

    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect)
    {
        throw new ApiError(401,"Invalid email or password");
    }

    const accessToken=generateAccesstoken(user)
    const refreshToken=generateRefreshToken(user)
    await UpdateRefreshToken(user.id,refreshToken)


    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    }

    res.cookie("accessToken",accessToken,options)
    res.cookie("refreshToken",refreshToken,options);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                },
                accessToken,
                refreshToken
            },
            "Login Success"
        )
    )
})



const logout = asyncHandler(async (req, res) => {
  // req.user auth middleware se aayega
  await RemoveRefreshToken(req.user.id);

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Logout successful"
    )
  );
});

export 
 
    {
    register,
     login,
     logout
    };