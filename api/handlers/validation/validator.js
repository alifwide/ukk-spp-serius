const jwt = require('jsonwebtoken')

const levelSchema = {
  admin: {
    secretKey: "sakdfjasioajwejfeiofj8923fjh23fhj98q4fn99cnu8"
  },
  petugas: {
    secretKey: "afijaowjefowkfokawokfoskofkawokowekf2382ur29j"
  },
  siswa: {
    secretKey: "faopjaowjowjo392jf2ijseklajfjskdfjaoj29jsajf"
  },
  public: {
    noAuth: true,
    secretKey: null
  }
}

validate = (roles) => {
  return async (req,res,next) => {
    try{
      let token = req.headers.authorization;
      token = token && token.split(" ")[1];
      if(roles.includes("public")){
        next();
        return;
      }
  
      if(!token){
        res.sendStatus(401);
        return;
      }
  
      let authenticated = false;
      for(role of roles){
        const valid = await jwt.verify(token, levelSchema[role].secretKey) || levelSchema[role].noAuth;
        if(valid) {
          authenticated = true;
          break;
        }
      }
      if(authenticated) next();
      else res.sendStatus(401);
    }catch(err){
      res.send(401);
      console.log(err.message)
    }
    
  }
}

module.exports = {
  validate
};
