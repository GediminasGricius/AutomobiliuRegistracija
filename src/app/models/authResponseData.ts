import { Data } from "@angular/router";

export class AuthResponseData{
    constructor (
        public kind:String,
        public idToken:String,
        public email:String,
        public refreshToken:String,
        public expiresIn:String,
        public localId:String,
        public expires?:number
    ){

    }
}