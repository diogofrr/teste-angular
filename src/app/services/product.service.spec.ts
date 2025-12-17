import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, LocalStorageService],
    });
    service = TestBed.inject(ProductService);
    localStorageService = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array initially', async () => {
    const products = await firstValueFrom(service.getProducts());
    expect(products).toEqual([]);
  });

  it('should create a product', () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100.0,
      category: 'Test Category',
    };

    const product = service.createProduct(productData);

    expect(product).toBeTruthy();
    expect(product.name).toBe(productData.name);
    expect(product.description).toBe(productData.description);
    expect(product.price).toBe(productData.price);
    expect(product.category).toBe(productData.category);
    expect(product.id).toBeTruthy();
    expect(product.createdAt).toBeTruthy();
    expect(product.updatedAt).toBeTruthy();
  });

  it('should get product by id', () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100.0,
      category: 'Test Category',
    };

    const createdProduct = service.createProduct(productData);
    const foundProduct = service.getProductById(createdProduct.id);

    expect(foundProduct).toBeTruthy();
    expect(foundProduct?.id).toBe(createdProduct.id);
    expect(foundProduct?.name).toBe(productData.name);
  });

  it('should return undefined for non-existent product id', () => {
    const product = service.getProductById('non-existent-id');
    expect(product).toBeUndefined();
  });

  it('should update a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100.0,
      category: 'Test Category',
    };

    const createdProduct = service.createProduct(productData);
    await new Promise((resolve) => setTimeout(resolve, 10));
    const updates = { name: 'Updated Product', price: 200.0 };

    const updatedProduct = service.updateProduct(createdProduct.id, updates);

    expect(updatedProduct).toBeTruthy();
    expect(updatedProduct?.name).toBe(updates.name);
    expect(updatedProduct?.price).toBe(updates.price);
    expect(updatedProduct?.description).toBe(productData.description);
    expect(updatedProduct?.updatedAt).not.toBe(createdProduct.updatedAt);
  });

  it('should return null when updating non-existent product', () => {
    const updates = { name: 'Updated Product' };
    const result = service.updateProduct('non-existent-id', updates);
    expect(result).toBeNull();
  });

  it('should delete a product', () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100.0,
      category: 'Test Category',
    };

    const createdProduct = service.createProduct(productData);
    const initialCount = service.getProductsValue().length;

    const deleted = service.deleteProduct(createdProduct.id);

    expect(deleted).toBe(true);
    expect(service.getProductsValue().length).toBe(initialCount - 1);
    expect(service.getProductById(createdProduct.id)).toBeUndefined();
  });

  it('should return false when deleting non-existent product', () => {
    const result = service.deleteProduct('non-existent-id');
    expect(result).toBe(false);
  });

  it('should get products value synchronously', () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100.0,
      category: 'Test Category',
    };

    service.createProduct(productData);
    const products = service.getProductsValue();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0].name).toBe(productData.name);
  });
});
