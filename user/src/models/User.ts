import { Table, Column, Model,DataType, AllowNull } from "sequelize-typescript";
import {HasOne} from "sequelize-typescript";

import {MetaUser} from "./MetaUser";



@Table({
    timestamps: true 
})
export class User extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare second_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare middle_name: string;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare email: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare social: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare avatar: string


    @HasOne(()=>MetaUser, 'userId')
    declare Meta: MetaUser
}