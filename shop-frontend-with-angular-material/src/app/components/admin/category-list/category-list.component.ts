import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'title', 'edit'];
  categories: MatTableDataSource<Category>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories = new MatTableDataSource(response);
        this.categories.paginator = this.paginator;
        this.categories.sort = this.sort;
      }, error:(err)=>{
        alert("Sorry, something went wrong while fetching Categories.")
      }
    });
  }

  addCategory(){
    this.dialog.open(AddEditCategoryComponent, {}).afterClosed().subscribe(value => {
      if (value === 'save'){
        this.getAllCategories();
      }
    });    
  }
  
  updateCategory(row: Category){
    this.dialog.open(AddEditCategoryComponent, {
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllCategories();
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }
}
