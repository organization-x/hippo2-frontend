import { useEffect } from "react";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";

import { useEffect, useState } from "react";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import sendReq from "../../services/sendReq";
import BatchSelect from "../../components/batch-select/batchSelect";

function BatchPage() {
    const [batch_no, selectBatchNo] = useState(-1);    
    const [batchID, selectBatchID] = useState('');    
    const [searchParams, setSearchParams] = useSearchParams();

    function SideBarContent() {
        if (batch_no == -1) {
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
           return (
                <div className="flex-none md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                <h1 className="text-3xl mb-10 text-center">
                Batch {testData[batch_no].name}
                </h1>
                <ul className="list-disc list-inside text-1xl mx-4 mb-3">
                    <li className="my-3">Program Dates: {testData[batch_no].start_date} - {testData[batch_no].end_date}</li>
                    <li className="my-3">Duration: {testData[batch_no].start_date} - {testData[batch_no].end_date}</li>
                    <li className="mb-6">Time: {testData[batch_no].start_time} - {testData[batch_no].end_time}</li>
                </ul>
                <p className="text-2xl mx-4 mb-3">
                Click "Next" to hold your spot while you create your AI Camp account!
                    </p>
                </div>);
        }
    }
    
    useEffect(async () => {
        const url = baseUrl + `/api/v1/courses/${searchParams.get('courseID')}/batches/`;
	const options = {
	    method: 'GET',
	};
	await sendReq(url, options);
    }) ;
    
    return (
        <div className='container max-w-7xl flex flex-wrap mx-auto mt-3 auth'>
        <SideBarContent/>
        <BatchSelect 
         batchData={testData} 
         onChange={
                      (batch_no, batchID) => { 
                          selectBatchID(batchID); 
                          selectBatchNo(batch_no);
                          console.log(batchID);
                          console.log(batch_no);
                      } 
              	  }
         value={batch_no}/>
        </div>
    );
}

export default BatchPage;
