import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Yeni Koleksiyon', 'İndirimli', 'Özel Fiyat'];
  productForm!: FormGroup;
  actionBtn: string = 'save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      features: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      image:['',Validators.required]

    });

    if (this.editData) {
      this.actionBtn = 'update';
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['features'].setValue(this.editData.features);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['image'].setValue(this.editData.img);
    }

  }
  addProduct() {


    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Ürünü Eklediniz!');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('hata');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Değişiklik Kaydedildi!');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Değişiklik Kaydedilmedi,Lütfen tekrar Kontrol ediniz');
      },
    });
  }
  upload(event:Event){
    console.log(event)
 }
}
