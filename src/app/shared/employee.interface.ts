/*
 ============================================
; Title:  employee.interface.ts
; Author: Professor Krasso
; Date: 30 March 2021
; Modified By: Marie Nicole Barleta
; Description: Declared variables to connect to MongoDB database
; The employees connection
;===========================================
 */

import { Item } from "./item.interface";

export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[];
}