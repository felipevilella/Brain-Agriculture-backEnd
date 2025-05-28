import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Crops } from "./crops.entity";
import { Farms } from "./farms.entity";

@Entity("harvests")
export class Harvests {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  farmId: string;

  @ManyToOne(() => Farms, (farm) => farm.harvests, { onDelete: "CASCADE" })
  @JoinColumn({ name: "farmId" })
  farm: Farms;

  @OneToMany(() => Crops, (crop) => crop.harvests, {
    cascade: true,
    eager: true,
  })
  crops: Crops[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
