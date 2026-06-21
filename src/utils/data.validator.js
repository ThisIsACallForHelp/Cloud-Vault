import fs from "fs"
import crypto from "crypto"
export const ValidateInput = (req,res, next) => {
    return (!req.body && req.method !== "GET" && req.method !== "DELETE") ?
    res.status(400).send("Unable To Continue, The Required Parameters Has Not Been Sent By The User"):
    next();
}

export const InitEnvEncryption = (req, res, next) => {
    if(!process.env.MASTER_SALT || !process.env.MASTER_PASSWORD){
        const password = crypto.randomBytes(32).toString("base64");
        const salt = crypto.randomBytes(16).toString("hex");
        const envVals = `MASTER_SALT = "${salt}"\nMASTER_PASSWORD = "${password}"\n`;
        fs.writeFileSync(".env", envVals, { flag: "a" });
    }
    next();
}