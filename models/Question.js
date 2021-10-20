module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceD: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
};
