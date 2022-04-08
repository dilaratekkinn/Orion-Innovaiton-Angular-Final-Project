import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public productList: any;
  filterCategory: any;
  searchKey: string = '';
  currentPg: any;
  category: string;
  newFilterCategory: any;

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {

      this.productList = res;
      this.newFilterCategory=res;
      this.filterCategory = res;

      this.productList.forEach((a: any) => {
        if (a.category === 'Kolye') {
          a.category = 'Kolye';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });

    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });

    this.route.queryParams.subscribe((param) => {
      this.category = param['category'];
      let newArray = [];
      if (this.category != undefined) {
        this.filterCategory?.forEach((product) => {
          if (product.category == this.category) {
            newArray.push(product);
          }
        });
        this.newFilterCategory = newArray;
      } else {
        this.newFilterCategory = this.filterCategory;
      }
    });
  }
  addtocart(item: any) {
    
    const cart = {
      id: item.id,
      title: item.title,
      price: item.price,
      code: item.code,
      features: item.features,
      description: item.description,
      category: item.category,
      image: item.image,
      quantity: item.quantity,
      total: item.total,
      user: JSON.parse(localStorage.getItem('user')).id,
    };
    this.cartService.addtoCart(cart);
    this.cartService.add.next(true);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
