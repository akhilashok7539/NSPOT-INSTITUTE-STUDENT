import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  download()
  {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    doc.html(pdfTable, {
      callback: function (doc) {
        doc.save('ApplicationForm.pdf');
      },
      margin: [20, 60, 60, 20],
      html2canvas: { scale: .17 },
    });

  }
}
