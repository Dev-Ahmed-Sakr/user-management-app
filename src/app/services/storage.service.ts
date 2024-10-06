import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  setItem(key: string, value: string): void {
      console.log('Set' + value);
      localStorage.setItem(key, value);
    
  }

  getItem(key: string): string | null {
      return localStorage.getItem(key);
  }

  removeItem(key: string): void {
      console.log('remove');
      localStorage.removeItem(key);
    
  }
}
