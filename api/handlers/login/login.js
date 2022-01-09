const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const loginAdmin = async (username, password) => {
  const usernameExist = await models.petugas.findOne({where: {level: 'admin', username: username}});

  if(!usernameExist) return ({success: false, message: "username not found", code: 401});
  else {
    const hashedPassword = usernameExist.password;
    const passwordIsValid = bcrypt.compareSync(password, hashedPassword);

    if(!passwordIsValid) return ({success: false, message: "invalid password", code: 401});
    else {
      const token = await jwt.sign({level: 'admin'}, levelSchema.admin.secretKey);
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
      const token = await jwt.sign({level: 'petugas'}, levelSchema.petugas.secretKey);
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
      const token = await jwt.sign({level: 'siswa'}, levelSchema.siswa.secretKey);
      return ({success: true, message: "logged in", code: 200, data: token})
    }
    
  }
}

module.exports = {
  loginAdmin,
  loginPetugas,
  loginSiswa
}

const test = async () => {
  const result = await loginAdmin("jono sfjdiofj", "geming");
  console.log(result);
}

test();