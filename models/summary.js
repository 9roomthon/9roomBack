const { Sequelize, DataTypes } = require('sequelize');

class Summary extends Sequelize.Model {
  static initiate(sequelize) {
    Summary.init(
      {
        summary_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        original_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        summary_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        source_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        summary_length: {
          type: DataTypes.ENUM('short', 'medium', 'long'),
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
        modelName: 'Summary',
        tableName: 'Summaries',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_generic_ci',
      }
    );
  }

  static associate(db) {
    db.Summary.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}

module.exports = Summary;
