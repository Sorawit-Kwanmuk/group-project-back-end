module.exports = (sequelize, DataTypes) => {
  const MyCourse = sequelize.define("MyCourse", {
    totalStage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentStage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["incompleted", "completed"]),
      allowNull: false,
      defaultValue: "incompleted",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
