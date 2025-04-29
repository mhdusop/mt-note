import AssetForm from "../../components/AssetForm"
import { prisma } from "@/libs/client"
import { notFound } from "next/navigation"

export default async function EditAssetPage({ params }: { params: { id: string } }) {
   const asset = await prisma.asset.findUnique({
      where: { id: params.id },
   })

   if (!asset) return notFound()

   return (
      <div className="max-w-lg mx-auto mt-6">
         <h1 className="text-2xl font-semibold mb-4">Edit Asset</h1>
         <AssetForm
            data={{
               ...asset,
               description: asset.description ?? ""
            }}
         />
      </div>
   )
}
