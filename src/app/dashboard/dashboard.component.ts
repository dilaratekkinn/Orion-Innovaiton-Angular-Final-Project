import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, DoCheck {
  public totalItem: number = 0;
  user;
  currentHref: any;
  constructor(private router: Router, private cartService: CartService,private auth:AuthService) {}

  ngDoCheck(): void {
    this.currentHref = this.router.url;
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.auth.user.subscribe((res) => {
      if (res) {
        this.user = localStorage.getItem('user');
      } else {
        this.user = null;
      }
    });



    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
}
