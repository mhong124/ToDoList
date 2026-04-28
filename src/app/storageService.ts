import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    // Check if the platform is browser during service initialization
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null; // Return null if on server
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
