import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor() { }

  public exportJson<T>(fileName: string, data: T[]) {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  public importExcel<T>(event): Promise<T[]> {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
      fileReader.onload = (e) => {
        const arrayBuffer:any = fileReader.result;
        const data = new Uint8Array(arrayBuffer);
        const arr = [];
        for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        const bstr = arr.join('');
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        const arraylist: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(arraylist)
        resolve(arraylist);
      };
    });
  }
}
