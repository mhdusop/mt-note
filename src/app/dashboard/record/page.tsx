"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SquarePen, Trash, FilePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Record } from "@/interfaces/record"
import RecordDialog from "./components/RecordDialog"
import { formatDate } from "@/app/utils/formatDate"

export default function RecordPage() {
   const router = useRouter()

   const [records, setRecords] = useState<Record[]>([])
   const [loading, setLoading] = useState(true)
   const [openDialog, setOpenDialog] = useState(false)
   const [selectedId, setSelectedId] = useState<string | null>(null)

   const fetchRecords = async () => {
      try {
         const res = await fetch("/api/record")
         const data = await res.json()
         setRecords(data)
      } catch (error) {
         console.error("Failed to fetch records:", error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      const sessionData = sessionStorage.getItem("user")

      if (!sessionData) {
         router.replace("/auth/login")
         return
      }

      const session = JSON.parse(sessionData)
      if (session.role !== "ADMIN" && session.role !== "MEMBER") {
         router.replace("/dashboard")
         return
      }

      fetchRecords()
   }, [])

   const handleEdit = (id: string) => {
      router.push(`/dashboard/record/${id}/edit`)
   }

   if (loading) return <div>Loading...</div>

   return (
      <div className="p-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Maintenance Records</h1>
            <button
               onClick={() => router.push("/dashboard/record/create")}
               className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg flex gap-1 items-center cursor-pointer"
            >
               <FilePlus size={17} /> Add Record
            </button>
         </div>

         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {records.map((record) => (
                  <TableRow key={record.id}>
                     <TableCell>{record.asset?.name || "N/A"}</TableCell>
                     <TableCell>{record.performed_by}</TableCell>
                     <TableCell>{formatDate(record.performed_date)}</TableCell>
                     <TableCell>{record.status}</TableCell>
                     <TableCell className="text-right">
                        <button onClick={() => handleEdit(record.id)} className="cursor-pointer">
                           <SquarePen className="text-yellow-400" size={18} />
                        </button>
                        <button
                           className="ml-2 cursor-pointer"
                           onClick={() => {
                              setSelectedId(record.id)
                              setOpenDialog(true)
                           }}
                        >
                           <Trash className="text-red-400" size={18} />
                        </button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         {selectedId && (
            <RecordDialog
               open={openDialog}
               onClose={() => setOpenDialog(false)}
               recordId={selectedId}
               onDeleted={fetchRecords}
            />
         )}
      </div>
   )
}