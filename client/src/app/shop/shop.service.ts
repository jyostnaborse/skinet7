import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopparams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl ="https://localhost:5001/api/";

  constructor(private http: HttpClient) { 
  }
  getProducts(ShopParams: ShopParams) {
    let params  = new HttpParams();
    if(ShopParams.brandId > 0) params = params.append('brandId', ShopParams.brandId);
    
    if(ShopParams.typeId) params = params.append('typeId', ShopParams.typeId);
    params = params.append('sort', ShopParams.sort);
    params = params.append('PageIndex', ShopParams.pageNumber);
    params = params.append('PageSize', ShopParams.pageSize);
    if(ShopParams.search) params =params.append('search', ShopParams.search);
    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products", {params})
  }
  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands")
    
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + "products/types")
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl + "products/" + id)
  }
}
