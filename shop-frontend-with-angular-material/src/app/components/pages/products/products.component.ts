import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  categories$;
  category: string;

  constructor(private productService: ProductService, 
              private categorySErvice: CategoryService,
              private router: Router) {
    this.products$ = this.productService.getAllProducts();
    this.categories$ = this.categorySErvice.getAllCategories();
    this.filteredProducts$ = this.products$;
    }

  ngOnInit(): void {
  }

  getAllProducts(){
    this.filteredProducts$ = this.productService.getAllProducts();
  }

  filterByCategory(categoryTitle: string){
    if(categoryTitle !== ''){
      this.filteredProducts$ = this.products$.pipe(map(products=> 
        products.filter(product => product.category.title === categoryTitle)));
    } else {
      this.filteredProducts$ = this.products$;
    }
  }

   productDetails(id: number){
    this.router.navigate(['product/details', id]);
  }

  filter(query: string){
    console.log(query);
    if (query !=='') {
    this.filteredProducts$ =  this.products$.pipe(map(p =>
      p.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))));
    } else {
      this.filteredProducts$ = this.products$;
    }
  }
   
}
