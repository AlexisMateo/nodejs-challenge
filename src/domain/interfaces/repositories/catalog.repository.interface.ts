import Employee from "../../../api/models/Employee";
import { Catalog } from "../../entities/catalog.entity";
import FilterRequestCatalogDto from "../../../api/dtos/filter.catalog";

export default interface ICatalogRepository{
    GetCatalog(request:FilterRequestCatalogDto):Promise<Array<Catalog>>;
}