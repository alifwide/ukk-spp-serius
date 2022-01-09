const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const findAll = async () => {
  const queryData = await models.spp.findAll({raw: true});
  return queryData;
}

const findOne = async (filter) => {
  const queryData = await models.spp.findOne({raw: true, where: filter});
  return queryData;
}

const create = async (createData) => {
  const queryData = await models.spp.create(createData);
  return queryData;
}

const update = async (updateData, filter) => {
  const queryData = await models.spp.update(updateData, { where: filter });
  return queryData;
}

const destroy = async (filter) => {
  const queryData = await models.spp.destroy({raw: true, where: filter});
  return queryData;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}
