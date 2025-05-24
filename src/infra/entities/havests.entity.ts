import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("harvests")
export class Harvests {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false})
  name: string;

  @Column({ nullable: false})
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
