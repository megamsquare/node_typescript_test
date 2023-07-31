import Model from "../models";
import Err from "../dto/error_dto";

function generateNumber(min:number, max: number) {
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
}

async function createVerifyAccount(verifyAccInfo:string) {
    
}