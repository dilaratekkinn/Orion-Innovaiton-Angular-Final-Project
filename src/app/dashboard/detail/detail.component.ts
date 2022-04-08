import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  product;
  productId: string;
  idSubs: Subscription;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.idSubs = this.route.params.subscribe((id) => {
      this.productId = id['id'];
    });
    this.api.getProduct().subscribe((res) => {
      res.forEach((element) => {
        if (element.id == this.productId) {
          this.product = element;
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
