export function formatDate(dateInput: string | Date): string {
   const date = new Date(dateInput)
 
   return new Intl.DateTimeFormat("en-GB", {
     day: "2-digit",
     month: "short",
     year: "numeric",
     hour: "2-digit",
     minute: "2-digit",
     hour12: true,
   }).format(date)
}
