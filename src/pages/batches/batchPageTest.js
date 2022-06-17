import { useState } from "react";
import BatchSelect from "../../components/batch-select/batchSelect";
import validateBatchSelect from "../../validation/batchSelectPage";

function BatchPageTest() {
    const [batch_no, selectBatchNo] = useState(-1);    
    const [batchID, selectBatchID] = useState('');    
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
    const testData = {
        "id": "af83050f-121c-4851-9ba6-78a1ae70ab48",
        "name": "Test Course",
        "price": 1999.0,
        "is_available": true,
        "batches": [
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 3,
                "start_date": "06/02",
                "end_date": "06/03",
                "time_zone": "PST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "A",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "de5b5ea7-d944-45aa-84ec-6f5e9eaf14cf",
                "seats": 20,
                "start_date": "06/02",
                "end_date": "06/03",
                "time_zone": "EST",
                "start_time": "08PM",
                "end_time": "02AM",
                "name": "A",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 3,
                "start_date": "06/20",
                "end_date": "06/23",
                "time_zone": "PST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "B",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "043f473b-b0ed-4b89-bb1b-799ce15d8188",
                "seats": 5,
                "start_date": "06/20",
                "end_date": "06/23",
                "time_zone": "EST",
                "start_time": "08AM",
                "end_time": "02PM",
                "name": "B",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 3,
                "start_date": "07/11",
                "end_date": "07/30",
                "time_zone": "PST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "C",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 3,
                "start_date": "07/11",
                "end_date": "07/30",
                "time_zone": "EST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "C",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 0,
                "start_date": "08/02",
                "end_date": "08/23",
                "time_zone": "PST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "D",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            },
            {
                "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
                "seats": 21,
                "start_date": "08/02",
                "end_date": "08/23",
                "time_zone": "EST",
                "start_time": "11PM",
                "end_time": "05AM",
                "name": "D",
                "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
            }
        ]
    }    

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
           return (
                <div className="flex-none md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                <h1 className="text-3xl mb-10 text-center">
                    Batch {testData.batches[batch_no].name}
                </h1>
                <ul className="list-disc list-inside text-1xl mx-4 mb-3">
                    <li className="my-3">Program Dates: {testData.batches[batch_no].start_date} - {testData.batches[batch_no].end_date}</li>
                    <li className="my-3">Duration: {testData.batches[batch_no].start_date} - {testData.batches[batch_no].end_date}</li>
                    <li className="mb-6">Time: {testData.batches[batch_no].start_time} - {testData.batches[batch_no].end_time}</li>
                </ul>
                <p className="text-2xl mx-4 mb-3">
                Click "Next" to hold your spot while you create your AI Camp account!
                    </p>
                </div>);
        }
    }
    return (
        <div className='container max-w-7xl mt-10 flex flex-wrap mx-auto mt-3 auth'>
        <SideBarContent/>
        <BatchSelect 
         batchData={testData} 
         onChange={
                      (batch_no, batchID) => { 
                        selectBatchNo(batch_no);
                        selectBatchID(batchID); 
                        console.log(batch_no);
                        console.log(batchID);
                      } 
              	  }
         batchIndex={batch_no}/>
        </div>
    );
}

export default BatchPageTest;
