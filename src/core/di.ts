import { LocalCatalogRepository } from "@/infrastructure/repositories/LocalCatalogRepository"
import { DrizzleOrderRepository } from "@/infrastructure/repositories/DrizzleOrderRepository"
import { ICatalogRepository } from "./ports/ICatalogRepository"
import { IOrderRepository } from "./ports/IOrderRepository"

export const catalogRepo: ICatalogRepository = new LocalCatalogRepository()
export const orderRepo: IOrderRepository = new DrizzleOrderRepository()
