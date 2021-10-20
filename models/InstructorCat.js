module.exports = (sequelize, DataTypes) => {
  const InstructorCat = sequelize.define(
    "InstructorCat",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      instructorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      underscored: true,
    }
  );

  InstructorCat.associate = models => {
    InstructorCat.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    InstructorCat.belongsTo(models.Instructor, {
      foreignKey: {
        name: "instructorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return InstructorCat;
};
