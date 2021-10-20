module.exports = (sequelize, DataTypes) => {
  const CourseCat = sequelize.define(
    "CourseCat",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      underscored: true,
    }
  );

  CourseCat.associate = models => {
    CourseCat.hasMany(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    CourseCat.hasMany(models.Course, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return CourseCat;
};
