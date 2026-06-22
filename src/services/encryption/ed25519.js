import crypto from 'crypto'
import {genKeys, signBlockLedger, verifyBlockLedger} from '../../utils/data.validator'
const RAND_BYTES = 32
//init consts
const keys = genKeys(crypto.randomBytes(RAND_BYTES))
const privateKey = keys.privateKey
const publicKey = keys.publicKey
//ecrypt
export const edSign = (data) => {
    return signBlockLedger(data, privateKey);
}
//check new data
export const edVerify = (data, signatureHex) => {
    return verifyBlockLedger(data, signatureHex, publicKey);
}
//returns the public key
export const getPublicKey = () => {
        return publicKey;
}