const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const findAll = async () => {
  const queryData = await models.pembayaran.findAll({raw: true});
  return queryData;
}

const findOne = async (filter) => {
  const queryData = await models.pembayaran.findOne({raw: true, where: filter});
  return queryData;
}

const create = async (createData) => {
  const queryData = await models.pembayaran.create(createData);
  return queryData;
}

const update = async (updateData, filter) => {
  const queryData = await models.pembayaran.update(updateData, { where: filter });
  return queryData;
}

const destroy = async (filter) => {
  const queryData = await models.pembayaran.destroy({raw: true, where: filter});
  return queryData;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}
