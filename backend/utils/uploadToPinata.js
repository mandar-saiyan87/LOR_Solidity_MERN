import { PinataSDK } from 'pinata'

export const pinataConf = new PinataSDK({
    pinataJWT: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY
})

async function uploadToPinata(pdfdoc) {
    try {
      
    }
    catch { }
}