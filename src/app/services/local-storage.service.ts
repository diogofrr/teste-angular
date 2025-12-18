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
      return null;
    }

    try {
      const item = this.storage.getItem(key);
      if (!item) {
        return null;
      }

      const parsed = JSON.parse(item);

      if (
        parsed === null ||
        (typeof parsed !== 'object' &&
          typeof parsed !== 'string' &&
          typeof parsed !== 'number' &&
          typeof parsed !== 'boolean' &&
          !Array.isArray(parsed))
      ) {
        return null;
      }

      return parsed as T;
    } catch (error) {
      console.error('Erro ao ler do localStorage', error);
      return null;
    }
  }

  setItem<T>(key: string, value: T): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      const serialized = JSON.stringify(value);

      if (serialized.length > 5 * 1024 * 1024) {
        return false;
      }

      this.storage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage', error);
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
      console.error('Erro ao remover do localStorage', error);
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
      console.error('Erro ao limpar localStorage', error);
      return false;
    }
  }
}
