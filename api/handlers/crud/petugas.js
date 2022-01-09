const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const bcrypt = require('bcrypt');

const findAll = async () => {
  const queryData = await models.petugas.findAll({raw: true});
  return queryData;
}

const findOne = async (filter) => {
  const queryData = await models.petugas.findOne({raw: true, where: filter});
  return queryData;
}

const create = async (createData) => {
  createData.password = bcrypt.hashSync(createData.password, 7);
  const queryData = await models.petugas.create(createData);
  return queryData;
}

const update = async (updateData, filter) => {
  const queryData = await models.petugas.update(updateData, { where: filter });
  return queryData;
}

const destroy = async (filter) => {
  const queryData = await models.petugas.destroy({raw: true, where: filter});
  return queryData;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}

const test = async () => {
  const dataPetugas = {
    username: "jono subandono",
    password: "geming",
    nama_petugas: "jono subandono marko polo",
    level: "admin",
  }
  const data = await create(dataPetugas)
}

test()