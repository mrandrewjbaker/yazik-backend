import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "Users",
  indexes: [
    {
      unique: true,
      fields: ["email", "username"],
    },
  ],
})
export class User extends Model {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
