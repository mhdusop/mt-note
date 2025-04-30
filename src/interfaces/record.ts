import { Asset } from "./asset"
import { Status } from "./status"

export interface Record {
  id: string
  asset_id: string
  schedule_id?: string
  performed_date: string
  performed_by: string
  findings?: string
  action_taken?: string
  status: Status
  asset?: Asset
  created_at: string
  updated_at: string
}