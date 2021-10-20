module.exports = (sequelize, DataTypes) => {
  const UserQuiz = sequelize.define(
    "UserQuiz",
    {
      isPassed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );
};
