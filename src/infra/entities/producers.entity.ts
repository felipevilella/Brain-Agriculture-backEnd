import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { STATES_TYPE } from "../definitions/localizations.type";
import { TYPE_DOCUMENT } from "../definitions/producers.type";
import { Farms } from "./farms.entity";

@Entity("producers")
export class Producers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    type: "enum",
    enum: STATES_TYPE,
    nullable: false,
  })
  state: STATES_TYPE;

  @Column({ nullable: false, unique: true })
  document: string;

  @Column({ nullable: false })
  typeDocument: TYPE_DOCUMENT;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Farms, (farm) => farm.producer, { cascade: true })
  farms: Farms[];
}
