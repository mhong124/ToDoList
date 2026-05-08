import { Component, signal, OnInit, inject, ViewChild, ElementRef} from '@angular/core';
import { Api } from '../api/api';
import {MatTabsModule} from '@angular/material/tabs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'mood',
  imports: [MatTabsModule],
  templateUrl: './mood.html',
  styles: ''
})
export class Mood implements OnInit{
  api = inject(Api);

  @ViewChild('download') downloadCanvas! : ElementRef;

  async ngOnInit() {

  }
  
  async captureMood() {
    const element = this.downloadCanvas.nativeElement;
    const canvas = await html2canvas(element);

    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'mood.png';
    link.click();
  }
}