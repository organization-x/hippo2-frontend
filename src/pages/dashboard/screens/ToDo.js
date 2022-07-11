import React, { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './Home.css';
import baseUrl from '../../../apiUrls';
import Loading from "../../loading/loading";
import { useAuth } from "../../../services/authentication";
import { useFlashMsg } from "../../../services/flashMsg";


function ToDo() {
	const [tasksList, setTasksList] = useState([]);
	const [userCompletedTasks, setUserCompletedTasks] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);
	const [blockHidden, setBlockHidden] = useState(false);
	const { flashMsg } = useFlashMsg();
	const { user, autoAuthReq } = useAuth();
	
	// post request to update completedTasks
	const onClick = (e) => { 
		const taskValue = e.target.value;
		const postUpdateTasks = baseUrl + `/api/v1/users/${user.id}/tasks/`;
		const options = {
			method: 'POST',
			body: { task_id: taskValue }
		};
		autoAuthReq(postUpdateTasks, options).then(res => {
			setUserCompletedTasks([...userCompletedTasks, taskValue]);
			flashMsg('success', 'Task marked as complete');
		}).catch(err => {
			flashMsg('error', 'Failed to mark task as complete');
		});
	  };
	
	//Create ToDO Containers
	const toDoTasks = tasksList.map((task) =>{
		if (!userCompletedTasks.includes(task.id)) {
			return (
				<label className="containertask" key={task.id} >{task.text}
					<input type="checkbox" value = {task.id} onClick={onClick}></input>
					<span className="checkmark"></span>
					<p className='text-sm text-red-500 italic'>Deadline: {task.deadline}</p>
				</label>
			);
		}
		return null;
	});
	const ToDoCompletedTasks = tasksList.map((task) =>{
		if (userCompletedTasks.includes(task.id)) {
			return (
				<label className="containertask" key={task.id}>{task.text}
					<input type="checkbox" value = {task.id} checked={true}></input>
					<span className="checkmark"></span>
				</label>
			);
		}
		return null;
	});

	//function to hide/show completed task div
	function hideView() {
		setBlockHidden(!blockHidden);
	}

	useEffect(() => {
		// Runs after the first render() lifecycle
		const urlTasksApi = baseUrl + '/api/v1/taskslist';
		const completedTasksAPI = baseUrl + '/api/v1/tasks';
		const options = { method: 'GET' };
		(async () => {
			// gets a list of Tasks
			const tasksRes = await autoAuthReq(urlTasksApi, options);
			setTasksList(tasksRes.data);

			const cTasksRes = await autoAuthReq(completedTasksAPI, options);
			// create a list of task IDs from res
			const onlyIds = cTasksRes.data.map((task) => task.task_id);
			setUserCompletedTasks(onlyIds);

			setIsLoaded(false);
		})().catch(err => {
			flashMsg('error', 'Failed to get todos');
		});
	}, [autoAuthReq, flashMsg]);
	
	return (
		<>
			<div className="container w-full md:max-w-4xl  md:w-8/12 flex flex-wrap mx-auto pt-12 px-3"> 			
				<div className="flex-none md:flex-initial w-full md:w-full py-5 px-8 bg-white text-black rounded-t-xl md:rounded-t-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">To Do List</h1>
					<form>
							{isLoaded ? <Loading></Loading> : null}
							{toDoTasks}
					</form>
				</div>

				<div className="flex-none md:flex-initial w-full py-5 px-8 bg-gray-300 rounded-b-xl rounded-none">
				<div className="flex items-center justify-center h-0">
					<Button className="text-2xl flex font-semibold items-center justify-center px-20" onClick={() => hideView()}>
						{blockHidden ? <p id='hideViewText' className='text-base md:text-xl whitespace-nowrap'>Hide Completed Tasks</p> : null}
						{!blockHidden ? <p id='hideViewText'className='text-base md:text-xl whitespace-nowrap'>View Completed Tasks</p> : null}
						{!blockHidden ? <div className='arrow downArrow relative left-3 bottom-1' id='downArrow'></div> : null}
						{blockHidden ? <div className='arrow upArrow relative left-3 top-1' id='upArrow'></div> : null}
					</Button>
				</div>

				{blockHidden ? 
						<div id='hideView' className='pt-5'>
						<form>
								{isLoaded ? <Loading></Loading> : null}
								{ToDoCompletedTasks}
						</form>
						</div> : null}	
				</div>	
			</div>
		</>
		
	);

}

export default ToDo;
