const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spp', {
    id_spp: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    angkatan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "angkatan"
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spp',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_spp" },
        ]
      },
      {
        name: "angkatan",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "angkatan" },
        ]
      },
    ]
  });
};
