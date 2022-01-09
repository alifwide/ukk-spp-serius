const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let levelSchema = {
  admin: {
    secretKey: "sakdfjasioajwejfeiofj8923fjh23fhj98q4fn99cnu8",
  },
  petugas: {
    secretKey: "afijaowjefowkfokawokfoskofkawokowekf2382ur29j",
  },
  siswa: {
    secretKey: "faopjaowjowjo392jf2ijseklajfjskdfjaoj29jsajf",
  }
}


const loginAdmin = async (username, password) => {
  const usernameExist = await models.petugas.findOne({where: {level: 'admin', username: username}});

  if(!usernameExist) return ({success: false, message: "username not found", code: 401});
  else {
    const hashedPassword = usernameExist.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);

    if(!passwordIsValid) return ({success: false, message: "invalid password", code: 401});
    else {
      const token = await jwt.sign({level: 'admin'}, levelSchema.admin.secretKey, { expiresIn: '7d' });
      return ({success: true, message: "logged in", code: 200, data: token})
    }

  }
}

const loginPetugas = async (username, password) => {
  const usernameExist = await models.petugas.findOne({where: {level: 'petugas', username: username}});

  if(!usernameExist) return ({success: false, message: "username not found", code: 401});
  else {
    const hashedPassword = usernameExist.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);

    if(!passwordIsValid) return ({success: false, message: "invalid password", code: 401});
    else {
      const token = await jwt.sign({level: 'petugas'}, levelSchema.petugas.secretKey, { expiresIn: '7d' });
      return ({success: true, message: "logged in", code: 200, data: token})
    }
    
  }
}

const loginSiswa = async (email, password) => {
  const emailExist = await models.siswa.findOne({where: {email: email}});

  if(!emailExist) return ({success: false, message: "email not found", code: 401});
  else {
    const hashedPassword = emailExist.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);

    if(!passwordIsValid) return ({success: false, message: "invalid password", code: 401});
    else {
      const token = await jwt.sign({level: 'siswa'}, levelSchema.siswa.secretKey, { expiresIn: '7d' });
      return ({success: true, message: "logged in", code: 200, data: token})
    }
    
  }
}

levelSchema = {
  admin: {
    secretKey: "sakdfjasioajwejfeiofj8923fjh23fhj98q4fn99cnu8",
    handler: loginAdmin
  },
  petugas: {
    secretKey: "afijaowjefowkfokawokfoskofkawokowekf2382ur29j",
    handler: loginPetugas
  },
  siswa: {
    secretKey: "faopjaowjowjo392jf2ijseklajfjskdfjaoj29jsajf",
    handler: loginSiswa
  }
}

const loginHandler = async (req, res, next) => {
  const requestedLevel = req.body.level;
  if(!levelSchema[requestedLevel]){
    res.sendStatus(400);
    return;
  }else{
    const logged = await levelSchema[requestedLevel].handler(req.body.username, req.body.password);
    if(logged){
      res.send(logged);
    }else{
      res.status(401).send(logged);
    }
  }
}

module.exports = {
  loginHandler
}

// const test = async () => {
//   const result = await loginAdmin("jono sfjdiofj", "geming");
//   console.log(result);
// }

// test();