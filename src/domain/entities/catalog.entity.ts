import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Supplier } from "./supplier.entity";

@Entity("Catalog")
export class Catalog {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name!: string | null;

  @Column("varchar", { name: "supplier", nullable: true, length: 45 })
  supplier!: string | null;

  @Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
  price!: string | null;

  @ManyToOne(type => Supplier,{eager:true})
  @JoinColumn()
  suppier!:Supplier
  
}
