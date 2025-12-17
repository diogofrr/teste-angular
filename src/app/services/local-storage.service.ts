import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      this.storage.setItem(test, test);
      this.storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  getItem<T>(key: string): T | null {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage não está disponível');
      return null;
    }

    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Erro ao ler do localStorage: ${error}`);
      return null;
    }
  }

  setItem<T>(key: string, value: T): boolean {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage não está disponível');
      return false;
    }

    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Erro ao salvar no localStorage: ${error}`);
      return false;
    }
  }

  removeItem(key: string): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Erro ao remover do localStorage: ${error}`);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error(`Erro ao limpar localStorage: ${error}`);
      return false;
    }
  }
}
