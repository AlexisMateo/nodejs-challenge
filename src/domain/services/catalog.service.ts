import { injectable, inject } from "inversify";
import "reflect-metadata";

import ICatalogRepository from "../interfaces/repositories/catalog.repository.interface";
import { Catalog } from "../entities/catalog.entity";
import ICatalogService from "../interfaces/services/catalog.service.interface";
import FilterRequestCatalogDto from "../../api/dtos/filter.catalog";

@injectable()
export default class CatalogService implements ICatalogService {
  @inject("ICatalogRepository")
  catalogRepository!: ICatalogRepository;

  public CatalogService() {}

  async GetCatalog(request: FilterRequestCatalogDto): Promise<Array<Catalog>> {
    let catalog: Catalog[] = await this.catalogRepository.GetCatalog(request);

    if (catalog == null || catalog.length <= 0) {
      const error = new Error();
      error.message = "Mobiles not found";
      error["status"] = 404;
      throw error;
    }

    return catalog;
  }
}
