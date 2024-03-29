import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService : BreadcrumbService) {

  }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // to get id from URL link in order to pass to to getProduct methid

    
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: product => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        error: error => console.log(error)
      });
    }
  }
}
