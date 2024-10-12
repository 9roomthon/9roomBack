const { Sequelize, DataTypes, Model } = require('sequelize');

class Translation extends Sequelize.Model {
  static initiate(sequelize) {
    Translation.init(
      {
        translation_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        original_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        translated_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        target_language: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
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
        modelName: 'Translation',
        tableName: 'Translations',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_generic_ci',
      }
    );
  }
  static associate(db) {
    db.Translation.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}

module.exports = Translation;
