import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
