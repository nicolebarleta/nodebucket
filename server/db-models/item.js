/**
; Title:  item.js
; Author: Professor Krasso
; Date: 22 March 2021
; Modified By: Marie Nicole Barleta
; Description: Items schema 
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let itemSchema = new Schema({
    text: { type: String }
});

module.exports = itemSchema;