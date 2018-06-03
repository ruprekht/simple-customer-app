export class Customer {
    _id: string;
    customerID: number;
    name: {
        first: string;
        last: string;
    };
    birthday: Date;
    gender: string;
    lastContact: Date;
    customerLifetimeValue: number;

    constructor() {
        this._id = '';
        this.customerID = null;
        this.name = { first: '', last: ''};
        this.gender = '';
        const now = new Date();
        this.birthday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.lastContact = this.birthday;
        this.customerLifetimeValue = null;
    }
}
