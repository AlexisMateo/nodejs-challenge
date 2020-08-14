import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { hashSync, genSaltSync } from "bcrypt";
import { Supplier } from "./supplier.entity";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "email", nullable: true, length: 45 })
  email!: string;

  @Column("varchar",{ 
    name:"password",
    nullable:true,
    length: 300,
    transformer: {
        from(value) {
          return value;
        },
        to(value) {
          var hashedPassword = hashSync(value, genSaltSync(10));
          return hashedPassword;
        }
      }
    })
  password!: string;

  @ManyToOne(type => Supplier,{eager:true})
  @JoinColumn()
  suppier!:Supplier

  constructor(email:string,password:string) {
    this.email = email;
    this.password = password;
  }
}
