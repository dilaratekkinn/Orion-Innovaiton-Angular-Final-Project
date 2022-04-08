import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  delete: boolean = false;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.remove.subscribe((res) => {
      this.getCarts();
    });

    this.getCarts();
  }
  getCarts() {
    this.cartService.getCart().subscribe((res) => {
      this.products = [];
      res.forEach((element) => {
        if (element.user == JSON.parse(localStorage.getItem('user')).id) {
          this.products.push(element);
        }
      });
    });
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  checkout() {
    this.cartService
      .order(JSON.parse(localStorage.getItem('user')).id, this.products)
      .subscribe((res) => {
        console.log(res);
        this.products.forEach((element) => {
          if (element.user == JSON.parse(localStorage.getItem('user')).id) {
            this.products = [];
            this.cartService.removeCartItem(element.id);
          }
        });

      });

    console.log(this.delete);
    this.delete = true;
    console.log(this.delete);
  }
}
