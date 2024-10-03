const { Sequelize, DataTypes } = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        googleId: {
          type: DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nickname: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        accessToken: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        refreshToken: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM('user', 'admin'),
          defaultValue: 'user',
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
          onUpdate: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tablename: 'Users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_generic_ci',
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Translation, { foreignKey: 'user_id', sourceKey: 'id' });
    db.User.hasMany(db.Summary, { foreignKey: 'user_id', sourceKey: 'id' });
  }
}

module.exports = User;
