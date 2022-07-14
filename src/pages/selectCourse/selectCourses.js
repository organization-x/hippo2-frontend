import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMsg } from "../../services/flashMsg";
import sendReq from "../../services/sendReq";
import validateUuid from "../../validation/uuid";
import baseUrl from '../../apiUrls';
import Button from "../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './selectCourses.css';

function SelectCourses() {
	const navigate = useNavigate();
	const { flashMsg } = useFlashMsg();

	const [courseList, setCourseList] = useState([]);
	const [courseId, setCourseId] = useState('');
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
			navigate(`/courses/${courseId}/batches`);
		}
	};

	useEffect(() => {
		// Runs after the first render() lifecycle
		const urlCoursesApi = baseUrl + '/api/v1/courses/';
		const options = {
			method: 'GET',
		};

		sendReq(urlCoursesApi, options).then(res => {
			setCourseList(res.data);
		}).catch(err => {
			flashMsg('error', 'Failed to get courses');
			navigate('/');
		});
	}, [flashMsg, navigate]);
	
	return (
		<>
			<div className="container max-w-3xl flex flex-wrap mx-auto pt-11 auth px-3">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">Course Details</h1>
					<p className="text-base">
						Select the course that you want to register for. Details about your selected course will appear here!
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
					
					<Button bgColor="green" txtColor="white" className="w-full py-1 mb-2.5" onClick={() => onSubmit()}>Next</Button>
				</div>	
			</div>
		</>
		
	);
}

export default SelectCourses;
