var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _kelas = require("./kelas");
var _pembayaran = require("./pembayaran");
var _petugas = require("./petugas");
var _siswa = require("./siswa");
var _spp = require("./spp");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var kelas = _kelas(sequelize, DataTypes);
  var pembayaran = _pembayaran(sequelize, DataTypes);
  var petugas = _petugas(sequelize, DataTypes);
  var siswa = _siswa(sequelize, DataTypes);
  var spp = _spp(sequelize, DataTypes);

  siswa.belongsTo(kelas, { as: "kelas", foreignKey: "id_kelas"});
  kelas.hasMany(siswa, { as: "siswa", foreignKey: "id_kelas"});
  pembayaran.belongsTo(petugas, { as: "petugas", foreignKey: "id_petugas"});
  petugas.hasMany(pembayaran, { as: "pembayaran", foreignKey: "id_petugas"});
  pembayaran.belongsTo(siswa, { as: "siswa", foreignKey: "nisn"});
  siswa.hasMany(pembayaran, { as: "pembayaran", foreignKey: "nisn"});
  kelas.belongsTo(spp, { as: "spp", foreignKey: "angkatan"});
  spp.hasMany(kelas, { as: "kelas", foreignKey: "angkatan"});

  return {
    SequelizeMeta,
    kelas,
    pembayaran,
    petugas,
    siswa,
    spp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
