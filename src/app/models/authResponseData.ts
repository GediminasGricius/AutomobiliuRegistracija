export class AuthResponseData{
    constructor (
        private kind:String,
        private idToken:String,
        private email:String,
        private refreshToken:String,
        private expiresIn:String,
        private localId:String
    ){

    }
}