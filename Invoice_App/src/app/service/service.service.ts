import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private http: HttpClient,
  ) {}

  getCustomer() {
    return this.http.get('url');
  }
  getCustomerbyCode(code: any) {
    return this.http.get('url');
  }

  getProduct() {
    return this.http.get('url');
  }

  getProductbyCode(code: any) {
    return this.http.get('url');
  }
}
