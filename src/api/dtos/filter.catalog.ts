import { Expose } from 'class-transformer';

export default class FilterRequestCatalogDto {
    @Expose() name!: string;
    @Expose() supplier!: string;
}