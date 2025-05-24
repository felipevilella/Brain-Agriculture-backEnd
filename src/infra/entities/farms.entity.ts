import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { STATES_TYPE } from "../definitions/localizations.type";
import { Producers } from "./producers.entity";

@Entity("farms")
export class Farms {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  producerId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    type: "enum",
    enum: STATES_TYPE,
    nullable: false,
  })
  state: STATES_TYPE;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  totalArea: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  arableArea: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  vegetationArea: number;

  @ManyToOne(() => Producers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "producerId" })
  producers: Producers;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
