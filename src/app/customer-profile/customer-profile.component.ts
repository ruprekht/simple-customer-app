import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent {

  private _customerId: string;
  private _customer: Customer;
  private _loaded: boolean = false;
  private _deletable: boolean;
  private _genders: string[] = ['m', 'w'];
  private _defaultGender: string = this._genders[0];

  public customerForm: FormGroup;

  constructor(private _customerService: CustomerService, 
              private _router: Router,
              private _route: ActivatedRoute,
              private _fb: FormBuilder) {
    this._customer = new Customer();
    this._route.params.subscribe(params => this.onRouteParamsChanged(params));
    this.customerForm = this._fb.group({
      'firstName': [this._customer.name.first, Validators.required],
      'lastName': [this._customer.name.last, Validators.required],
      'birthday': [this._customer.birthday, Validators.required],
      'gender': [this._customer.gender, Validators.required]
    });
  }

  public saveCustomer(customer) {
    const now = new Date();
    this._customer.birthday = customer.birthday;
    this._customer.lastContact = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this._customer.name.first = customer.firstName;
    this._customer.name.last = customer.lastName;
    this._customer.gender = customer.gender;

    if (this._customerId) {
      this._customerService.updateCustomer(this._customer)
        .subscribe(res => {
          this.goBack();
        });
    } else {
      this._customerService.getCustomers().subscribe(res => {
        const sorted = res.sort((a, b) => {
          return (a.customerID > b.customerID) ? 1 : ((b.customerID > a.customerID) ? -1 : 0); 
        });
        this._customer.customerID = sorted[sorted.length - 1].customerID + 1;
        this._customerService.createCustomer(this._customer)
          .subscribe(created => {
            this.goBack();
          });
      });
    }
  }

  public onDelete() {
    this._customerService.deleteCustomer(this._customer._id)
    .subscribe(deleted => {
      this.goBack();
    });
  }

  private async onRouteParamsChanged(params) {
    if (params.id) {
      this._deletable = true;
      this._customerId = params.id;
      this._customerService.getCustomer(this._customerId)
        .subscribe(res => {
          this._customer = res;
          this._loaded = true;
          if (!this._customer) {
              this.goBack();
          }
        });
    } else {
      this._loaded = true;
    }
  }

  private goBack() {
    this._router.navigate(['']);
  }
}
