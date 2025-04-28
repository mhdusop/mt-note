"use client"

import { useEffect, useState } from "react"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { User } from "@/interfaces/user"
import { SquarePen, Trash } from "lucide-react"

export default function UserPage() {
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
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

      fetchUsers()
   }, [])

   if (loading) return <div>Loading...</div>

   return (
      <Table>
         <TableCaption>A list of your users.</TableCaption>
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
                     <button>
                        <SquarePen className="text-yellow-300" size={18} />
                     </button>
                     <button className="ml-2">
                        <Trash className="text-red-300" size={18} />
                     </button>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}