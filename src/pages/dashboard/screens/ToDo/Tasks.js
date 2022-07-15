import { useState, useEffect } from "react";
import { useAuth } from "../../../../services/authentication";
import { useFlashMsg } from "../../../../services/flashMsg";
import baseUrl from '../../../../apiUrls';
import 'react-phone-input-2/lib/style.css';


function GetTasks(prop) {
	const [tasksList, setTasksList] = useState([]);
	const { flashMsg } = useFlashMsg();
	const { autoAuthReq } = useAuth();
	const { orderId, comTasks } = prop;

	const onClick = (e) => { 
		// post request to update completedTasks for that order
		if (e.target.checked === true) {
			const taskValue = e.target.value.split(',')[0];
			const orderID = e.target.value.split(',')[1];
			const postUpdateTasks = baseUrl + '/api/v1/orders/' + orderID + '/tasks/';
			const options = {
				method: 'POST',
				body: { task_id: taskValue }
			};
			autoAuthReq(postUpdateTasks, options).then(res => {
				flashMsg('success', 'Congrats! Task marked as Complete!');
			}).catch(err => {
				flashMsg('error', 'Failed to mark task as complete');
			});
		} else {
			e.target.checked = true;
			flashMsg('success', 'Task already completed!');
		}
	};

	useEffect(() => {
		const options = { method: 'GET' };
		(async () => {
			const ourl  = baseUrl + '/api/v1/orders/' + orderId + '/tasks/';
			const tdata = await autoAuthReq(ourl, options);
			setTasksList(tdata.data.tasks);

		})().catch(err => {
			flashMsg('error', 'Failed to get task info');
		});
	}, [autoAuthReq, flashMsg, orderId]);
	
	const toDoTasks = tasksList.map((task) =>{
		if (!comTasks.includes(task.id)) {
			return (
				<label className="containertask" key={task.id} >{task.text}
					<input type="checkbox" value = {String(task.id) + ',' + String(orderId)} onClick={onClick}></input>
					<span className="checkmark"></span>
					<p className='text-sm text-red-500 italic'>Deadline: {task.deadline}</p>
				</label>
			);
		}
		return null;
	});

	return (
		<>
			{toDoTasks}
		</>
	);

}

export default GetTasks;
