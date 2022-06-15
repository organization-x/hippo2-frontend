import { useEffect } from 'react';
import logo from '../../logo.svg';
import './batchSelect.css';
import Button from '../button/button';

function BatchSelect({batchData, onChange, batch}) {
// /api/v1/courses/<course_id>/batches/
    let column_bodies_pst = [];
    let column_bodies_est = [];
    let column_headers = [];

    // returns a Button Component indicating the availabilty of a batch
    function getAvailability(batch_no, batchID, seats) {
    if (seats > 20) {
        return (
            <Button onClick={() => onChange(batch_no, batchID)} bgColor="green" txtColor="white" className="bg-main_green w-11/12 h-8">
            <p className="text-2xl">OPEN</p>
            </Button>);
    }
    else if (seats != 0) {
        return (
        <Button onClick={() => onChange(batch_no, batchID)} bgColor="main_yellow" txtColor="white" className="w-11/12 h-8">
            <p className="text-2xl">{seats} LEFT</p>
            </Button>);
    }
    return (
        <Button onClick={() => onChange(batch_no, batchID)} bgColor="main_red" txtColor="white" className="w-11/12 h-8">
        <p className="text-2xl">SOLD OUT</p>
        </Button>);
    }
    // returns the table's header with the date range and batch name
    function columnHeader(key, start_date, end_date, name) {
    return (
        <th key={key}>
                <p className='text-2xl'>{start_date} - {end_date}</p>
                <p className='batch_name'>
            {`Batch ${name}`}
                </p>
        </th>);
    }
    // returns table data formatted with times, seats, and price
    function columnData(key, start_time, end_time, seats, price, tz, batch_no, batchID) {
        return (
            <td key={key}>
                <p className="text-sm">{start_time} - {end_time} <b>{tz}</b></p>
                {getAvailability(batch_no, batchID, seats)}
                <p>from<br/><b>${price}</b><br/>(Early Bird)</p>
            </td>);
    }

    batchData.forEach((batch, index) => {
        column_headers.push(columnHeader(index, batch.start_date, batch.end_date, batch.name));
        column_bodies_pst.push(columnData(index, batch.start_time, batch.end_time, batch.seats, batch.price, 'PST', index, batch.id));
        column_bodies_est.push(columnData(index, batch.start_time, batch.end_time, batch.seats, batch.price, 'EST', index, batch.id));
    });

    return (
        <div className="flex flex-col md:flex-initial w-full md:w-7/12 text-center px-10 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
            <h2 className="text-2xl mt-3"><b>3-Week AI Summer Course</b></h2>
            <h2 className="text-2xl">Select a batch that fits your schedule</h2>
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
                <Button onClick={() => console.log("jawn")} bgColor="gray" txtColor="white" className="w-1/3 h-12 my-3">
                <p className="text-2xl">Back</p>
                </Button>
                <Button onClick={() => console.log("yawn")} bgColor="green" txtColor="white" className="w-2/3 h-12 my-3">
                <p className="text-2xl">Next</p>
                </Button>
            </div>
        </div>
    );
}

export default BatchSelect;
