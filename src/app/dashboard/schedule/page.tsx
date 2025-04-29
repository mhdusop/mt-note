"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Schedule } from "@/interfaces/schedule"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { CalendarPlus, SquarePen, Trash } from "lucide-react"
import { formatDate } from "@/app/utils/formatDate"
import ScheduleDialog from "./components/ScheduleDialog"

export default function SchedulePage() {
   const router = useRouter()

   const [schedules, setSchedules] = useState<Schedule[]>([])
   const [loading, setLoading] = useState(true)
   const [openDialog, setOpenDialog] = useState(false)
   const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null)

   const fetchSchedules = async () => {
      try {
         const res = await fetch("/api/schedule")
         const data = await res.json()
         setSchedules(data)
      } catch (error) {
         console.error("Failed to fetch schedules:", error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchSchedules()
   }, [])

   const handleEdit = (id: string) => {
      router.push(`/dashboard/schedule/${id}/edit`)
   }

   if (loading) return <div>Loading...</div>

   return (
      <div className="p-6">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Schedule Management</h1>
            <button
               onClick={() => router.push("/dashboard/schedule/create")}
               className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg flex items-center gap-1 cursor-pointer"
            >
               <CalendarPlus size={17} /> Add Schedule
            </button>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                     <TableCell>{schedule.asset.name}</TableCell>
                     <TableCell>{formatDate(schedule.date)}</TableCell>
                     <TableCell>{schedule.type}</TableCell>
                     <TableCell>{schedule.notes || "-"}</TableCell>
                     <TableCell className="text-right space-x-2">
                        <button onClick={() => handleEdit(schedule.id)} className="cursor-pointer">
                           <SquarePen className="text-yellow-400" size={18} />
                        </button>
                        <button
                           onClick={() => {
                              setSelectedScheduleId(schedule.id)
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
         {selectedScheduleId && (
            <ScheduleDialog
               open={openDialog}
               onClose={() => setOpenDialog(false)}
               scheduleId={selectedScheduleId}
               onDeleted={() => {
                  fetchSchedules()
               }}
            />
         )}
      </div>
   )
}