import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.trim().length === 0) {
              return { whitespace: true };
            }
            return null;
          },
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(256),
          (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.trim().length === 0) {
              return { whitespace: true };
            }
            return null;
          },
        ],
      ],
      price: [0, [Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
      category: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.trim().length === 0) {
              return { whitespace: true };
            }
            return null;
          },
        ],
      ],
    });
  }

  loadProduct(id: string): void {
    try {
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
          detail: 'Produto não encontrado. O produto pode ter sido removido.',
        });
        this.dialogRef.close();
      }
    } catch (error) {
      console.error('Erro ao carregar produto', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar os dados do produto.',
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

    const formValue = {
      name: this.productForm.get('name')?.value?.trim() || '',
      description: this.productForm.get('description')?.value?.trim() || '',
      price: this.productForm.get('price')?.value || 0,
      category: this.productForm.get('category')?.value?.trim() || '',
    };

    try {
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
          throw new Error('Falha ao atualizar produto');
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
          throw new Error('Falha ao criar produto');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar produto', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: this.isEditMode
          ? 'Não foi possível atualizar o produto. Tente novamente.'
          : 'Não foi possível criar o produto. Verifique os dados e tente novamente.',
      });
      this.loading = false;
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

    if (field?.hasError('whitespace')) {
      return 'Este campo não pode conter apenas espaços';
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

    if (field?.hasError('max')) {
      return 'O valor excede o limite máximo permitido';
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
