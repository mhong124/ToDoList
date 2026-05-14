import { Component, signal, OnInit, inject, ViewChild, ElementRef} from '@angular/core';
import { Api } from '../api/api';
import {MatTabsModule} from '@angular/material/tabs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import { NhGyroid, NhItem, Villager, NhFish } from '../api/models';
import { nhGyroidsGet } from '../api/fn/operations/nh-gyroids-get';
import {nhItemsGet} from '../api/fn/operations/nh-items-get';
import { villagersGet } from '../api/fn/operations/villagers-get';
import { nhFishGet } from '../api/fn/operations/nh-fish-get';


@Component({
  selector: 'mood',
  imports: [MatTabsModule],
  templateUrl: './mood.html',
  styles: ''
})
export class Mood implements OnInit{
  api = inject(Api);
  sanitizer = inject(DomSanitizer);

  @ViewChild('download') downloadCanvas! : ElementRef;

  protected readonly fishResults = signal<NhFish[] | null>(null);

  protected readonly itemResults = signal<NhItem[] | null>(null);

  protected readonly villagerResults = signal<Villager[] | null>(null);

  selectedFish = signal<SafeUrl>(this.sanitizer.bypassSecurityTrustUrl("/mood/fish.png"));

  selectedVillager = signal<SafeUrl>(this.sanitizer.bypassSecurityTrustUrl('/mood/bob.png'));

  selectedItem = signal<SafeUrl>(this.sanitizer.bypassSecurityTrustUrl("/mood/heart.png"));

  async ngOnInit() {
    this.fishResults.set(await this.api.invoke(nhFishGet, {'X-API-KEY': import.meta.env['NG_APP_API_KEY'], 'Accept-Version': '1.7'}));
    this.villagerResults.set(await this.api.invoke(villagersGet, {'X-API-KEY': import.meta.env['NG_APP_API_KEY'], 'Accept-Version': '1.7'}));
    this.itemResults.set(await this.api.invoke(nhItemsGet, {'X-API-KEY': import.meta.env['NG_APP_API_KEY'], 'Accept-Version': '1.7'}))
  }
  
  async captureMood() {
    const element = this.downloadCanvas.nativeElement;
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      logging: true,
      scale: 2,
      imageTimeout: 2000
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mood.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  }

    private async toBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error('Could not fetch image for Base64 conversion', err);
      return url; // Fallback to original URL
    }
  }

  // private async getLocalUrl(url: string): Promise<string> {
  //   try {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     return URL.createObjectURL(blob);
  //   } catch (e) {
  //     console.warn("CORS fetch failed, falling back to original URL", e);
  //     return url;
  //   }
  // }

  async setFish(fishUrl: string) {
    this.selectedFish.set(this.sanitizer.bypassSecurityTrustUrl(fishUrl));
  }

  async setItem(itemUrl : string) {
    this.selectedItem.set(this.sanitizer.bypassSecurityTrustUrl(itemUrl));
  }

  async setVillager(villagerUrl : string) {
    this.selectedVillager.set(this.sanitizer.bypassSecurityTrustUrl(villagerUrl));
  }
}