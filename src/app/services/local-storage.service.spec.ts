import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item', () => {
    const key = 'test-key';
    const value = { name: 'Test', value: 123 };

    const setResult = service.setItem(key, value);
    expect(setResult).toBe(true);

    const retrievedValue = service.getItem<typeof value>(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should return null for non-existent key', () => {
    const value = service.getItem('non-existent-key');
    expect(value).toBeNull();
  });

  it('should remove item', () => {
    const key = 'test-key';
    const value = { name: 'Test' };

    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);

    const removeResult = service.removeItem(key);
    expect(removeResult).toBe(true);
    expect(service.getItem(key)).toBeNull();
  });

  it('should clear all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');

    expect(service.getItem('key1')).toBe('value1');
    expect(service.getItem('key2')).toBe('value2');

    const clearResult = service.clear();
    expect(clearResult).toBe(true);
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });

  it('should handle complex objects', () => {
    const key = 'complex-object';
    const complexObject = {
      string: 'test',
      number: 123,
      boolean: true,
      array: [1, 2, 3],
      nested: { key: 'value' },
    };

    service.setItem(key, complexObject);
    const retrieved = service.getItem<typeof complexObject>(key);

    expect(retrieved).toEqual(complexObject);
    expect(retrieved?.nested.key).toBe('value');
    expect(retrieved?.array).toEqual([1, 2, 3]);
  });

  it('should handle string values', () => {
    const key = 'string-key';
    const value = 'test string';

    service.setItem(key, value);
    const retrieved = service.getItem<string>(key);

    expect(retrieved).toBe(value);
  });

  it('should handle number values', () => {
    const key = 'number-key';
    const value = 42;

    service.setItem(key, value);
    const retrieved = service.getItem<number>(key);

    expect(retrieved).toBe(value);
  });
});
