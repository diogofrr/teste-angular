import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

const STORAGE_KEY = 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    try {
      const products = this.localStorageService.getItem<Product[]>(STORAGE_KEY) || [];
      const validProducts = this.validateProducts(products);
      this.productsSubject.next(validProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos do localStorage', error);
      this.productsSubject.next([]);
    }
  }

  private validateProducts(products: unknown): Product[] {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.filter((product): product is Product => {
      return (
        product !== null &&
        typeof product === 'object' &&
        'id' in product &&
        'name' in product &&
        'description' in product &&
        'price' in product &&
        'category' in product &&
        'createdAt' in product &&
        'updatedAt' in product &&
        typeof product.id === 'string' &&
        typeof product.name === 'string' &&
        typeof product.description === 'string' &&
        typeof product.price === 'number' &&
        typeof product.category === 'string' &&
        typeof product.createdAt === 'string' &&
        typeof product.updatedAt === 'string' &&
        product.price >= 0 &&
        product.name.trim().length > 0 &&
        product.category.trim().length > 0
      );
    });
  }

  private saveProducts(products: Product[]): void {
    this.localStorageService.setItem(STORAGE_KEY, products);
    this.productsSubject.next(products);
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsValue(): Product[] {
    return this.productsSubject.value;
  }

  getProductById(id: string): Product | undefined {
    const products = this.productsSubject.value;
    return products.find((p) => p.id === id);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    try {
      if (!product.name?.trim() || !product.description?.trim() || !product.category?.trim()) {
        throw new Error('Campos obrigatórios não preenchidos');
      }

      if (product.price < 0 || !isFinite(product.price)) {
        throw new Error('Preço inválido');
      }

      const newProduct: Product = {
        ...product,
        name: product.name.trim(),
        description: product.description.trim(),
        category: product.category.trim(),
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const products = [...this.productsSubject.value, newProduct];
      this.saveProducts(products);
      return newProduct;
    } catch (error) {
      console.error('Erro ao criar produto', error);
      throw error;
    }
  }

  updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
    try {
      const products = this.productsSubject.value;
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        return null;
      }

      if (updates.name !== undefined && !updates.name?.trim()) {
        throw new Error('Nome do produto não pode ser vazio');
      }

      if (updates.price !== undefined && (updates.price < 0 || !isFinite(updates.price))) {
        throw new Error('Preço inválido');
      }

      const updatedProduct: Product = {
        ...products[index],
        ...updates,
        name: updates.name?.trim() ?? products[index].name,
        description: updates.description?.trim() ?? products[index].description,
        category: updates.category?.trim() ?? products[index].category,
        updatedAt: new Date().toISOString(),
      };

      products[index] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct;
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
      throw error;
    }
  }

  deleteProduct(id: string): boolean {
    try {
      const products = this.productsSubject.value;
      const initialLength = products.length;
      const filteredProducts = products.filter((p) => p.id !== id);

      if (filteredProducts.length === initialLength) {
        return false;
      }

      this.saveProducts(filteredProducts);
      return true;
    } catch (error) {
      console.error('Erro ao excluir produto', error);
      return false;
    }
  }

  private generateId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    const counter = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}-${counter}`;
  }
}
