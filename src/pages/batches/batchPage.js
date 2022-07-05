import { useEffect, useState } from "react";
import baseUrl from "../../apiUrls";
import { useParams } from "react-router-dom";
import sendReq from "../../services/sendReq";
import BatchSelect from "../../components/batch-select/batchSelect";
import Button from "../../components/button/button";
import validateUuid from "../../validation/uuid";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/authentication";

function BatchPage() {
    const [batch_no, selectBatchNo] = useState(-1);    
    const [batchID, selectBatchID] = useState('');    
    const [batchData, setBatchData] = useState([]);    
    	
	const { courseID } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState('');

    const {user} = useAuth();

    useEffect(() => {
        if(courseID){
            const url = baseUrl + `/api/v1/courses/${courseID}/batches/`;
            const options = {
                method: 'GET',
            };
            sendReq(url, options).then(res => {
                setBatchData(res.data);
                setIsLoading(false);
            });
        }
    }, [courseID]);

    function SideBarContent() {
        if (batch_no === -1) {
            return (
                <div className="flex-none md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                    <h1 className="text-3xl mb-10 text-center">
                        Batch Details
                    </h1>
                    <p className="text-lg mx-4 mb-3">
                        Select the batch that you want to register your student for. Details about your selected batch will appear here!
                    </p>
                    <p className="text-lg mx-4 mb-3">
                        Some batch choices will be limited due to our capacity. 
                    </p>
                </div>);
        }
        else {
	    let duration = Math.round((new Date(batchData.batches[batch_no].end_date).getTime() - new Date(batchData.batches[batch_no].start_date).getTime()) / (1000 * 60 * 60 * 24));
	    let batch = batchData.batches[batch_no];
	    duration = duration > 7 ? `${Math.round(duration / 7)} weeks` : `${duration} day(s)`;
            return (
                <div className="md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                    <h1 className="text-3xl mb-10 text-center">
                        Batch {batchData.batches[batch_no].name}
                    </h1>
                    <ul className="list-disc list-inside text-1xl mx-4 mb-3">
                        <li className="my-3">Program Dates: {batch.start_date} - {batch.end_date}</li>
                        <li className="my-3">Duration: {duration}</li>
                        <li className="mb-6">Time: {batch.start_time} - {batch.end_time} {batch.time_zone}</li>
                    </ul>
                    <p className="text-2xl mx-4 mb-3">
                        Click "Next" to hold your spot while you create your AI Camp account!
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
            } else if (user.type==="PARENT") {
                const path = `/batches/${batchID}/student-selection`;
                navigate(path); 
            } else {
                const path = `/batches/${batchID}/payment`;
                navigate(path); 
            }
        };
    
        const onBack = () => {
            const back_path =`/courses`;
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
                        <p className="text-2xl">Next</p>
                                    
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
                        (batch_no, batchID) => { 
                            selectBatchNo(batch_no);
                            selectBatchID(batchID); 
                        } 
                    }
                    batch_id = {batchID}
                    batchIndex={batch_no}
                    isLoading = {isLoading}/>
                <NextAndBackButtons/>
            </div>
        </div>
    );
}

export default BatchPage;
