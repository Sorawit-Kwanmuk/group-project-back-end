module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      feedbackName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["solved", "unsolved"]),
        allowNull: false,
        defaultValue: "unsolved",
      },
    },
    {
      underscroed: true,
    }
  );
};