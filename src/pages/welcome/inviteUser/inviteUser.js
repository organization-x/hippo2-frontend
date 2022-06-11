import {useState} from "react";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import validateEmail from "../../../validation/email";

function InviteUser({type, onBack}) {
	const [email, setEmail] = useState('');
	const [formErrors, setFormErrors] = useState({});

	const backButton = () => {
		onBack()
	}
	const onSubmit = () => {
		setFormErrors({});

		// ignore this line because we aren't doing anything with data yet, so the variable is unused
		// eslint-disable-next-line
		const [err, data] = validateEmail({email});
		if (err) {
			return setFormErrors(err);
		}

		// TODO: do something with data
	}
	const addStudent = () => {
		// called when the Add Another Student button is clicked
	}

	if (type === 'student') {
		return (
			<div className="container max-w-6xl flex flex-wrap mx-auto p-4 auth">
				<div className="flex-none md:flex-initial w-full md:w-7/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-5 text-center">Parent Account</h1>
					<p className="text-base mb-3">
						Fill out your parent or guardian's email to invite them to create their account profile so they can log in and access information, as well as other AI camp course resources! Select the bubble below to indicate that your parent or guardian already has an AI Camp account if that statement applies.
						<br/><br/>
						You can add multiple parent(s) or guardian(s) in your dashboard later.
					</p>
					<p className="text-lg">Click "Next" to proceed to your student dashboard!</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial relative w-full md:w-5/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-6 text-center">Invite your parent or guardian to create their AI Camp account.</h2>

					<Input label="Email"
						   type="text"
						   placeHolder="example@gmail.com"
						   className="mt-8 mb-16"
						   value={email}
						   isValid={formErrors.email?.length}
						   errorText={formErrors.email?.[0]}
						   onChange={val => setEmail(val)}
					/>

					<div className="flex">
						<Button bgColor="gray" txtColor="white" className="w-1/3 mx-2 py-1" onClick={() => backButton()}>Back</Button>
						<Button bgColor="green" txtColor="white" className="w-2/3 mx-2 py-1" onClick={() => onSubmit()}>Next</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
				<div className="flex-none md:flex-initial w-full md:w-5/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">Student Account(s)</h1>
					<p className="text-base mb-3">
						Fill out your student's personal details to invite them to create an account, which will allow them to access resources in preparation for their course(s).
					</p>
					<p className="text-base mb-3">
						If you would like to complete course registration for multiple students, click "Add Another Student" and fill out their personal details.
					</p>
					<p className="text-lg">
						Click "Next" to proceed to your parent dashboard!
					</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-6 text-center">Invite your student(s) to create their AI Camp account.</h2>

					<Input label="Email"
						   type="text"
						   placeHolder="example@gmail.com"
						   className="mt-8 mb-16 sm:mb-32"
						   value={email}
						   isValid={formErrors.email?.length}
						   errorText={formErrors.email?.[0]}
						   onChange={val => setEmail(val)}
					/>


					<div className="grid grid-cols-3 gap-y-4">
						<Button bgColor="white" txtColor="black" className="col-span-3 mx-2 py-3" onClick={() => addStudent()}>Add Another Student</Button>
						<Button bgColor="gray" txtColor="white" className="mx-2 py-1" onClick={() => backButton()}>Back</Button>
						<Button bgColor="green" txtColor="white" className="col-span-2 mx-2 py-1" onClick={() => onSubmit()}>Next</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default InviteUser;
