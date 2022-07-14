import { useState, useEffect } from "react";
import { useAuth } from "../../../services/authentication";
import { useFlashMsg } from "../../../services/flashMsg";
import baseUrl from '../../../apiUrls';
import HideViewBar from "../../../components/HideViewBar/HideViewBar";
import Loading from "../../loading/loading";
import 'react-phone-input-2/lib/style.css';


function ToDo() {
	const [tasksList, setTasksList] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);
	const [orders, setOrders] = useState(null);
	const { flashMsg } = useFlashMsg();
	const { user, autoAuthReq } = useAuth();


	const onClick = (e) => { 
		// post request to update completedTasks for that order
		if (e.target.checked === true) {
			const taskValue = e.target.value.split(',')[0];
			const orderId = e.target.value.split(',')[1];
			const postUpdateTasks = baseUrl + '/api/v1/orders/' + orderId + '/tasks/';
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
		const urlTasksApi = baseUrl + '/api/v1/taskslist/';
		const orderApi = baseUrl + '/api/v1/users/' + user.id + '/orders/';
		const options = { method: 'GET' };
		
		(async () => {
			const orderData = await autoAuthReq(orderApi, options);
			const taskData = await autoAuthReq(urlTasksApi, options);
			setOrders(orderData.data);
			setTasksList(taskData.data);
		})().catch(err => {
			flashMsg('error', 'Failed to get task info');
		});
		setIsLoaded(false);
	}, [autoAuthReq, flashMsg, user]);

	let orderList = null;
	if (orders !== null) {
		orderList = [];
		for (let order of orders) {
			// toDo containers for Tasks
			const toDoTasks = tasksList.map((task) =>{
				if (!order.completed_tasks.includes(task.id)) {
					return (
						<label className="containertask" key={task.id} >{task.text}
							<input type="checkbox" value = {String(task.id) + ',' + String(order.id)} onClick={onClick}></input>
							<span className="checkmark"></span>
							<p className='text-sm text-red-500 italic'>Deadline: {task.deadline}</p>
						</label>
					);
				}
				return null;
			});
			// Completed Task Container
			const ToDoCompletedTasks = tasksList.map((task) =>{
				if (order.completed_tasks.includes(task.id)) {
					return (
						<label className="containertask" key={task.id}>{task.text}
							<input type="checkbox" value = {task.id} checked={true}></input>
							<span className="checkmark"></span>
						</label>
					);
				}
				return null;
			});
			//container w-full md:max-w-4xl  md:w-8/12 flex flex-wrap mx-auto pt-12 px-3
			orderList.push((
           	<div className="container flex flex-wrap mx-auto mt-10 px-5 mb-10">           
			   <div className="flex-none md:flex-initial w-full md:w-full py-5 px-8 bg-white text-black rounded-t-xl md:rounded-t-xl md:rounded-none">
				   <h1 className="text-2xl mb-8 text-center">{order.user.first_name} {order.user.last_name}'s To Do List</h1>
				   <form>
					   {isLoaded ? <Loading></Loading> : null}
					   {toDoTasks}
					   </form>
					</div>
			   <HideViewBar info={ToDoCompletedTasks}></HideViewBar>
				</div>
			));
		}
	}

	return (
		<>
			<div className="container w-full md:max-w-4xl  md:w-8/12 flex flex-wrap mx-auto pt-12 px-3"> 			
				{orderList};
			</div>
		</>
	);

}

export default ToDo;
