const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('siswa', {
    nisn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nis: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sisa_tunggakan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'kelas',
        key: 'id_kelas'
      }
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    no_telp: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'siswa',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nisn" },
        ]
      },
      {
        name: "id_kelas",
        using: "BTREE",
        fields: [
          { name: "id_kelas" },
        ]
      },
    ]
  });
};
