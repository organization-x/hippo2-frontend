import './batchSelect.css';
import Button from '../button/button';
import Loading from "../../pages/loading/loading";
import validateBatchSelect from "../../validation/batchSelect";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BatchSelect({batchData, onChange, batch_id, batchIndex, isLoading}) {
    // returns a Button Component indicating the availabilty of a batch
    function AvailabilityButton({batch_no, batchID, seats}) {
	const buttonClassName = "my-4 w-1/4 text-center lg:w-11/12 p-2 lg:p-1 inline-block";
        if (seats > 20) {
            return (
                <Button onClick={() => onChange(batch_no, batchID)} bgColor="green" txtColor="white" className={buttonClassName}>
                    OPEN
                </Button>);
        } else if (seats > 0) {
            return (
                <Button onClick={() => onChange(batch_no, batchID)} bgColor="yellow" txtColor="white" className={buttonClassName}>
                    {seats} LEFT
                </Button>);
        } else {
                return (
                    <Button onClick={() => onChange(batch_no, batchID)} bgColor="red" txtColor="white" className={buttonClassName}>
                        SOLD OUT
                    </Button>);
        }
    }
    // returns the table's header with the date range and batch name
    function ColumnHeader({start_date, end_date, name}) {
    	return (
            <div className='selectHeader'>
                <p className='text-xl my-4 ml-8 lg:ml-0 text-black md:inline-block lg:block'>{start_date} - {end_date}</p>
		<svg className="inline-block lg:hidden mr-8 lg:mr-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        	    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      		</svg>
                <p className='text-xs hidden lg:block text-gray-800 mb-4'>
                    {`Batch ${name}`}
                </p>
            </div>);
    }
    // returns table data formatted with times, seats, and price
    function CellData({batch_no, start_time, end_time, seats, time_zone, batchID, name, className}) {
        return (
            <div key={batch_no} onClick={() => onChange(batch_no, batchID)} className={`border-t-2 px-4 lg:px-0 md:border-gray-300 lg:border-black ${className} ${batch_no === batchIndex ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                <p className="text-xs text-gray-800 mt-4 hidden lg:block lg:p-0">{start_time} - {end_time} <b>{time_zone}</b></p>
		<div className="selectBody">
                    <p className='text-xs inline lg:hidden text-gray-800'>
                        Batch {name} <b>({time_zone})</b><br/>
			from <br className='hidden lg:block'/><b className='text-md text-gray-500'>${batchData.price}</b><br className='hidden lg:block'/> (Early Bird)
                    </p>
                    <AvailabilityButton batch_no={batch_no} batchID={batchID} seats={seats}/>
		</div>

                <p className='hidden lg:block text-xs text-gray-800 pb-12'>from <br className='hidden lg:block'/><b className='text-md text-gray-500'>${batchData.price}</b><br className='hidden lg:block'/> (Early Bird)</p>
            </div>);
    }

    function Column({column_no, className, lastChildCSS}) {
	const batchNoPST = 2*column_no;
	const batchNoEST = batchNoPST+1;

	let batchPST = batchData.batches[batchNoPST];
	let batchEST = batchData.batches[batchNoEST];

	return isLoading ? (
        <Loading/>
        ) : (
	    <div key={column_no} className={`grow border-black selectColumn dropdown`}>
		<ColumnHeader start_date={batchPST.start_date} end_date={batchPST.end_date} name={batchPST.name}/>
		<CellData 
		    batch_no={batchNoPST} 
		    start_time={batchPST.start_time} 
		    end_time={batchPST.end_time} 
		    seats={batchPST.seats} 
		    time_zone={batchPST.time_zone} 
		    batchID={batchPST.id}
		    name={batchPST.name}
		    className="dropdown-content"
		/>
		<CellData 
		    batch_no={batchNoEST} 
		    start_time={batchEST.start_time} 
		    end_time={batchEST.end_time} 
		    seats={batchEST.seats} 
		    time_zone={batchEST.time_zone} 
		    batchID={batchEST.id}
		    name={batchEST.name}
		    className={`dropdown-content ${lastChildCSS}`}
		/>
	    </div>);
    }

    let columns = [];
    if(!isLoading) {
        for (let i = 1; i < batchData.batches.length / 2 - 1; i++) {
            columns.push((<Column key={i} column_no={i} lastChildCSS='rounded-none md:rounded-b-3xl lg:rounded-none' />));
        }
    }
    
    const course = batchData.name;

    let navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});

    const onNext = () => {
        setFormErrors({});
        const [ err ] = validateBatchSelect(batch_id);
        if(err){
            return setFormErrors(err);
        } else {
            let path = `/batches/${batch_id}/payment`;
            navigate(path); 
        }
    }

    return isLoading ? (
        <Loading />
        ) : (
        <div className="flex flex-col md:flex-initial w-full justify-center md:w-7/12 px-10 rounded-b-2xl md:rounded-r-2xl bg-white">
	    <div className="my-2 text-center">
                <h2 className="text-2xl mt-3"><b>{course}</b></h2>
                <h2 className="text-2xl">Select a batch that fits your schedule</h2>
	    </div>
            <div className='flex flex-col lg:flex-row lg:text-center justify-center border-black selectTable'>
		        <Column key={0} column_no={0} lastChildCSS='firstColumn'/>
	    	        {columns}
		        <Column key={batchData.batches.length / 2 - 1} column_no={batchData.batches.length / 2 - 1} lastChildCSS='lastColumn'/>
                    </div>
        <div>
            {   
				Object.keys(formErrors).length ? 
					<div className='text-right text-red-600 mt-5'>{formErrors['batchID'][0]}</div> 
				: 
                    <div className='text-right text-red-600 mt-5'>&nbsp;</div>
			}
	        <div className="flex flex-wrap justify-between my-5">
                <Button 
                    onClick={() => console.log("jawn")} 
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
        </div>
    );
}

export default BatchSelect;
