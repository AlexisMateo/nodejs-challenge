import { inject, injectable, Container } from "inversify";
import { Request, Response } from 'express';
import InversifyConfig  from '../../configuration/InversifyConfig';
import ICatalogService from "../../domain/interfaces/services/catalog.service.interface";
import { Catalog } from "../../domain/entities/catalog.entity";
import "reflect-metadata";
import FilterRequestCatalogDto from "../dtos/filter.catalog";
import { plainToClass } from 'class-transformer';

@injectable()
export default class CatalogController{

    @inject("ICatalogService") 
    catalogService!: ICatalogService;
    
    public CatalogController(){}

    public async GetCatalog(request:Request,response:Response){

        let requestCatalog:FilterRequestCatalogDto = plainToClass(FilterRequestCatalogDto, request.query);

        let catalog:Array<Catalog> = await InversifyConfig.Init().get<ICatalogService>("ICatalogService").GetCatalog(requestCatalog);
        response.status(200).send(catalog);
    }
}