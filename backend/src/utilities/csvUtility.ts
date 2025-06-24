
import * as XLSX from 'xlsx';

export function exportCSV(data:any[],name:string):Buffer{

    const keys = Object.keys(data[0])
    const values = data.map(row => keys.map(k => row[k]).join(','));
    const rows = [keys.join(","),...values]

    const worksheet = XLSX.utils.aoa_to_sheet(rows.map(r=>[r]))
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook,worksheet,name)

    const buffer= XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
    return buffer

}