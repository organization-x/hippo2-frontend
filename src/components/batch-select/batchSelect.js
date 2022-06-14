import { useEffect } from 'react';
import logo from '../../logo.svg';
import './batchSelect.css';
function BatchSelect({batchData, onChange}) {
// /api/v1/courses/<course_id>/batches/
    let column_bodies_pst = [];
    let column_bodies_est = [];
    let column_headers = [];

    // returns a string of month/year from Date() object
    function mmyyFormat(date) {
	return `${date.getMonth()}/${date.getYear() % 100}`;
    }

    // returns a string indicating the availabilty of a batch
    function getAvailability(seats) {
	return `${seats > 20 ? 'OPEN' : seats != 0 ? seats + ' SEATS' : 'SOLD OUT' }`;
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
		    	    <button className='batch_status_button'>
		    		{`${getAvailability(batch.seats)}`}
		    	    </button> 
		    	    <p>from<br/><b>$1,949</b><br/>(Early Bird)</p>
		        </td>);
	column_bodies_est.push(
			<td key={index}>
		            {`${hourMiddayFormat(start_time)} - ${hourMiddayFormat(end_time)} PST`}
		    	    <button className='batch_status_button'>
		    		{`${getAvailability(batch.seats)}`}
		    	    </button> 
		    	    <p>from<br/><b>$1,949</b><br/>(Early Bird)</p>
		        </td>);
    });

    return (
	<div className='batch_box'>
		<div>
		    <h1>Batch Details</h1>

		</div>
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
	</div>
    );
}

export default BatchSelect;
