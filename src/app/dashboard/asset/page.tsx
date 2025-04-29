"use client"

import { useEffect, useState } from "react"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from "@/components/ui/table"
import { PackagePlus, SquarePen, Trash } from "lucide-react"
import { formatDate } from "@/app/utils/formatDate"
import { useRouter } from "next/navigation"
import AssetDialog from "./components/AssetDialog"

interface Asset {
   id: string
   name: string
   type: string
   location: string
   description?: string
   created_at: string
}

export default function AssetPage() {
   const router = useRouter()

   const [assets, setAssets] = useState<Asset[]>([])
   const [loading, setLoading] = useState(true)
   const [openDialog, setOpenDialog] = useState(false)
   const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)

   const fetchAssets = async () => {
      try {
         const res = await fetch("/api/asset", { method: "GET" })
         const data = await res.json()
         setAssets(data)
      } catch (error) {
         console.error("Failed to fetch assets:", error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchAssets()
   }, [])

   const handleEdit = (id: string) => {
      router.push(`/dashboard/asset/${id}/edit`)
   }

   if (loading) return <div>Loading...</div>

   return (
      <div className="p-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Asset Management</h1>
            <button
               onClick={() => router.push("/dashboard/asset/create")}
               className="mb-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg flex justify-center items-center gap-1 cursor-pointer"
            >
               <PackagePlus size={17} /> Add Asset
            </button >
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {assets.map((asset) => (
                  <TableRow key={asset.id}>
                     <TableCell>{asset.name}</TableCell>
                     <TableCell>{asset.type}</TableCell>
                     <TableCell>{asset.location}</TableCell>
                     <TableCell>{asset.description ?? "-"}</TableCell>
                     <TableCell>{formatDate(asset.created_at)}</TableCell>
                     <TableCell className="text-right space-x-2">
                        <button onClick={() => handleEdit(asset.id)} className="cursor-pointer">
                           <SquarePen className="text-yellow-300" size={18} />
                        </button>
                        <button
                           onClick={() => {
                              setSelectedAssetId(asset.id)
                              setOpenDialog(true)
                           }}
                           className="cursor-pointer">
                           <Trash className="text-red-300" size={18} />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         {selectedAssetId && (
            <AssetDialog
               open={openDialog}
               onClose={() => setOpenDialog(false)}
               assetId={selectedAssetId}
               onDeleted={() => {
                  fetchAssets()
               }}
            />
         )}
      </div>
   )
}
