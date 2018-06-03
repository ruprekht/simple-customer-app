import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {
    result: any;

    constructor(private _http: Http) { }

    public getCustomers() {
        return this._http.get('api/customers').map(result => this.result = result.json());
    }

    public getCustomer(id: string) {
        return this._http.get(`api/customers/${id}`).map(result => this.result = result.json());
    }

    public updateCustomer(customer: Customer) {
        return this._http.put(`api/customers/${customer._id}`, customer).map(result => this.result = result.json());
    }

    public createCustomer(customer: Customer) {
        return this._http.post('api/customers', customer).map(result => this.result = result.json());
    }

    public deleteCustomer(id: string) {
        return this._http.delete(`api/customers/${id}`).map(result => this.result = result.json());
    }
}
