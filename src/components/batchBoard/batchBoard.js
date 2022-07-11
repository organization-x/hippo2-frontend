import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useFlashMsg } from "../../services/flashMsg";
import sendReq from "../../services/sendReq";
import baseUrl from "../../apiUrls";
import './batchBoard.css';

function BatchBoard({ courseID, batchID, onChange, className }) {
	const [batches, setBatches] = useState([]);
	const [price, setPrice] = useState();
	const { flashMsg } = useFlashMsg();

	useEffect(() => {
		if (!courseID) {
			return flashMsg('error', 'Invalid course');
		}

		const url = baseUrl + `/api/v1/courses/${courseID}/batches/`;
		const options = { method: 'GET' };

		sendReq(url, options).then(res => {
			setBatches(res.data.batches);
			setPrice(res.data.price);
		}).catch(err => {
			flashMsg('error', 'Failed to get batch info');
		});
	}, [flashMsg, courseID]);

	if (!batches.length) {
		return (
			<h1 className="text-center text-lg">Loading available batches...</h1>
		);
	}

	// render each column into jsx
	const columns = [];
	const batchIDs = [];
	for (let x = 0; x < batches.length; x++) {
		// get the first batch
		const batch = batches[x];
		// continue if this batch was rendered already
		if (batchIDs.includes(batch.id)) {
			continue;
		}
		const column = [batch];
		batchIDs.push(batch.id);
		// get all batches with same name
		for (let i = x + 1; i < batches.length; i++) {
			if (batches[i].name === batch.name) {
				column.push(batches[i]);
				batchIDs.push(batches[i].id);
			}
		}

		// render batches to jsx
		const selection = [];
		for (let i = 0; i < column.length; i++) {
			const b = column[i];
			const selected = b.id === batchID;

			const seatsInfo = {};
			if (b.seats > 20) {
				seatsInfo.text = 'OPEN';
				seatsInfo.class = 'open';
			} else if (b.seats > 0) {
				seatsInfo.text = `${b.seats} LEFT`;
				seatsInfo.class = 'partial';
			} else {
				seatsInfo.text = 'SOLD OUT';
				seatsInfo.class = 'full';
			}
			// individual batch
			selection.push(
				<button 
					key={b.id}
					className={`batch ${selected ? 'selected' : ''}`} 
					disabled={selected}
					onClick={() => onChange(b)}
				>
					<p className="name">Batch {b.name}</p>
					<p className="time">
						{b.start_time} - {b.end_time} <span>{b.time_zone}</span>
					</p>
					<span className={`pill ${seatsInfo.class}`}>{seatsInfo.text}</span>
					<p className="price">
						<span>from</span>
						<span>${price}</span>
						<span>(Early Bird)</span>
					</p>
				</button>
			);
		}
		// column with column header
		columns.push(
			<div key={columns.length} className="batch-col">
				<button 
					className="batch-head"
					onClick={(e) => e.currentTarget.classList.toggle('show')}
				>
					<h1>{batch.start_date} - {batch.end_date}</h1>
					<h4>Batch {batch.name}</h4>
					<FontAwesomeIcon className="caret" icon={faAngleDown} />
				</button>
				{selection}
			</div>
		);
	}

	return (
		<div className={`batch-container ${className}`}>
			{columns}
		</div>
	);
}

export default BatchBoard;
