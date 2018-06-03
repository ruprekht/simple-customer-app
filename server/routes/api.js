const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customer = require('../models/customer');

const db = "mongodb://admin:nimda@ds129540.mlab.com:29540/js-dev-challenge";

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if (err) {
        console.log('Connection error');
    }
});

router.get('/customers', (req, res) => {
    console.log('Requesing customers');
    customer.find({})
        .exec((err, customers) => {
            if (err) {
                console.log('Error getting the customers');
            } else {
                res.json(customers);
            }
        })
});

router.get('/customers/:id', (req, res) => {
    console.log('Requesting customer');
    customer.findById(req.params.id)
        .exec((err, customer) => {
            if (err) {
                console.log('Error getting the customer');
            } else {
                res.json(customer);
            }
        });
});

router.put('/customers/:id', (req, res) => {
    console.log('Update the customer');

    let id = req.params.id;

    customer.update({_id: id}, req.body, { multi: false })
        .exec((err, updated) => {
            if (err) {
                console.log('Error update the customer', err);
            } else {
                res.json(updated);
            }
        });
});

router.post('/customers', (req, res) => {
    delete req.body._id;
    console.log('Create a customer');

    const newCustomer = new customer(req.body);  
        newCustomer.save(err => {  
            if (err) { 
                return res.status(500).send(err);
            }
            return res.status(200).send(newCustomer);
        });
});

router.delete('/customers/:id', (req, res) => {
    customer.findByIdAndRemove(req.params.id, (err, customer) => {  
        if (err) {
            return res.status(500).send(err);
        }

        const response = {
            message: "Todo successfully deleted",
            id: customer._id
        };
        return res.status(200).send(response);
    });
});
module.exports = router;