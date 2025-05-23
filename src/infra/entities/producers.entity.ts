import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { STATES_TYPE } from "../definitions/localizations.type";
import { TYPE_DOCUMENT } from "../definitions/producers.type";

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
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
