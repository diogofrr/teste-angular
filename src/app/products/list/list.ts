import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Form } from '../form/form';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ConfirmDialogModule,
    DialogModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, DialogService],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  totalProducts = 0;
  searchTerm = '';
  private destroy$ = new Subject<void>();

  private productService = inject(ProductService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.subscribeToProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeToProducts(): void {
    this.loading = true;
    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products: Product[]) => {
          this.updateProductsList(products);
          this.loading = false;
        },
        error: (error: unknown) => {
          console.error('Erro ao carregar produtos', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar os produtos. Por favor, recarregue a página.',
          });
          this.loading = false;
        },
      });
  }

  private updateProductsList(products: Product[]): void {
    this.products = [...products];
    this.applyFilter(this.searchTerm);
  }

  private applyFilter(searchTerm: string): void {
    if (!searchTerm?.trim()) {
      this.filteredProducts = [...this.products];
      this.totalProducts = this.products.length;
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    this.totalProducts = this.filteredProducts.length;
  }

  refreshProducts(): void {
    const currentProducts = this.productService.getProductsValue();
    this.updateProductsList(currentProducts);
  }

  openProductModal(productId?: string): void {
    const ref = this.dialogService.open(Form, {
      header: productId ? 'Editar Produto' : 'Novo Produto',
      width: '90%',
      style: { maxWidth: '900px' },
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        productId: productId || null,
      },
    });

    if (ref) {
      ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: (result: unknown) => {
          if (result === 'success') {
            this.refreshProducts();
          }
        },
        error: (error: unknown) => {
          console.error('Erro ao fechar modal', error);
        },
      });
    }
  }

  navigateToCreate(): void {
    this.openProductModal();
  }

  navigateToEdit(id: string): void {
    this.openProductModal(id);
  }

  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir o produto "${product.name}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteProduct(product.id);
      },
    });
  }

  deleteProduct(id: string): void {
    try {
      const success = this.productService.deleteProduct(id);

      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto excluído com sucesso',
        });
        this.refreshProducts();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir o produto. Tente novamente.',
        });
      }
    } catch (error) {
      console.error('Erro ao excluir produto', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro inesperado ao excluir o produto.',
      });
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  filterProducts(searchTerm: string): void {
    this.searchTerm = searchTerm || '';
    this.applyFilter(this.searchTerm);
  }

  trackByProductId(_index: number, product: Product): string {
    return product.id;
  }

  truncateDescription(description: string, maxLength: number): string {
    if (!description) {
      return '';
    }
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  }
}
