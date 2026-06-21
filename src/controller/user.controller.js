import {DeleteDataService, GetDataService, CreateDataService } from "../services/service.request.handler"
import { GenerateMasterKey } from "../services/encryption/argon2id.js"
export const DeleteDataFromServer = async (req,res) => {
    try{
        const {NodeID: NodeID} = req.params;
        const response = await DeleteDataService(NodeID);
        const {status, ...ExtratcedData} = response;
        return res.status(response.status || 200).json(ExtratcedData);
    }
    catch(err){
        console.log("couldnt not delete the data from the server, " + err.message);
        return res.status(500).json();
    }
}

export const GetServerData = async (req, res) => {
    try{
        const {NodeID: NodeID} = req.params;
        const response = await GetDataService(NodeID);
        const {status, ...Extracted} = response;
        return res.status(response.status || 200).json(Extracted)
    }
    catch(err){
        console.log("failed to get the data from the server ", err.message);
        return res.status(500).json();
    }
}

export const CreateNewData = async (req,res) => {
    try{
        const [salt, password] = [process.env.MASTER_SALT, process.env.MASTER_PASSWORD];
        const masterKey = GenerateMasterKey(password, salt);
    }
    catch(err){
        console.log("failed to create a new node in the server ", err.message);
        return res.status(500).json(); 
    }
}