module.exports = (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('DirectMessage', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  DirectMessage.associate = (db) => {
    db.DirectMessage.belongsTo(db.User);
  };

  return DirectMessage;
};