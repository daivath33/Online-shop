import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'image', 'title', 'category',  'quantity', 'price', 'total', 'description', 'edit', 'delete'];
  products: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productServie: ProductService, 
              public dialog: MatDialog, 
              private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productServie.getAllProducts().subscribe({
      next: (response)=>{
        this.products = new MatTableDataSource(response);
        this.products.paginator = this.paginator;
        this.products.sort = this.sort;
      }, error:(err)=>{
        alert("Sorry, something went wrong while fetching Products data.");
      }
    })
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(AddEditProductComponent, dialogConfig).afterClosed().subscribe(value => {
            if(value === 'save'){
              this.getAllProducts();
            }
          });
  }

  updateProduct(row: Product){
    this.dialog.open(AddEditProductComponent, {
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllProducts();
      }
    });
  }
  
  deleteProduct(id: number){
    this.productServie.decleteProductById(id).subscribe(response=>{
      alert("Product deleted successfully!");
      this.getAllProducts();
    })
  }
  
  productDetails(id: number){
    this.router.navigate(['product-details', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

}
