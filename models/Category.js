module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNill: false,
      },
    },
    {
      underscored: true,
    }
  );
};
