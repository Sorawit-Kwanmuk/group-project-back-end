module.exports = (sequelize, DataTypes) => {
  const SubTopic = sequelize.define(
    "SubTopic",
    {
      subTopName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
};
