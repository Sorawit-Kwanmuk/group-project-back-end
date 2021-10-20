module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      quizName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
};
