import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Supplier")
export class Supplier {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name!: string | null;

}
