import { Catalog } from "../../entities/catalog.entity";
import FilterRequestCatalogDto from "../../../api/dtos/filter.catalog";

export default interface ICatalogService {
  GetCatalog(request: FilterRequestCatalogDto): Promise<Array<Catalog>>;
}
