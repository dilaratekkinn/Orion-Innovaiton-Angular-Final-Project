import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './service/cart.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'commerce';
  totalItem: number = 0;
  searchTerm: string = '';
  admin;
  user;
  userCart = [];
  @ViewChild('dropdown', { static: false }) dropdown: ElementRef;
  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.auth.user.subscribe((res) => {
      if (res) {
        this.user = localStorage.getItem('user');
      } else {
        this.user = null;
      }
    });
    this.getLentgh();
    this.cartService.remove.subscribe((res) => {
      this.getLentgh();
    });
    this.cartService.add.subscribe((res) => {
      this.getLentgh();
    });
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  getLentgh() {
    const test = [];
    this.cartService.getCart().subscribe((res) => {
      res.forEach((element) => {
        if (element.user == JSON.parse(localStorage.getItem('user'))?.id) {
          test.push(element);
        }
      });

      this.userCart = test;
      this.totalItem = this.userCart.length;
    });
  }
  onlogOut() {
    this.auth.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  // toggle() {
  //   if (this.dropdown.nativeElement.classList.contains('show')) {
  //     this.dropdown.nativeElement.classList.remove('show');
  //   } else {
  //     this.dropdown.nativeElement.classList.add('show');
  //   }
  // }
  getAllProducts(){

  }
}
