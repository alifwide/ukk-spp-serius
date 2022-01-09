const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas', {
    id_kelas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_kelas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jurusan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    angkatan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'spp',
        key: 'angkatan'
      }
    }
  }, {
    sequelize,
    tableName: 'kelas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_kelas" },
        ]
      },
      {
        name: "angkatan",
        using: "BTREE",
        fields: [
          { name: "angkatan" },
        ]
      },
    ]
  });
};
