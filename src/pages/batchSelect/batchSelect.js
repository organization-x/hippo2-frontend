import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashMsg } from "../../services/flashMsg";
import { useAuth } from "../../services/authentication";
import validateUuid from "../../validation/uuid";
import BatchBoard from "../../components/batchBoard/batchBoard";
import Button from "../../components/button/button";

function BatchSelect() {
	const [batch, setBatch] = useState({});
	const { courseID } = useParams();
	const { flashMsg } = useFlashMsg();
	const { user } = useAuth();
	const navigate = useNavigate();

	const onSubmit = () => {
		const id = batch.id;
		const [err] = validateUuid(id);
		if (err) {
			flashMsg('error', 'Invalid batch');
		} else if (user.type === "PARENT") {
			const path = `/batches/${id}/student-selection`;
			navigate(path); 
		} else {
			const path = `/batches/${id}/payment`;
			navigate(path); 
		}
	};

	return (
		<div className="container max-w-5xl flex flex-row flex-wrap mx-auto mt-10 rounded-2xl overflow-hidden">
			<div className="w-full md:w-1/3 bg-green px-6 py-3">
				<h1>hello world</h1>
			</div>
			<div className="w-full md:w-2/3 bg-white px-6 py-3">
				<BatchBoard className="w-full" courseID={courseID} batchID={batch.id} onChange={(b) => setBatch(b)} />
				<Button 
					bgColor="grey" 
					txtColor="white" 
					className="w-full py-1" 
					onClick={() => navigate('/courses')}
				>
					Back
				</Button>
				<Button 
					bgColor="green" 
					txtColor="white" 
					className="w-full py-1" 
					onClick={() => onSubmit()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export default BatchSelect;
