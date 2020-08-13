import { injectable } from "inversify";
import "reflect-metadata";
import ICatalogRepository from "../../domain/interfaces/repositories/catalog.repository.interface";
import { Catalog } from "../../domain/entities/catalog.entity";
import { Like} from "typeorm";
import {getManager} from "typeorm";
import FilterRequestCatalogDto from "../../api/dtos/filter.catalog";

@injectable()
export default class CatalogRepository implements ICatalogRepository{

    async GetCatalog(request:FilterRequestCatalogDto):Promise<Array<Catalog>>{
        
        let catalog:Catalog[] = await getManager().find(Catalog,{
            where : [{
                name : Like(`%${request.name}%`),
              }, {
                supplier : Like(`%${request.supplier}%`),
            }]
        })

        return catalog;
     }

}