import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  remove = new Subject();
  add = new Subject();
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.productList.asObservable();
  }
  //--------üRÜNLERİ SEPETE KAYDEDEN FONSKİYON SETPRODUCT()
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    this.http.post('http://localhost:3000/cart', product).subscribe();
  }

  getCart() {
    return this.http.get('http://localhost:3000/cart').pipe(
      map((res) => {
        const neww = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            neww.push(res[key]);
          }
        }
        return neww;
      })
    );
  }

  removeCartItem(product: any) {
    this.http
      .delete('http://localhost:3000/cart/' + product)
      .subscribe((res) => {
        this.remove.next(true);
      });
  }
  order(id:any,orders:any){
    const order ={
      userId:id,
      orders:orders
    }
    return this.http.post<any>('http://localhost:3000/checkOutProducts',order)
  }
  // removeCart(){
  //   this.http.delete('http://localhost:3000/cart')
  //   .subscribe(()=>{
  //     this.remove.next(true);
  //   })
  // }
}
