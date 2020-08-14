import "reflect-metadata";
import {getManager} from "typeorm";
import { Supplier } from "../../domain/entities/supplier.entity";


export default class SupplierRepository{


     async GetSupplier(supplier:string):Promise<Supplier|undefined>
     {
        var suplier = await getManager().findOne(Supplier,{where:{name:supplier}});

        return suplier;
     }

     async GetSuppliers():Promise<Supplier[]|[]>
     {
        var supliers = await getManager().find(Supplier);

        return supliers;
     }

}