module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "Promotion",
    {
      discountRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountUntil: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
};
