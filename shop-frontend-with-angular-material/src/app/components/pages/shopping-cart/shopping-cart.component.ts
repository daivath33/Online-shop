import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'title',  'price', 'quantity', 'total', 'action'];
  displayedTotalColumns: string[] = ['emptyCart', 'shopMore', 'checkout', 'grandTotal']
  public products: Product[] = [];
  public grandTotal: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(response => {
      this.products = response;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(product: Product){
    this.cartService.removeCartItem(product);
  }

  removeAllItems(){
  this.cartService.removeAllCart();
} 
}
