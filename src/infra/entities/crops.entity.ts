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
import { Farms } from "./farms.entity";
import { Harvests } from "./havests.entity";
import { Producers } from "./producers.entity";

@Entity("crops")
export class Crops {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  farmId: string;

  @Column({ nullable: false })
  harvestId: string;

  @Column({
    type: "enum",
    enum: CROPY_TYPES,
    nullable: false,
  })
  cropType: CROPY_TYPES;

  @Column({ nullable: false, length: 2 })
  state: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  area: number;

  @ManyToOne(() => Producers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "farmId" })
  farms: Farms;

  @ManyToOne(() => Producers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "harvestId" })
  harvests: Harvests;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
