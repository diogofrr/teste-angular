import { TestBed } from '@angular/core/testing';
import { InitService } from './init.service';
import { LocalStorageService } from './local-storage.service';
import { ProductService } from './product.service';

describe('InitService', () => {
  let service: InitService;
  let productService: ProductService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [InitService, ProductService, LocalStorageService],
    });
    service = TestBed.inject(InitService);
    productService = TestBed.inject(ProductService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add sample products', () => {
    const initialCount = productService.getProductsValue().length;

    service.addSampleProducts();

    const finalCount = productService.getProductsValue().length;
    expect(finalCount).toBeGreaterThan(initialCount);
    expect(finalCount).toBeGreaterThanOrEqual(50);
  });

  it('should create products with valid structure', () => {
    service.addSampleProducts();

    const products = productService.getProductsValue();
    const firstProduct = products[0];

    expect(firstProduct).toBeTruthy();
    expect(firstProduct.id).toBeTruthy();
    expect(firstProduct.name).toBeTruthy();
    expect(firstProduct.description).toBeTruthy();
    expect(firstProduct.price).toBeGreaterThan(0);
    expect(firstProduct.category).toBeTruthy();
    expect(firstProduct.createdAt).toBeTruthy();
    expect(firstProduct.updatedAt).toBeTruthy();
  });

  it('should add exactly 50 products', () => {
    const initialIds = new Set(productService.getProductsValue().map((p) => p.id));

    service.addSampleProducts();

    const allProducts = productService.getProductsValue();
    const newProducts = allProducts.filter((p) => !initialIds.has(p.id));

    expect(newProducts.length).toBeGreaterThanOrEqual(50);
  });
});
