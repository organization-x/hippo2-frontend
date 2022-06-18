import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import validateUserInformation from "../../../validation/userInformation";
import formatApiErrors from "../../../validation/formatApiErrors";
import { useAuth } from "../../../services/authentication";
import PhoneInput from "react-phone-input-2";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './get_courses.css';
import sendReq from "../../../services/sendReq";
import { string, type } from "superstruct";
import baseUrl from '../../../apiUrls';
import validate_course_id from "../../../validation/course_selection";

function GetInformation({ onNext }) {
	//const auth = useAuth();
	const navigate = useNavigate();
	let [course_list, setcourse_list] = useState([]);
	let [course_id,set_course_id] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (course_id) => {
		set_course_id(course_id.target.value);
		console.log(course_id.target.value ); //this prints the selected option
	  };

	const listItems = course_list.map((course) =>
	  <option value={course.id} key={course.name.toString()} >{course.name}</option>
	  );

	const onSubmit = () => {
		const [err, id] = validate_course_id(course_id);
		if(err){
			setErrorMessage('Please choose a course');
			console.log("fix");
		}
		else{
			navigate('/courses/'+course_id+'/batches');
		}
	}
	
	  React.useEffect(() => {
		// Runs after the first render() lifecycle
		const url_courses_api =baseUrl +'/api/v1/courses/';
		const options = {
			method:'GET',
		};
		const res = sendReq(url_courses_api, options);
		res.then(function(result) {
			setcourse_list(result.data);
		 })
	  }, [])
	
	


	return (
		<div>
			<div className="container max-w-3xl flex flex-wrap mx-auto pt-[50px] auth">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">3-Week AI Summer Course</h1>
					<ul className="text-base mb-3 pt">
                            <li>Learn Ai in small classes online</li>
                            <li>(6 students per instructer)</li>
                            <li>Build an impressive AI product</li>
                            <li>No coding experience necessary to start </li>
                            <li>Tuition: $1949 (early bird)/ $2349 (regular)</li> 
                        </ul>
					<p className="text-base">
						Click "Next" to view available program dates and choose your batch!
					</p>
				</div>

				<div className="flex-none md:flex-initial w-full  md:w-2/5 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-2xl mb-8 text-center font-semibold">Select a course to reserve a spot.</h2>
					<div className="mb-4 mt-5 " >
						<h1 className="text-lg mb-3 font-semibold">Course</h1>
						<p className="mb-3 text-sm font-light pr-4">Our world-class instructors are here to support you.</p>
                    </div>

					<div className=''>
						<select data-dropdown-placement="right" value={course_id} onChange={handleChange}
                        className="w-full py-1 form-select form-select-lg mb-3 
						px-5
						py-6
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
						focus:outline-none w-full"
						aria-label=".form-select-lg example">
                            <option className="" value ="" >3-Week AI Summer Course</option>
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
						<Button bgColor="gray" txtColor="white" className="w-full py-1" onClick={() => onSubmit()}>Back</Button>
					</div>

				</div>


				
              


				
			</div>
		</div>
	)
}

export default GetInformation;
