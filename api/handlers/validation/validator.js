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
  }
}

const validate_admin = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      res.sendStatus(401);
      return;
    }
    const valid = await jwt.verify(token, levelSchema.admin.secretKey);
    if(valid) next();
    else res.sendStatus(401);
  }catch(err){
    res.sendStatus(401)
    console.log(err)
  }
}

const validate_petugas = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      res.sendStatus(401);
      return;
    }
    const valid = await jwt.verify(token, levelSchema.petugas.secretKey);
    if(valid) next();
    else res.sendStatus(401);
  }catch(err){
    res.sendStatus(401)
    console.log(err)
  }
}

const validate_siswa = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      res.sendStatus(401);
      return;
    }
    const valid = await jwt.verify(token, levelSchema.siswa.secretKey);
    if(valid) next();
    else res.sendStatus(401);
  }catch(err){
    res.sendStatus(401)
    console.log(err)
  }
}

module.exports = {
  validate_admin,
  validate_petugas, 
  validate_siswa
};