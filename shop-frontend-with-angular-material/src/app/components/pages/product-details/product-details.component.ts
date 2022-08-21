import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  product: Product;
  panelOpenState = false;
    
  constructor(private produtService: ProductService, 
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.product = new Product();
    this.produtService.getProductById(this.id).subscribe((response => {
      this.product = response;
      Object.assign(this.product,{cartQuantity:1, total:this.product.price})
    }));
  }
  
  addProductToCart(product: any){
    console.log(product)
    this.cartService.addToCart(product);
    this.router.navigate(['shopping/cart']);
  }

}
