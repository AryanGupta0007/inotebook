import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config.js'
export default function fetchUser(req, res, next){
    // get user from the jwt token and add to id to req object
    const token = req.header('auth-token')
    if (!token) {

      return  res.status(401).json({msg:"Not authorized"})
    }
    try{
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data.user // saving the value of data.user to req.user
    next()
    }
    catch(error){
      return  res.status(401).json({msg:"Not authorized"})
    }

}