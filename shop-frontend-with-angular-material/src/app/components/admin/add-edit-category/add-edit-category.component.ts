import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  categoryForm:FormGroup;
  category: Category = new Category();
  actionName: string = "Add";
  actionButton: string = "Save";

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddEditCategoryComponent>,
              @Inject( MAT_DIALOG_DATA) public updateCategoryData: Category) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: new FormControl('', Validators.required)
    });

    if(this.updateCategoryData){
      this.actionName = "Update"
      this.actionButton = "Update";
      this.categoryForm.controls['title'].setValue(this.updateCategoryData.title);
    }   
  }

  onSubmit(){
    if(!this.updateCategoryData) {
      if(this.categoryForm.invalid){
      return;
    } 
    const category: Category = {...this.categoryForm.value}
    this.categoryService.createCategory(category).subscribe({
      next:(response) => {
        alert("Category added successfully!");
        this.categoryForm.reset();
      }, error:()=>{
        alert("Sorry, something went wrong, please try again.")
      }
    });
    this.dialogRef.close('save');
    } else {
    this.updateCategory();
    } 
  }

  updateCategory(){
    const id = this.updateCategoryData.id;
    const category: Category = {...this.categoryForm.value};
    this.categoryService.editCategory(id, category).subscribe({
      next:(response) => {
        alert("Category updated successfully!");
        this.dialogRef.close('update');
      }, error: () => alert("Sorry, something went wrong, please try again.")
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  } 

}
