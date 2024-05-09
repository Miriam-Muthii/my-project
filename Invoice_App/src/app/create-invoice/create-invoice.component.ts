import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css',
})
export class CreateInvoiceComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}
  pagetitle = 'Create Invoice';
  invoicedetail!: FormArray<any>;
  invoiceproduct!: FormGroup<any>;

  customer: any;
  product: any;

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
  }
  invoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    customerId: this.builder.control('', Validators.required),
    customerName: this.builder.control(''),
    deliveryAddress: this.builder.control(''),
    remarks: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([]),
  });

  saveInvoice() {
    console.log(this.invoiceForm.value);
  }
  addNewProduct() {
    this.invoicedetail = this.invoiceForm.get('details') as FormArray;
    this.invoicedetail.push(this.Generaterow());
  }

  get InvProducts() {
    return this.invoiceForm.get('details') as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true }),
    });
  }

  getCustomers() {
    this.service.getCustomer().subscribe((res) => {
      this.customer = res;
    });
  }

  getProducts() {
    this.service.getProduct().subscribe((res) => {
      this.product = res;
    });
  }

  customerChange() {
    let customerCode = this.invoiceForm.get('customerId');

    this.service.getCustomerbyCode(customerCode).subscribe((res) => {
      let custdata: any;
      custdata = res;
      if (custdata != null) {
        this.invoiceForm
          .get('deliveryAddress')
          ?.setValue(
            custdata.address + ',' + custdata.phoneNo + ',' + custdata.email
          );
        this.invoiceForm.get('customerName')?.setValue(custdata.name);
      }
    });
  }
  productChange(index: any) {
    this.invoicedetail = this.invoiceForm.get('details') as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let productCode = this.invoiceForm.get('productCode');

    this.service.getProductbyCode(productCode).subscribe((res) => {
      let proddata: any;
      proddata = res;
      if (proddata != null) {
        this.invoiceproduct.get('productName')?.setValue(proddata.name);
        this.invoiceproduct.get('salesPrice')?.setValue(proddata.price);
      }
    });
  }
}
