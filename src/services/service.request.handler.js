import {MongoConnection} from "../DAL/dal.js"
import { GenerateMasterKey } from "./encryption/argon2id.js";
import {aesGcmEnc} from "./encryption/aes.256.gcm.js"
import { EdSig } from "./encryption/ed25519.js";
import { SHA512 } from "./encryption/sha512.js";
import { randomBytes } from "crypto"
import { randomUUID } from "crypto";

export const Service = {
    DeleteDataService: async (NodeID) => {
        const NodeDB = await MongoConnection("Nodes");
        return await NodeDB.deleteNodeFromDB(NodeID);
    },
    GetDataService: async (NodeID) => {
        const NodeDB = await MongoConnection("Nodes");
        return await NodeDB.getNodeByID(NodeID);
    },
    CreateDataService: async (data, ipAddress) => {
        const userID = data.userID || "";
        const NodeID = randomUUID();
        
        const NodeDB = await MongoConnection("Nodes");
        const prevHash = await NodeDB.getLastNodeHash() || "0".repeat(128);
        
        const hashSecret = {
            action: "CREATE",
            userID: userID,
            resourceID: NodeID,
            status: "SUCCESS",
            ipAddress: ipAddress || "127.0.0.1" 
        };
        const HashedData = await SHA512(hashSecret, prevHash);
        
        const [salt, password] = [process.env.MASTER_SALT, process.env.MASTER_PASSWORD];
        const saltBuffer = Buffer.from(salt, "hex");
        const masterKey = await GenerateMasterKey(password, saltBuffer);
        
        const ephemeralKey = randomBytes(32);
        const {cipheredText, iv, authTag}  = aesGcmEnc(data, ephemeralKey);
        const encryptedKey = aesGcmEnc(ephemeralKey, masterKey);
        
        const signature = EdSig.edSign(HashedData);
        
        const dbPayload = {
            nodeId: NodeID,
            userId: userID,
            encData: cipheredText,
            dataIv: iv,
            dataAuthTag: authTag,
            encDek: encryptedKey.cipheredText,
            dekIv: encryptedKey.iv,
            dekAuthTag: encryptedKey.authTag,
            hash: HashedData,
            signature: signature,
            creationTime: new Date().toISOString()
        };

        await NodeDB.createNewSecretNode(dbPayload);
        
        return {
            status: 201,
            nodeId: NodeID,
            hash: HashedData,
            signature: signature
        };
    },
    UpdateDataService: async (NodeID, data, ipAddress) => {
        const userID = data.userID || ""; 
        const NodeDB = await MongoConnection("Nodes");
        
        // Ensure the node exists before updating
        const existingNode = await NodeDB.getNodeByID(NodeID);
        if (!existingNode) {
            throw new Error("Node not found");
        }

        const prevHash = await NodeDB.getLastNodeHash() || "0".repeat(128);
        
        const hashSecret = {
            action: "UPDATE",
            userID: userID,
            resourceID: NodeID,
            status: "SUCCESS",
            ipAddress: ipAddress || "127.0.0.1"
        };
        const HashedData = await SHA512(hashSecret, prevHash);
        
        const [salt, password] = [process.env.MASTER_SALT, process.env.MASTER_PASSWORD];
        const saltBuffer = Buffer.from(salt, "hex");
        const masterKey = await GenerateMasterKey(password, saltBuffer);
        
        const ephemeralKey = randomBytes(32);
        const {cipheredText, iv, authTag}  = aesGcmEnc(data, ephemeralKey);
        const encryptedKey = aesGcmEnc(ephemeralKey, masterKey);
        
        const signature = EdSig.edSign(HashedData);
        
        const dbPayload = {
            nodeId: NodeID,
            userId: userID,
            encData: cipheredText,
            dataIv: iv,
            dataAuthTag: authTag,
            encDek: encryptedKey.cipheredText,
            dekIv: encryptedKey.iv,
            dekAuthTag: encryptedKey.authTag,
            hash: HashedData,
            signature: signature,
            creationTime: existingNode.createdAt || new Date().toISOString()
        };

        await NodeDB.updateNodeInDB(NodeID, dbPayload);
        
        return {
            status: 200,
            nodeId: NodeID,
            hash: HashedData,
            signature: signature,
            message: "Node successfully updated"
        };
    }
}