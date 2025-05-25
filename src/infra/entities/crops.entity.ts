import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CROPY_TYPES } from "../definitions/crops.type";
import { Harvests } from "./havests.entity";

@Entity("crops")
export class Crops {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  harvestId: string;

  @Column({
    type: "enum",
    enum: CROPY_TYPES,
    nullable: false,
  })
  name: CROPY_TYPES;

  @ManyToOne(() => Harvests, (harvest) => harvest.crops, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "harvestId" })
  harvests: Harvests;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
