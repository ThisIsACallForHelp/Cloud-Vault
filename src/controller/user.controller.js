import {DeleteDataService, GetDataService, CreateDataService } from "../services"

export const DeleteDataFromServer = async (req,res) => {
    try{
        const {NodeID: NodeID} = req.params;
        const response = await DeleteDataService(NodeID);
        const {status, ...ExtratcedData} = response;
        return res.status(response.status || 200).json(ExtratcedData);
    }
    catch(err){
        console.log("couldnt not delete the data from the server, " + err.message);
    }
}

export const GetServerData = async (req, res) => {
    try{
        const {NodeID: NodeID} = req.params;
        const response = await GetDataService(NodeID);
        const {status, ...Extracted} = response;
        return res.status(response.status || 200).json(Extracted)
    }
    catch{
        console
    }
}

export const CreateNewData = async (req,res) => {
    return;
}