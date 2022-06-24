import React, { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './DashboardHome.css';
import sendReq from "../../../services/sendReq";
import baseUrl from '../../../apiUrls';
import Loading from "../../../pages/loading/loading"
import { useAuth } from "../../../services/authentication";


function DashboardHome({ onNext }) {
	const [tasksList, setTasksList] = useState([]);
	const [userCompletedTasks, setUserCompletedTasks] = useState([]);
	const [isLoaded,setisLoaded] = useState(true);
	const userID = useAuth().user.id;
	
	// post request to update completedTasks
	const onClick = (e) => { 
		const taskValue = e.target.value;
		const postUpdateTasks = baseUrl +'/api/v1/users/'+userID+'/tasks/';
		const options = {
			method:'POST',
			body:{completedTasks:[...userCompletedTasks,taskValue]}
		};
		setUserCompletedTasks([...userCompletedTasks,taskValue]);
		sendReq(postUpdateTasks,options);
	  }
	
	//Create ToDO Containers
	const toDoTasks = tasksList.map((task) =>{
		if(!userCompletedTasks.includes(task.id)){
			return <label className="containertask" key={task.id} >{task.text}
						<input type="checkbox" value = {task.id} onClick={onClick}></input>
						<span className="checkmark"></span>
						<p className='text-sm text-red-500 italic'>Deadline: {task.deadline}</p>
					</label>
		}
	});
	const ToDoCompletedTasks = tasksList.map((task) =>{
		if(userCompletedTasks.includes(task.id)){
			return <label className="containertask" key={task.id}>{task.text}
						<input type="checkbox" value = {task.id} checked={true}></input>
						<span className="checkmark"></span>
					</label>
		}
	});

	//function to hide/show completed task div
	function hideView() {
		var toDoBlock = document.getElementById("hideView");
		var hideViewText = document.getElementById("hideViewText");
		var upArrow = document.getElementById("upArrow");
		var downArrow = document.getElementById("downArrow");
		if (toDoBlock.style.display == "none") {
			// if toDoBlock hidden, show it
			// Change from text View to Hide and downArrow to upArrow
			toDoBlock.style.display = "block";
			hideViewText.innerHTML='Hide Completed Tasks'
			upArrow.hidden=false;
			downArrow.hidden=true;
		  }else{
			 	// if toDoBlock shown, hide it
				// Change from text Hide to View and upArrow to downArrow
				toDoBlock.style.display = "none"
				hideViewText.innerHTML='View Completed Tasks'
				upArrow.hidden=true;
				downArrow.hidden=false;
		  }
	  }

	  useEffect(() => {
		// Runs after the first render() lifecycle
		const urlTasksApi = baseUrl +'/api/v1/taskslist';
		const completedTasksAPI = baseUrl +'/api/v1/tasks';
		const options = {
			method:'GET',
		};
		sendReq(urlTasksApi,options).then(res => {
			// gets a list of Tasks
			setTasksList(res.data);
		});
		sendReq(completedTasksAPI,options).then(res => {
			//Res.data looks like {task_id:id}, below creates a list of task IDs from res.data
			const only_ids = res.data.map(function (task){
				return task.task_id;
			});
			setUserCompletedTasks(only_ids);
		});
		setisLoaded(false);
	  }, []);
	
	return (
		<>
			<div className="container max-w-4xl min-w-max w-8/12 flex flex-wrap mx-auto pt-12 px-3"> 			
				<div className="flex-none md:flex-initial w-full md:w-full py-5 px-8 bg-white text-black rounded-t-xl md:rounded-t-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">To Do List</h1>
					<form>
							{isLoaded ? <Loading></Loading>:null}
							{toDoTasks}
					</form>
				</div>

				<div className="flex-none md:flex-initial w-full  md:w-full py-5 px-8 bg-gray-300 rounded-b-xl md:rounded-b-xl md:rounded-none">
				<div className="flex items-center justify-center h-0">
					<Button className="text-2xl flex font-semibold items-center justify-center px-20" onClick={() => hideView()}>
						<p id='hideViewText'>Hide Completed Tasks</p>
						<div className='arrow downArrow relative left-3 bottom-1' id='downArrow'hidden={false}></div>
						<div className='arrow upArrow relative left-3 top-1' id='upArrow' hidden={true}></div>
					</Button>
				</div>

				<div id='hideView' className='pt-5'>
						<form>
								{isLoaded ? <Loading></Loading>:null}
								{ToDoCompletedTasks}
						</form>
				</div>	
				</div>	
			</div>
		</>
		
	)

}

export default DashboardHome;
