/*
 ============================================
; Title:  item.interface.ts
; Author: Professor Krasso
; Date: 30 March 2021
; Modified By: Marie Nicole Barleta
; Description: Declared variables to connect to MongoDB database
; The items connection, specifically the tasks
;===========================================
 */

export interface Item {
    _id: string;
    text: string;
}