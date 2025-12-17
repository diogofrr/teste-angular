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

  /**
   * Carrega produtos do localStorage
   */
  private loadProducts(): void {
    const products = this.localStorageService.getItem<Product[]>(STORAGE_KEY) || [];
    this.productsSubject.next(products);
  }

  /**
   * Salva produtos no localStorage
   */
  private saveProducts(products: Product[]): void {
    this.localStorageService.setItem(STORAGE_KEY, products);
    this.productsSubject.next(products);
  }

  /**
   * Obtém todos os produtos
   */
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  /**
   * Obtém o valor atual dos produtos (síncrono)
   */
  getProductsValue(): Product[] {
    return this.productsSubject.value;
  }

  /**
   * Obtém um produto por ID
   */
  getProductById(id: string): Product | undefined {
    const products = this.productsSubject.value;
    return products.find((p) => p.id === id);
  }

  /**
   * Cria um novo produto
   */
  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const products = [...this.productsSubject.value, newProduct];
    this.saveProducts(products);
    return newProduct;
  }

  /**
   * Atualiza um produto existente
   */
  updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
    const products = this.productsSubject.value;
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const updatedProduct: Product = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;
    this.saveProducts(products);
    return updatedProduct;
  }

  /**
   * Remove um produto
   */
  deleteProduct(id: string): boolean {
    const products = this.productsSubject.value.filter((p) => p.id !== id);

    if (products.length === this.productsSubject.value.length) {
      return false; // Produto não encontrado
    }

    this.saveProducts(products);
    return true;
  }

  /**
   * Gera um ID único
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
