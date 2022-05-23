import Input from "../components/form/input";
import Button from "../components/button/button";
import {useState} from "react";

function GetStudentInformation() {
	// We ignore these lines from linting because these variables aren't used yet but the setters are used
	// eslint-disable-next-line
	const [studentName, setStudentName] = useState('');
	// eslint-disable-next-line
	const [studentEmail, setStudentEmail] = useState('');
	// eslint-disable-next-line
	const [studentBirthday, setStudentBirthday] = useState('');

	const onSubmit = () => {
		// executes when the Next button is clicked or when form is submitted
	}
	const backButton = () => {
		// executes when the Back button is clicked
	}

	return (
		<div>
			<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">Account Logistics</h1>
					<p className="text-base mb-3">
						Fill out your personal details to create your account profile! Some items may be pre-filled, so feel free to make edits to ensure that the information is accurate.
					</p>
					<p className="text-base">
						Click "Next" to move onto course selection!
					</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
					onSubmit();
				}} className="flex-none md:flex-initial w-full md:w-3/5 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-7 text-center">Gain real experience by building real AI products. We are here to support you.</h2>

					<div className="mb-8">
						<Input label="Student Name"
							   type="text"
							   placeHolder="John Doe"
							   className="mb-3"
							   onChange={val => setStudentName(val)}
						/>
						<Input label="Student Email"
							   type="email"
							   placeHolder="JohnDoe@yahoo.com"
							   className="mb-3"
							   onChange={val => setStudentEmail(val)}
						/>
						<Input label="Student Birth Month and Year"
							   type="text"
							   placeHolder="MM/YYYY"
							   onChange={val => setStudentBirthday(val)}
						/>
					</div>

					<div className="flex">
						<Button bgColor="gray" txtColor="white" className="w-1/3 mx-2 py-1" onClick={() => backButton()}>Back</Button>
						<Button bgColor="green" txtColor="white" className="w-2/3 mx-2 py-1" onClick={() => onSubmit()}>Next</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default GetStudentInformation;
