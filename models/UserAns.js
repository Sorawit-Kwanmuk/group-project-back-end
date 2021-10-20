module.exports = (sequelize, DataTypes) => {
  const UserAns = sequelize.define(
    "UserAns",
    {
      answer: {
        type: DataTypes.ENUM(["A", "B", "C", "D"]),
        allowNull: false,
      },
      isCorrected: {
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
