import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { vi } from 'vitest';
import { Product } from '../../models/product.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { List } from './list';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let productService: ProductService;
  let messageService: MessageService;

  beforeEach(async () => {
    const messageServiceSpy = {
      add: vi.fn(),
    };
    const confirmationServiceSpy = {
      confirm: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        ProductService,
        LocalStorageService,
        ChangeDetectorRef,
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        DialogService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    messageService = TestBed.inject(MessageService);
    localStorage.clear();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty products', () => {
    expect(component.products).toEqual([]);
    expect(component.filteredProducts).toEqual([]);
    expect(component.totalProducts).toBe(0);
  });

  it('should format price correctly', () => {
    const formatted = component.formatPrice(100.5);
    expect(formatted).toContain('R$');
    expect(formatted).toContain('100,50');
  });

  it('should format date correctly', () => {
    const date = '2024-01-15T10:00:00.000Z';
    const formatted = component.formatDate(date);
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });

  it('should filter products by name', () => {
    productService.createProduct({
      name: 'Product A',
      description: 'Description A',
      price: 100,
      category: 'Category A',
    });
    productService.createProduct({
      name: 'Product B',
      description: 'Description B',
      price: 200,
      category: 'Category B',
    });

    component.products = productService.getProductsValue();
    component.filterProducts('Product A');

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product A');
  });

  it('should filter products by description', () => {
    productService.createProduct({
      name: 'Product A',
      description: 'Unique Description',
      price: 100,
      category: 'Category A',
    });

    component.products = productService.getProductsValue();
    component.filterProducts('Unique');

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].description).toContain('Unique');
  });

  it('should filter products by category', () => {
    productService.createProduct({
      name: 'Product A',
      description: 'Description A',
      price: 100,
      category: 'Electronics',
    });
    productService.createProduct({
      name: 'Product B',
      description: 'Description B',
      price: 200,
      category: 'Books',
    });

    const products = productService.getProductsValue();
    component.products = [...products];
    component.filteredProducts = [...products];
    component.filterProducts('Electronics');

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].category).toBe('Electronics');
  });

  it('should return all products when filter is empty', () => {
    productService.createProduct({
      name: 'Product A',
      description: 'Description A',
      price: 100,
      category: 'Category A',
    });
    productService.createProduct({
      name: 'Product B',
      description: 'Description B',
      price: 200,
      category: 'Category B',
    });

    const products = productService.getProductsValue();
    component.products = [...products];
    component.filteredProducts = [...products];
    component.filterProducts('');

    expect(component.filteredProducts.length).toBe(component.products.length);
  });

  it('should truncate description correctly', () => {
    const longDescription = 'a'.repeat(100);
    const truncated = component.truncateDescription(longDescription, 50);

    expect(truncated.length).toBe(53);
    expect(truncated).toContain('...');
  });

  it('should return empty string for null description', () => {
    const result = component.truncateDescription('', 50);
    expect(result).toBe('');
  });

  it('should return full description if shorter than max length', () => {
    const shortDescription = 'Short';
    const result = component.truncateDescription(shortDescription, 50);
    expect(result).toBe(shortDescription);
  });

  it('should refresh products', () => {
    productService.createProduct({
      name: 'Product A',
      description: 'Description A',
      price: 100,
      category: 'Category A',
    });

    component.refreshProducts();

    expect(component.products.length).toBeGreaterThan(0);
    expect(component.filteredProducts.length).toBeGreaterThan(0);
    expect(component.totalProducts).toBeGreaterThan(0);
  });

  it('should delete product successfully', () => {
    const product = productService.createProduct({
      name: 'Product to Delete',
      description: 'Description',
      price: 100,
      category: 'Category',
    });

    component.products = productService.getProductsValue();
    component.deleteProduct(product.id);

    expect(messageService.add).toHaveBeenCalled();
    expect(component.products.find((p) => p.id === product.id)).toBeUndefined();
  });

  it('should track products by id', () => {
    const product1: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'Category',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    const product2: Product = {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      category: 'Category',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    expect(component.trackByProductId(0, product1)).toBe('1');
    expect(component.trackByProductId(1, product2)).toBe('2');
  });

  it('should filter products immediately', () => {
    component.filterProducts('test');
    expect(component.searchTerm).toBe('test');
  });
});
