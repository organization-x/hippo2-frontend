import { useEffect, useState } from "react";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import sendReq from "../../services/sendReq";
import BatchSelect from "../../components/batch-select/batchSelect";
import validateBatchSelect from "../../validation/batchSelectPage";

function BatchPageTest() {
    const [batch_no, selectBatchNo] = useState(-1);    
    const [batchID, selectBatchID] = useState('');    
    const [searchParams, setSearchParams] = useSearchParams();
    const [errors, setErrors] = useState({});

    const selectBatch = () => {
	setErrors({});
	const [err, data] = validateBatchSelect({
	    batchID: batchID
	});
	if (err) {
	    return setErrors(err);
	}
    };

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

    const testData = [
        {
            "id": "62a7bfd2eaaf121caad3968d",
            "course": "Carolina",
            "price": 1983.2,
            "seats": 20,
            "start_date": "8/24",
            "end_date": "8/25",
            "time_zone": "PST",
            "start_time": "2:00 PM",
            "end_time": "3:00 PM",
            "name": "a",
        },
        {
            "id": "62a7bfd2c06e03b6a5eee2b5",
            "course": "Aida",
            "price": 2404.7,
            "seats": 0,
            "start_date": "7/21",
            "end_date": "8/22",
            "time_zone": "PST",
            "start_time": "2:00 AM",
            "end_time": "9:00 AM",
            "name": "b",
        },
        {
            "id": "62a7bfd291832ebf9178b6d6",
            "course": "Mcdonald",
            "price": 3980.2,
            "seats": 5,
            "start_date": "6/22",
            "end_date": "9/22",
            "time_zone": "PST",
            "start_time": "2:00 AM",
            "end_time": "9:00 AM",
            "name": "c",
        },
        {
            "id": "62a7bfd2338845a563edcacd",
            "course": "Eloise",
            "price": 2853.6,
            "seats": 32,
            "start_date": "6/22",
            "end_date": "8/22",
            "time_zone": "EST",
            "start_time": "3:00 PM",
            "end_time": "6:00 PM",
            "name": "d",
        }
    ]
    return (
        <div className='container max-w-7xl flex flex-wrap mx-auto mt-3 auth'>
            <SideBarContent/>
            <BatchSelect 
             batchData={testData} 
             onChange={
                          (batch_no, batchID) => { 
                              selectBatchID(batchID); 
                              selectBatchNo(batch_no);
                          } 
              	      }
             batchIndex={batch_no}/>
        </div>
    );
}

export default BatchPageTest;
