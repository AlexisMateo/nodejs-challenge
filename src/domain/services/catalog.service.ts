import { injectable, inject } from "inversify";
import "reflect-metadata";

import ICatalogRepository from "../interfaces/repositories/catalog.repository.interface";
import { Catalog } from "../entities/catalog.entity";
import ICatalogService from "../interfaces/services/catalog.service.interface";
import FilterRequestCatalogDto from "../../api/dtos/filter.catalog";
import { CustomException } from "../../api/models/custom.execption";
import log from "../../configuration/logger";

@injectable()
export default class CatalogService implements ICatalogService {
  
  @inject("ICatalogRepository")
  catalogRepository!: ICatalogRepository;

  public CatalogService() {}

  async GetCatalog(request: FilterRequestCatalogDto): Promise<Array<Catalog>> {

    let catalog: Catalog[] = await this.catalogRepository.GetCatalog(request);

    if (catalog == null || catalog.length <= 0) {
      log.error("mobiles no found");
      const error = new CustomException("Mobiles not found",404);
      throw error;
    }

    return catalog;
  }
}
