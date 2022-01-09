const schedule = require('node-schedule');

const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const getSPP = async (id_kelas) => {
  try{
    let angkatan = await models.kelas.findOne({raw: true, where: {id_kelas: id_kelas}});
    angkatan = angkatan.angkatan;
    let nominal = await models.spp.findOne({raw: true, where: {angkatan: angkatan}});
    return nominal.nominal;
  }catch(err){
    console.log(err);
  }
}

const perbulan = '0 0 1 * *';
var sch = schedule.scheduleJob(perbulan, async () => {
  const data = await models.siswa.findAll({raw: true});

  data.map(async (item) => {
    const biayaSPP = await getSPP(item.id_kelas);
    const tunggakan_baru = biayaSPP + item.sisa_tunggakan;
    models.siswa.update({sisa_tunggakan: tunggakan_baru}, {where: {nisn: item.nisn}});
  })

}); 

module.exports = sch;