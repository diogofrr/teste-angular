import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    DividerModule,
  ],
  providers: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit, OnDestroy {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  loading = false;
  private destroy$ = new Subject<void>();

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    const productId = this.config.data?.productId;
    if (productId) {
      this.isEditMode = true;
      this.productId = productId;
      this.loadProduct(productId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(256)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  loadProduct(id: string): void {
    const product = this.productService.getProductById(id);

    if (product) {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não encontrado',
      });
      this.dialogRef.close();
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      this.messageService.add({
        severity: 'warn',
        summary: 'Validação',
        detail: 'Por favor, preencha todos os campos corretamente',
      });
      return;
    }

    this.loading = true;
    const formValue = this.productForm.value;

    if (this.isEditMode && this.productId) {
      const updated = this.productService.updateProduct(this.productId, formValue);

      if (updated) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto atualizado com sucesso',
        });
        this.loading = false;
        this.dialogRef.close('success');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar produto',
        });
        this.loading = false;
      }
    } else {
      const created = this.productService.createProduct(formValue);

      if (created) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso',
        });
        this.loading = false;
        this.dialogRef.close('success');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar produto',
        });
        this.loading = false;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Este campo deve ter no mínimo ${minLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength'].requiredLength;
      return `Este campo deve ter no máximo ${maxLength} caracteres`;
    }

    if (field?.hasError('min')) {
      return 'O valor deve ser maior que zero';
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
