import { CategoryService } from 'src/app/services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  productForm: FormGroup;
  categories: Category[];
  category: Category;
  product: Product = new Product(); 
  actionName: string = "Add";
  actionButton: string = "Save"

  constructor(private productService: ProductService, 
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<AddEditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public updateProductData: Product) { }

  ngOnInit(): void {
    this.getAllCategories();

    this.productForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required)
    });  
    
    if(this.updateProductData){
      this.actionName = "Update";
      this.actionButton = "Update";
      this.productForm.controls['title'].setValue(this.updateProductData.title);
      this.productForm.controls['price'].setValue(this.updateProductData.price);
      this.productForm.controls['quantity'].setValue(this.updateProductData.quantity);
      this.productForm.controls['description'].setValue(this.updateProductData.description);
      this.productForm.controls['category'].setValue(this.updateProductData.category);
      this.productForm.controls['image'].setValue(this.updateProductData.image);
    }  
  }

  onSubmit(){
    console.log(this.productForm.value);
    if(!this.updateProductData) {
      if (this.productForm.invalid){
        return;
      }
      const product:Product = { ...this.productForm.value }
          this.productService.createProduct(product).subscribe({
          next:(res)=>{
            alert("Product added successfully!");
            this.productForm.reset();
          }, error: ()=>(
            alert("Sorry, something went wrong, please try again.")
          )
        });
        // this.employeeForm.reset();
        this.dialogRef.close('save');  
    } else {
      this.editProduct();
    }       
  }

  editProduct(){
    const id = this.updateProductData.id
    this.productService.editProduct(id, this.productForm.value).subscribe({
      next:(res)=>{
        alert("Product updated successfully!");
        // this.employeeForm.reset();
        this.dialogRef.close('update');
      }, error: ()=>(alert("Sorry, something went wrong, please try again."))
    });
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((data => {
      this.categories = data;
    }));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

}
