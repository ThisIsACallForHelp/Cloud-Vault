import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
const monClient = new MongoClient(url);
const databaseName = "Secret-Vault";
const db = monClient.db(databaseName);
const collection = db.collection("Nodes");

export const NodesDB = {
    logNodeIntoDB: async (NodeID) => {
        
    },
    deleteNodeFromDB: async (NodeID) => {
        try{
            const result = await collection.deleteOne({NodeID: NodeID});
            return result;
        }
        catch(err){
            console.log("couldnt delete node, caught an exception -> ", err.message);
            throw error;
        }
    },
    updateNodeInDB: async (NodeID) => {

    },
    GetNodeByNodeID: async (NodeID) => {
        try{
            const result = await collection.find(NodeID);
            return result;
        }
        catch(err){
            console.log("couldnt get the node by the id, caught an exception -> ", err.message);
            throw error;
        }
    }
}