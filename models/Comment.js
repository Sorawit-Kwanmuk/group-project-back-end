module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.ENUM([1, 2, 3, 4, 5]),
        allowNull: false,
      },
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
};
