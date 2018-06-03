import { Customer } from './../models/customer';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private _customers: Customer[];

  constructor(private _customerService: CustomerService, private _router: Router) { }

  ngOnInit() {
    this._customerService.getCustomers().subscribe(res => this._customers = res);
  }

  public onSelect(id) {
    this._router.navigate(['profile', id]);
  }

  public onCreate() {
    this._router.navigate(['profile']);
  }

}
