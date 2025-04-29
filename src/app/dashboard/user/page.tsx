"use client"

import { useEffect, useState } from "react"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { User } from "@/interfaces/user"
import { SquarePen, Trash, UserRoundPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import UserDialog from "./components/UserDialog"

export default function UserPage() {
   const router = useRouter()

   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState(true)
   const [openDialog, setOpenDialog] = useState(false)
   const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

   const fetchUsers = async () => {
      try {
         const res = await fetch("/api/user", { method: "GET" })
         const data = await res.json()
         setUsers(data)
      } catch (error) {
         console.error("Failed to fetch users:", error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchUsers()
   }, [])

   const handleEdit = (id: string) => {
      router.push(`/dashboard/user/${id}/edit`)
   }

   if (loading) return <div>Loading...</div>

   return (
      <>
         <div className="flex justify-between">
            <span></span>
            <button
               onClick={() => router.push("/dashboard/user/create")}
               className="mb-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg flex justify-center items-center gap-1 cursor-pointer"
            >
               <UserRoundPlus size={17} /> Add User
            </button >
         </div>
         <div className="p-5 border-1 rounded-lg">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[200px]">Name</TableHead>
                     <TableHead>Email</TableHead>
                     <TableHead>Role</TableHead>
                     <TableHead className="text-right">Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {users.map((user) => (
                     <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                           <button onClick={() => handleEdit(user.id)} className="cursor-pointer">
                              <SquarePen className="text-yellow-300" size={18} />
                           </button>
                           <button
                              className="ml-2 cursor-pointer"
                              onClick={() => {
                                 setSelectedUserId(user.id)
                                 setOpenDialog(true)
                              }}
                           >
                              <Trash className="text-red-300" size={18} />
                           </button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            {selectedUserId && (
               <UserDialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  userId={selectedUserId}
                  onDeleted={() => {
                     fetchUsers()
                  }}
               />
            )}
         </div>
      </>
   )
}