const jwtProvider = require("../config/jwtProvider")
const userService = require("../services/userservices")

const authenticate = async (req,res,next)=> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).send({error: "Token not found."});
    }
    const token = authHeader.split(" ")[1];
    
    if(!token){
       return res.status(404).send({error:"token not found.."})
    }
    
    const userId = jwtProvider.getUserIdFromToken(token)
    const user = userService.findUserById(userId)
    req.user = user
  } catch (error) {
    return res.status(500).send({error:error.message});
  }
  next();
}

module.exports = authenticate