import { useEffect } from 'react';
import logo from '../../logo.svg';
import './batchSelect.css';
import Button from '../button/button';

function BatchSelect({batchData, onChange}) {
// /api/v1/courses/<course_id>/batches/
    let column_bodies_pst = [];
    let column_bodies_est = [];
    let column_headers = [];

    // returns a string of month/year from Date() object
    function mmyyFormat(date) {
	return `${date.getMonth()}/${date.getYear() % 100}`;
    }

    // returns a Button Component indicating the availabilty of a batch
    function getAvailability(seats) {
	if (seats > 4) {
	    return (
	        <Button onClick={() => onChange()} bgColor="green" txtColor="white" className="w-11/12 h-8">
		    OPEN
	        </Button>)
	}
	else if (seats != 0) {
		return (
		    <Button onClick={() => onChange()} bgColor="gray" txtColor="white" className="w-11/12 h-8">
			{seats} SEATS
	            </Button>)
	}
	return (
	    <Button onClick={() => onChange()} bgColor="red" txtColor="white" className="w-11/12 h-8">
		SOLD OUT
	    </Button>)
    }
    // returns a string indicating the hour and AM/PM of a batch
    function hourMiddayFormat(time) {
	const hour = time.getHours() % 12;
	return `${hour == 0 ? 12 : hour} ${time.getHours() < 12 ? 'AM' : 'PM'}`;
    }

    batchData.forEach((batch, index) => {
	const start_date = new Date(batch.start_date);
	const start_time = new Date(batch.start_time);
	const end_date = new Date(batch.end_date);
	const end_time = new Date(batch.end_time);
	column_headers.push(
			    <th key={index} >
				{`${mmyyFormat(start_date)} - ${mmyyFormat(end_date)}`}
				<p className='batch_name'>
		    	    	     {`Batch ${batch.name}`}
				</p>
			    </th>);
	column_bodies_pst.push(
		    	<td key={index}>
		            {`${hourMiddayFormat(start_time)} - ${hourMiddayFormat(end_time)} PST`}
			    {getAvailability(batch.seats)}
		    	    <p>from<br/><b>$1,949</b><br/>(Early Bird)</p>
		        </td>);
	column_bodies_est.push(
			<td key={index}>
		            {`${hourMiddayFormat(start_time)} - ${hourMiddayFormat(end_time)} EST`}
			    {getAvailability(batch.seats)}
		    	    from<br/><b>$1,949</b><br/>(Early Bird)
		        </td>);
    });

    return (
	<div className='container max-w-6xl flex flex-wrap mx-auto p-4 auth'>
	    <div className="flex-none md:flex-initial w-full md:w-1/3 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
		<h1 className="text-3xl mb-5 text-center">Batch Details</h1>
		<p className="text-2xl mb-3">
		    Select the batch that you want to register your student for. Details about your selected batch will appear here!
		</p>

		<p className="text-2xl mb-3">
		    Some batch choices will be limited due to our capacity. 
		</p>
	    </div>
	    <div className="flex flex-col md:flex-initial w-full md:w-7/12 text-center py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
	        <h2><b>3-Week AI Summer Course</b></h2>
	        <h2>Select a batch that fits your schedule</h2>
	        <table className='batch_description_box'>
		    <thead>
	                <tr>
			    {column_headers}
	                </tr>
	            </thead>
	            <tbody>
	                <tr>
		            {column_bodies_pst}
	                </tr>
	            </tbody>
		    <tfoot>
		        <tr>
		            {column_bodies_est}
	                </tr>
	            </tfoot>
	        </table>
	        <div className="flex space-x-14">
	    	    <Button onClick={() => onChange()} bgColor="gray" txtColor="white" className="w-1/3 h-16">Back</Button>
	    	    <Button onClick={() => onChange()} bgColor="green" txtColor="white" className="w-2/3 h-16">Next</Button>
	        </div>
	    </div>

	</div>
    );
}

export default BatchSelect;
