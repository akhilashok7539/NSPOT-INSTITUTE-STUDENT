import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('myModal', {static: false}) modal: ElementRef;
  currentUrl;
  constructor() { }

  ngOnInit(): void {
    this.modal.nativeElement.style.display = 'none';
    this.currentUrl = window.location.href;

    console.log(this.currentUrl);
    console.log("current", window.location.href);
  }
  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
