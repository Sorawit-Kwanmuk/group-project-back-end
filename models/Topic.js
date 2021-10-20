module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      topicName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );
};
