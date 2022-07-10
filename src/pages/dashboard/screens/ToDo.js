import React, { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './Home.css';
import baseUrl from '../../../apiUrls';
import Loading from "../../loading/loading";
import { useAuth } from "../../../services/authentication";


function ToDo() {
	const [tasksList, setTasksList] = useState([]);
	const [userCompletedTasks, setUserCompletedTasks] = useState([]);
	const [isLoaded,setisLoaded] = useState(true);
	const auth = useAuth();
	const [blockHidden, setBlockHidden] = useState(false);
	
	// post request to update completedTasks
	const onClick = (e) => { 
		const taskValue = e.target.value;
		const postUpdateTasks = baseUrl +'/api/v1/users/'+auth.user.id+'/tasks/';
		const options = {
			method:'POST',
			body:{ task_id:taskValue }
		};
		setUserCompletedTasks([...userCompletedTasks,taskValue]);
		auth.autoAuthReq(postUpdateTasks,options);
	  };
	
	//Create ToDO Containers
	const toDoTasks = tasksList.map((task) =>{
		if (!userCompletedTasks.includes(task.id)){
			return <label className="containertask" key={task.id} >{task.text}
						<input type="checkbox" value = {task.id} onClick={onClick}></input>
						<span className="checkmark"></span>
						<p className='text-sm text-red-500 italic'>Deadline: {task.deadline}</p>
					</label>;
		} else {
			return null;
		}
	});
	const ToDoCompletedTasks = tasksList.map((task) =>{
		if (userCompletedTasks.includes(task.id)){
			return <label className="containertask" key={task.id}>{task.text}
						<input type="checkbox" value = {task.id} checked={true}></input>
						<span className="checkmark"></span>
					</label>;
		} else {
			return null;
		}
	});

	//function to hide/show completed task div
	function hideView() {
		setBlockHidden(!blockHidden);
	  }

	  useEffect(() => {
		// Runs after the first render() lifecycle
		const urlTasksApi = baseUrl +'/api/v1/taskslist';
		const completedTasksAPI = baseUrl +'/api/v1/tasks';
		const options = {
			method:'GET',
		};
		auth.autoAuthReq(urlTasksApi,options).then(res => {
			// gets a list of Tasks
			setTasksList(res.data);
		});
		auth.autoAuthReq(completedTasksAPI,options).then(res => {
			//Res.data looks like {task_id:id}, below creates a list of task IDs from res.data
			const only_ids = res.data.map(function (task){
				return task.task_id;
			});
			setUserCompletedTasks(only_ids);
		});
		setisLoaded(false);
	  }, [auth]);
	
	return (
		<>
			<div className="container w-full md:max-w-4xl  md:w-8/12 flex flex-wrap mx-auto pt-12 px-3"> 			
				<div className="flex-none md:flex-initial w-full md:w-full py-5 px-8 bg-white text-black rounded-t-xl md:rounded-t-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">To Do List</h1>
					<form>
							{isLoaded ? <Loading></Loading>:null}
							{toDoTasks}
					</form>
				</div>

				<div className="flex-none md:flex-initial w-full py-5 px-8 bg-gray-300 rounded-b-xl rounded-none">
				<div className="flex items-center justify-center h-0">
					<Button className="text-2xl flex font-semibold items-center justify-center px-20" onClick={() => hideView()}>
						{blockHidden ? <p id='hideViewText' className='text-base md:text-xl whitespace-nowrap'>Hide Completed Tasks</p>:null}
						{!blockHidden ? <p id='hideViewText'className='text-base md:text-xl whitespace-nowrap'>View Completed Tasks</p>:null}
						{!blockHidden ? <div className='arrow downArrow relative left-3 bottom-1' id='downArrow'></div>:null}
						{blockHidden ? <div className='arrow upArrow relative left-3 top-1' id='upArrow'></div>:null}
					</Button>
				</div>

				{blockHidden ? 
						<div id='hideView' className='pt-5'>
						<form>
								{isLoaded ? <Loading></Loading>:null}
								{ToDoCompletedTasks}
						</form>
						</div>:null}	
				</div>	
			</div>
		</>
		
	);

}

export default ToDo;
