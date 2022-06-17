import './batchSelect.css';
import Button from '../button/button';

function BatchSelect({batchData, onChange, batchIndex, err}) {
    // /api/v1/courses/<course_id>/batches_dict/
    // returns a Button Component indicating the availabilty of a batch
    function AvailabilityButton({batch_no, batchID, seats}) {
        if (seats > 20) {
            return (
                <Button onClick={() => onChange(batch_no, batchID)} bgColor="green" txtColor="white" className="my-4 w-11/12 h-8">
                    <p className="text-2xl">OPEN</p>
                </Button>);
        }
        else if (seats > 0) {
            return (
                <Button onClick={() => onChange(batch_no, batchID)} bgColor="yellow" txtColor="white" className="my-4 w-11/12 h-8">
                    <p className="text-2xl">{seats} LEFT</p>
                </Button>);
        }
        return (
            <Button onClick={() => onChange(batch_no, batchID)} bgColor="red" txtColor="white" className="my-4 w-11/12 h-8">
                <p className="text-2xl">SOLD OUT</p>
            </Button>);
    }
    // returns the table's header with the date range and batch name
    function ColumnHeader({start_date, end_date, name}) {
    	return (
            <div className=''>
                <p className='text-xl my-4 mx-4 text-black'>{start_date} - {end_date}</p>
                <p className='text-xs text-gray-800 mb-4'>
                    {`Batch ${name}`}
                </p>
            </div>);
    }
    // returns table data formatted with times, seats, and price
    function CellData({batch_no, start_time, end_time, seats, time_zone, batchID, className}) {
        return (
            <div key={batch_no} onClick={() => onChange(batch_no, batchID)} className={`border-t-2 sm:border-gray-300 md:border-black ${className} ${batch_no === batchIndex ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                <p className="text-xs text-gray-800 mt-4">{start_time} - {end_time} <b>{time_zone}</b></p>
                <AvailabilityButton batch_no={batch_no} batchID={batchID} seats={seats}/>
                <p className='text-xs text-gray-800 pb-16'>from<br/><b className='text-sm text-gray-500'>${batchData.price}</b><br/>(Early Bird)</p>
            </div>);
    }

    function Column({column_no, className, lastChildCSS}) {
	const batchNoPST = 2*column_no;
	const batchNoEST = batchNoPST+1;

	let batchPST = batchData.batches[batchNoPST];
	let batchEST = batchData.batches[batchNoEST];

	return (
	    <div key={column_no} className={`grow border-black selectColumn dropdown`}>
		<ColumnHeader start_date={batchPST.start_date} end_date={batchPST.end_date} name={batchPST.name}/>
		<CellData 
		    batch_no={batchNoPST} 
		    start_time={batchPST.start_time} 
		    end_time={batchPST.end_time} 
		    seats={batchPST.seats} 
		    time_zone={batchPST.time_zone} 
		    batchID={batchPST.id}
		    className="dropdown-content"
		/>
		<CellData 
		    batch_no={batchNoEST} 
		    start_time={batchEST.start_time} 
		    end_time={batchEST.end_time} 
		    seats={batchEST.seats} 
		    time_zone={batchEST.time_zone} 
		    batchID={batchEST.id}
		    className={`dropdown-content ${lastChildCSS}`}
		/>
	    </div>);
    }

    let columns = [];
    for (let i = 1; i < batchData.batches.length / 2 - 1; i++) {
	    columns.push((<Column column_no={i} lastChildCSS='rounded-none sm:rounded-b-3xl md:rounded-none' />));
    }
    
    const course = batchData.name;

    return (
        <div className="flex flex-col md:flex-initial w-full md:w-7/12 text-center px-10 bg-white">
	    <div className="my-2">
                <h2 className="text-2xl mt-3"><b>{course}</b></h2>
                <h2 className="text-2xl">Select a batch that fits your schedule</h2>
	    </div>
            <div className='flex flex-col md:flex-row border-black selectTable'>
		<Column column_no={0} lastChildCSS='firstColumn'/>
	    	{columns}
		<Column column_no={batchData.batches.length / 2 - 1} lastChildCSS='lastColumn'/>
            </div>
            <div className="flex my-4">
                <Button onClick={() => console.log("jawn")} bgColor="gray" txtColor="white" className="w-1/4 h-12 my-3">
                    <p className="text-2xl">Back</p>
                </Button>
	        <div className="w-1/4 h-12 my-3"/>
                <Button 
	    	 onClick={() => console.log("hello") }
	    	 bgColor="green" txtColor="white" 
	    	 className="w-1/2 h-12 my-3"
	    	>
                    <p className="text-2xl">Next</p>
	    	    
                </Button>
            </div>
        </div>
    );
}

export default BatchSelect;
