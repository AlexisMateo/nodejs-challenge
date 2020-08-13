import { Container } from "inversify";
import IAuthRepository from "../domain/interfaces/repositories/auth.repository.interface";
import IAuthService from "../domain/interfaces/services/auth.service.interface";
import AuthRepository from "../infrastructure/repositories/auth.repository";
import AuthService from "../domain/services/auth.service";
import CatalogService from "../domain/services/catalog.service";
import CatalogRepository from "../infrastructure/repositories/catalog.repository";
import ICatalogRepository from "../domain/interfaces/repositories/catalog.repository.interface";
import ICatalogService from "../domain/interfaces/services/catalog.service.interface";
import IAzureService from "../domain/interfaces/services/azure.service.interface";
import AzureService from "../domain/services/azure.service";

export default class InversifyConfig {
  public static Init(): Container {
    let container: Container = new Container();

    container
      .bind<IAuthRepository>("IAuthRepository")
      .to(AuthRepository)
      .inTransientScope();
    container
      .bind<IAuthService>("IAuthService")
      .to(AuthService)
      .inTransientScope();

    container
      .bind<ICatalogRepository>("ICatalogRepository")
      .to(CatalogRepository)
      .inTransientScope();
    container
      .bind<ICatalogService>("ICatalogService")
      .to(CatalogService)
      .inTransientScope();
    container
      .bind<IAzureService>("IAzureService")
      .to(AzureService)
      .inTransientScope();

    return container;
  }
}
