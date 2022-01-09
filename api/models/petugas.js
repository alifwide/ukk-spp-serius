const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('petugas', {
    id_petugas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nama_petugas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM('admin','petugas'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'petugas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_petugas" },
        ]
      },
    ]
  });
};
