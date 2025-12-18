import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { vi } from 'vitest';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductService } from '../../services/product.service';
import { Form } from './form';

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;
  let messageService: MessageService;
  let dialogRef: DynamicDialogRef;

  beforeEach(async () => {
    const dialogRefSpy = {
      close: vi.fn(),
    };
    const messageServiceSpy = {
      add: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Form, ReactiveFormsModule],
      providers: [
        FormBuilder,
        ProductService,
        LocalStorageService,
        { provide: DynamicDialogRef, useValue: dialogRefSpy },
        { provide: DynamicDialogConfig, useValue: { data: {} } },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    dialogRef = TestBed.inject(DynamicDialogRef);
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.productForm).toBeTruthy();
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('price')?.value).toBe(0);
    expect(component.productForm.get('category')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.productForm;
    expect(form.get('name')?.hasError('required')).toBe(true);
    expect(form.get('description')?.hasError('required')).toBe(true);
    expect(form.get('category')?.hasError('required')).toBe(true);

    const priceControl = form.get('price');
    priceControl?.setValue(null);
    expect(priceControl?.hasError('required')).toBe(true);

    priceControl?.setValue(0);
    expect(priceControl?.hasError('min')).toBe(true);
  });

  it('should validate min length for name', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('ab');
    expect(nameControl?.hasError('minlength')).toBe(true);
    nameControl?.setValue('abc');
    expect(nameControl?.hasError('minlength')).toBe(false);
  });

  it('should validate min length for description', () => {
    const descControl = component.productForm.get('description');
    descControl?.setValue('short');
    expect(descControl?.hasError('minlength')).toBe(true);
    descControl?.setValue('This is a longer description');
    expect(descControl?.hasError('minlength')).toBe(false);
  });

  it('should validate max length for description', () => {
    const descControl = component.productForm.get('description');
    const longText = 'a'.repeat(257);
    descControl?.setValue(longText);
    expect(descControl?.hasError('maxlength')).toBe(true);
    const validText = 'a'.repeat(256);
    descControl?.setValue(validText);
    expect(descControl?.hasError('maxlength')).toBe(false);
  });

  it('should validate min price', () => {
    const priceControl = component.productForm.get('price');
    priceControl?.setValue(0);
    expect(priceControl?.hasError('min')).toBe(true);
    priceControl?.setValue(0.01);
    expect(priceControl?.hasError('min')).toBe(false);
  });

  it('should return correct error messages', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.markAsTouched();
    nameControl?.setValue('');
    expect(component.getFieldError('name')).toBe('Este campo é obrigatório');

    nameControl?.setValue('ab');
    expect(component.getFieldError('name')).toContain('mínimo 3 caracteres');

    const descControl = component.productForm.get('description');
    descControl?.markAsTouched();
    const longText = 'a'.repeat(257);
    descControl?.setValue(longText);
    expect(component.getFieldError('description')).toContain('máximo 256 caracteres');

    const priceControl = component.productForm.get('price');
    priceControl?.markAsTouched();
    priceControl?.setValue(0);
    expect(component.getFieldError('price')).toBe('O valor deve ser maior que zero');
  });

  it('should detect invalid fields', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    expect(component.isFieldInvalid('name')).toBe(true);

    nameControl?.setValue('Valid Name');
    expect(component.isFieldInvalid('name')).toBe(false);
  });

  it('should create product on submit', () => {
    component.productForm.patchValue({
      name: 'Test Product',
      description: 'Test Description with enough characters',
      price: 100.0,
      category: 'Test Category',
    });

    component.onSubmit();

    expect(component.loading).toBe(false);
    expect(messageService.add).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalledWith('success');
  });

  it('should not submit invalid form', () => {
    component.productForm.patchValue({
      name: '',
      description: '',
      price: 0,
      category: '',
    });

    component.onSubmit();

    expect(messageService.add).toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
