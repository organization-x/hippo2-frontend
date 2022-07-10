import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './selectCourses.css';
import sendReq from "../../services/sendReq";
import baseUrl from '../../apiUrls';
import validateUuid from "../../validation/uuid";

function SelectCourses() {
	const navigate = useNavigate();
	const [courseList, setCourseList] = useState([]);
	const [courseId,setCourseId] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (courseId) => {
		setCourseId(courseId.target.value);
	};

	const listItems = courseList.map((course) =>
		<option value={course.id} key={course.name.toString()} >{course.name}</option>
	);

	const onSubmit = () => {
		const [err] = validateUuid(courseId);
		if (err) {
			setErrorMessage('Please choose a course');
		} else {
			navigate('/courses/'+courseId+'/batches');
		}
	};

	const onBack = () => {
		//dummy onback function for now
	};

	useEffect(() => {
		// Runs after the first render() lifecycle
		const urlCoursesApi = baseUrl +'/api/v1/courses/';
		const options = {
			method:'GET',
		};

		sendReq(urlCoursesApi,options).then(res => {
			setCourseList(res.data);
		});
	}, []);
	
	return (
		<>
			<div className="container max-w-3xl flex flex-wrap mx-auto pt-11 auth px-3">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">3-Week AI Summer Course</h1>
					<ul className="text-base mb-3 pt">
                            <li>Learn AI in small classes online</li>
                            <li>(6 students per instructer)</li>
                            <li>Build an impressive AI product</li>
                            <li>No coding experience necessary to start </li>
                            <li>Tuition: $1949 (early bird)/ $2349 (regular)</li> 
                        </ul>
					<p className="text-base">
						Click "Next" to view available program dates and choose your batch!
					</p>
				</div>

				<div className="flex-none md:flex-initial w-full  md:w-3/5 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-2xl mb-8 text-center font-semibold">Select a course to reserve a spot.</h2>
					<div className="mb-4 mt-5 " >
						<h1 className="text-lg mb-3 font-semibold">Course</h1>
						<p className="mb-3 text-sm font-light pr-4">Our world-class instructors are here to support you.</p>
                    </div>

					<div className=''>
						<select data-dropdown-placement="right" value={courseId} onChange={handleChange}
							className="w-full py-6 form-select form-select-lg mb-3 
							px-5
							text-left
							font-normal
							text-gray-700
							bg-slate-100 bg-no-repeat
							border border-solid border-gray-100
							rounded-full
							transition
							ease-in-out
							focus:text-gray-700
							focus:bg-white
							focus:border-blue-600
							focus:outline-none"
							aria-label=".form-select-lg example"
						>
                            <option value ="" disabled >Select a Course</option>
                            {listItems}
                        </select>	
					</div>
					
					<div className='pb-3'>
						{errorMessage && (<p className="error bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> {errorMessage} </p>)}
					</div>
					
					<div className="flex pb-2.5">
						<Button bgColor="green" txtColor="white" className="w-full py-1" onClick={() => onSubmit()}>Next</Button>
					</div>

					<div className="flex pt-2.5">
						<Button bgColor="gray" txtColor="white" className="w-full py-1" onClick={() => onBack()}>Back</Button>
					</div>

				</div>	
			</div>
		</>
		
	);
}

export default SelectCourses;
