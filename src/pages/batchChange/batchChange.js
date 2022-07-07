import { useEffect, useState } from "react";
import baseUrl from "../../apiUrls";
import { useParams } from "react-router-dom";
import sendReq from "../../services/sendReq";
import BatchSelect from "../../components/batch-select/batchSelect";
import Button from "../../components/button/button";
import validateUuid from "../../validation/uuid";
import { useNavigate } from 'react-router-dom';

function BatchChange() {
    const [batchNo, selectBatchNo] = useState(-1);    
    const [batchID, selectBatchID] = useState('');    
    const [batchData, setBatchData] = useState([]);  
    
    const [currentBatch, setCurrentBatch] = useState({});
    	
	const { orderID } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState('');

    useEffect(() => {
        if(orderID){
            const url = baseUrl + `/api/v1/orders/${orderID}/change-batch/`;
            const options = {
                method: 'GET',
            };
            sendReq(url, options).then(res => {
                setBatchData(res.data);
                setIsLoading(false);
                const currentBatch = res.data.batches.find(batch => batch.id === res.data.batch_id);
                setCurrentBatch(currentBatch);
            });
        }
    }, [orderID]);

    function SideBarContent() {
        if (batchNo === -1) {
            return (
                <div className="flex-none md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                    <h1 className="text-3xl mb-10 text-center">
                        Batch Change
                    </h1>
                    <p className="text-lg mx-9 mb-3">
                        <b>Current Batch:</b><br></br>Batch {batchData.name} ({currentBatch.time_zone}): {currentBatch.start_date} - {currentBatch.end_date} in {batchData.name} 
                    </p>
                    <h1 className="text-3xl mb-5 mt-9 text-center">
                        New Batch Details
                    </h1>
                    <p className="text-lg mx-9 mb-3">
                        Select another batch in the calendar to find a batch that best fits your schedule. Batch details will be updated here depending on which batch you choose.
                    </p>
                </div>);
        }
        else {
	    let batch = batchData.batches[batchNo];
        const duration = batches[batchNo].duration;
            return (
                <div className="md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                    <h1 className="text-3xl mb-10 text-center">
                        Batch Change
                    </h1>
                    <p className="text-lg mx-9 mb-3">
                        <b>Current Batch:</b><br></br>Batch {batchData.name} ({currentBatch.time_zone}): {currentBatch.start_date} - {currentBatch.end_date} in {batchData.name} 
                    </p>
                    <h1 className="text-3xl mb-5 mt-9 text-center">
                        New Batch Details
                    </h1>
                    <p className="text-lg ml-8">
                        Batch {batchData.batches[batchNo].name} ({batchData.batches[batchNo].time_zone}):
                    </p>
                    <ul className="list-disc list-inside text-1xl mx-9 mb-3">
                        <li className="my-3">Program Dates: {batch.start_date} - {batch.end_date}</li>
                        <li className="my-3">Duration: {duration}</li>
                        <li className="mb-6">Time: {batch.start_time} - {batch.end_time} {batch.time_zone} every weekday</li>
                    </ul>
                    <p className="text-xl mx-9 mb-3">
                        Click "Submit" to finalize your batch change!
                    </p>
                </div>);
        }
    }

    function NextAndBackButtons() {
        const onNext = () => {
            setFormErrors('');
            const [ err ] = validateUuid(batchID);
            if(err){
                return setFormErrors(err); 
            }else{
                const url = baseUrl + `/api/v1/orders/${orderID}/change-batch/`;
                const options = {
                    method: 'POST',
                    body: {
                        batch_id: batchID
                    },
                };
                sendReq(url, options).then(res => {
                    const path = `/`;
                    navigate(path); 
                })
            }
        };
    
        const onBack = () => {
            const back_path =`/`;
            navigate(back_path);   
        };
        return (
            <div>
                {   
                    formErrors ? 
                        <div className='text-right text-red-600 mt-5'>{formErrors}</div> 
                    : 
                        <div className='text-right text-red-600 mt-5'>&nbsp;</div>
                }
                <div className="flex flex-wrap justify-between my-5">
                    <Button 
                        onClick={() => onBack()} 
                        bgColor="gray" 
                        txtColor="white" 
                        className="w-full lg:w-1/4 h-12 mb-6 lg:my-3"
                    >
                        <p className="text-2xl">Back</p>
                    </Button>
                    <Button
                        onClick={() => onNext()}
                        bgColor="green" txtColor="white" 
                        className="w-full lg:w-1/2 h-12 lg:my-3"
                    >
                        <p className="text-2xl">Submit</p>
                                    
                    </Button>
                </div>
            </div>
        );
    }
    
    return (
        <div className='container max-w-7xl mt-10 flex flex-wrap mx-auto auth'>
            <SideBarContent/>
            <div className="flex flex-col md:flex-initial justify-center w-full md:w-7/12 px-10 rounded-b-2xl md:rounded-r-2xl bg-white">
                <BatchSelect 
                    batchData={batchData} 
                    onChange={
                        (batchNo, batchID) => { 
                            selectBatchNo(batchNo);
                            selectBatchID(batchID); 
                        } 
                    }
                    batch_id = {batchID}
                    batchIndex={batchNo}
                    isLoading = {isLoading}/>
                <NextAndBackButtons/>
            </div>
        </div>
    );
}

export default BatchChange;
