const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const bcrypt = require('bcrypt');

const findAll = async () => {
  const queryData = await models.siswa.findAll({
    raw: true
  });
  return queryData;
}

const getSPP = async (id_kelas) => {

  let angkatan = await models.kelas.findOne({raw: true, where: {id_kelas: id_kelas}});
  angkatan = angkatan.angkatan;

  let nominal = await models.spp.findOne({raw: true, where: {angkatan: angkatan}});
  return nominal.nominal;
}

const findOne = async (filter) => {
  const queryData = await models.siswa.findOne({
    raw: true,
    where: filter
  });
  return queryData;
}

const create = async (createData) => {
  createData.password = bcrypt.hashSync(createData.password, 7);

  var now = new Date();
  const oneJuly2021 = 1623082164000;
  const referenceDay = Math.floor(oneJuly2021/8.64e7);
  const curDay = Math.floor(now/8.64e7);

  const biayaSPP = await getSPP(createData.id_kelas);
  const monthSince1jul2021 = Math.floor((curDay - referenceDay) / 30);
  const tunggakan = monthSince1jul2021 * biayaSPP;

  createData.sisa_tunggakan = tunggakan;

  const queryData = await models.siswa.create(createData);

  return queryData;
}

const update = async (updateData, filter) => {
  const queryData = await models.siswa.update(updateData, {
    where: filter
  });
  return queryData;
}

const destroy = async (filter) => {
  const queryData = await models.siswa.destroy({
    raw: true,
    where: filter
  });
  return queryData;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}

const dummy_siswa = {
  nisn: "dfsdfs",
  email: "email@gmail.com",
  password: 'fowjo',
  nis: "sdfsd",
  sisa_tunggakan: 0, 
  nama: 'jono subdanodo',
  id_kelas: '3',
  alamat: 'jalan subandono',
  no_telp: 'sjdfksdjkf',
}

const test = async () => {

  const data = await create(dummy_siswa);
  console.log({data});

}
