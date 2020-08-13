import {Router} from 'express';
import CatalogController from '../../api/controllers/catalog.controller';


 class CatalogRoute { 

    public catalogController: CatalogController = new CatalogController();
    public router = Router();

    constructor(){
        this.router.get('/', this.catalogController.GetCatalog);
    }

}

export default new CatalogRoute();