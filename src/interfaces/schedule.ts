import { Type } from "@prisma/client"
import { Asset } from "./asset"

export interface Schedule {
  id: string
  asset_id: string
  date: string
  type: Type
  notes?: string
  asset: Asset
}
