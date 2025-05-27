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

import { Harvests } from "./havests.entity";
import { Producers } from "./producers.entity";

@Entity("farms")
export class Farms {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  producerId: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column("float")
  totalArea: number;

  @Column("float")
  arableArea: number;

  @Column("float")
  vegetationArea: number;

  @ManyToOne(() => Producers, (producer) => producer.farms)
  @JoinColumn({ name: "producerId" })
  producer: Producers;

  
  @OneToMany(() => Harvests, (harvest) => harvest.farm, {
    eager: true,
    cascade: true,
  })
  harvests: Harvests[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
