const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pembayaran', {
    id_pembayaran: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_petugas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'petugas',
        key: 'id_petugas'
      }
    },
    nisn: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'siswa',
        key: 'nisn'
      }
    },
    tgl_bayar: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bulan_spp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_spp: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pembayaran',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pembayaran" },
        ]
      },
      {
        name: "id_petugas",
        using: "BTREE",
        fields: [
          { name: "id_petugas" },
        ]
      },
      {
        name: "nisn",
        using: "BTREE",
        fields: [
          { name: "nisn" },
        ]
      },
    ]
  });
};
