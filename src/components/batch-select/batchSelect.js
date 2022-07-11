import './batchSelect.css';
import Button from '../button/button';
import { useState } from 'react';
import Loading from "../../pages/loading/loading";

// returns a Button Component indicating the availabilty of a batch
function AvailabilityButton({ seats }) {
    const buttonClassName = "my-4 w-1/4 text-center lg:w-11/12 p-2 lg:p-1 inline-block";
    let text;
    let color;
    if (seats > 20) {
        text = 'OPEN';
        color = 'green';
    } else if (seats > 0) {
        text = seats + ' LEFT';
        color = 'yellow';
    } else {
        text = 'SOLD OUT';
        color = 'red';
    }
    return (
        <Button bgColor={color} txtColor="white" className={buttonClassName}>{text}</Button>
    );
    
}

// returns the table's header with the date range and batch name
function ColumnHeader({ startDate, endDate, name, onClick }) {
  return <div className='selectHeader' onClick={onClick}>
		<p className='text-xl my-4 ml-8 lg:ml-0 text-black md:inline-block lg:block'>{startDate} - {endDate}</p>
		<svg className="inline-block lg:hidden mr-8 lg:mr-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
		</svg>
		<p className='text-base hidden lg:block text-gray-800 mb-4'>
			{`Batch ${name}`}
		</p>
	</div>;
}

function BatchSelect({ batchData, onChange, batchIndex, isLoading }) {
    // returns table data formatted with times, seats, and price
    function CellData({ 
		batchNum, startTime, endTime, seats, 
		timeZone, batchID, name, className, selectedBatchID = ""
	}) {
        let disabled = false;
        if (seats < 1) {
            disabled = true;
        }

        if (batchID === selectedBatchID) {
            disabled = true;
        }

        return (
            <div id={batchID} key={batchNum} onClick={() => disabled ? null : onChange(batchNum, batchID)} className={`border-t-2 px-4 lg:px-0 md:border-gray-300 lg:border-black ${className} ${batchNum === batchIndex || batchID === selectedBatchID ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                <p className="text-xs text-gray-800 mt-4 hidden lg:block lg:p-0">{startTime} - {endTime} <b>{timeZone}</b></p>
		<div className="selectBody">
                    <p className='text-xs inline lg:hidden text-gray-800'>
                        Batch {name} <b>({timeZone})</b><br/>
			from <br className='hidden lg:block'/><b className='text-md text-gray-500'>${batchData.price}</b><br className='hidden lg:block'/> (Early Bird)
                    </p>
                    <AvailabilityButton batchNum={batchNum} batchID={batchID} seats={seats}/>
		</div>

                <p className='hidden lg:block text-xs text-gray-800 pb-12'>from <br className='hidden lg:block'/><b className='text-md text-gray-500'>${batchData.price}</b><br className='hidden lg:block'/> (Early Bird)</p>
            </div>);
    }

    function Column({ columnNum }) {
	const [clicked, setClicked] = useState(false);
        const batchNoPST = 2 * columnNum;
        const batchNoEST = batchNoPST + 1;

        const batchPST = batchData.batches[batchNoPST];
        const batchEST = batchData.batches[batchNoEST];
	
	let visibility = clicked ? 'block' : 'hidden lg:block';

    let selectedBatchID = "";

    if (batchData.batch_id !== null) {
        selectedBatchID = batchData.batch_id;
    }

        return isLoading ? (
            <Loading/>
            ) : (
            <div key={columnNum} className={`grow border-black selectColumn`}>
                <ColumnHeader onClick={() => clicked ? setClicked(false) : setClicked(true) } startDate={batchPST.start_date} endDate={batchPST.end_date} name={batchPST.name}/>
                <CellData 
                    batchNum={batchNoPST} 
                    startTime={batchPST.start_time} 
                    endTime={batchPST.end_time} 
                    seats={batchPST.seats} 
                    timeZone={batchPST.time_zone} 
                    batchID={batchPST.id}
                    name={batchPST.name}
                    selectedBatchID={selectedBatchID}
                    className={visibility}
                />
                <CellData 
                    batchNum={batchNoEST} 
                    startTime={batchEST.start_time} 
                    endTime={batchEST.end_time} 
                    seats={batchEST.seats} 
                    timeZone={batchEST.time_zone} 
                    batchID={batchEST.id}
                    name={batchEST.name}
                    className={`${visibility} rounded-b-3xl lg:rounded-none`}
                />
            </div>);
    }

    const columns = [];
    if (!isLoading) {
        for (let i = 0; i < batchData.batches.length / 2; i++) {
            columns.push(<Column key={i} columnNum={i} />);
        }
    }
    
    const course = batchData.name;

    return isLoading ? (
        <Loading />
        ) : (
        <div>
	    <div className="my-2 text-center w-full">
                <h2 className="text-2xl mt-3"><b>{course}</b></h2>
                <h2 className="text-2xl">Select a batch that fits your schedule</h2>
	    </div>
            <div className='flex flex-col lg:flex-row lg:text-center overflow-hidden justify-center border-black selectTable'>
	    	{columns}
            </div>
        </div>
    );
}

export default BatchSelect;
