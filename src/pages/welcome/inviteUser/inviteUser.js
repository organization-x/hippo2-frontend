import {useState} from "react";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import validateEmail from "../../../validation/email";
import { useAuth } from "../../../services/authentication";
import baseUrl from "../../../apiUrls";
import { useNavigate } from "react-router-dom";

function InviteUser({type, onBack}) {
	const { autoAuthReq } = useAuth();
	const navigate = useNavigate();
	const [emails, setEmails] = useState(['']);
	const [formErrors, setFormErrors] = useState([]);
	const [processing, setProcessing] = useState(false);

	const backButton = () => {
		onBack();
	};

	const onSubmit = () => {
		const errors = [];
		const validEmails = [];
		let hasError = false;
		
		for (let i = 0; i < emails.length; i++) {
			const optional = i > 0;
			if (emails[i] === '' && optional) {
				errors.push([]);
				continue;
			}
			const [err, data] = validateEmail({ email: emails[i] });
			if (err) {
				hasError = true;
				errors.push(err.email);
			} else {
				if (!validEmails.includes(data.email)) {
					validEmails.push(data.email);
				}
				errors.push([]);
			}
		}
		setFormErrors(errors);
		if (!hasError) {
			const url = baseUrl + '/api/v1/group/invite/';
			setProcessing(true);
			for (let i = 0; i < validEmails.length; i++) {
				const options = {
					method: 'POST',
					body: {
						email: validEmails[i]
					}
				};
				autoAuthReq(url, options).then(res => {
					if (i === validEmails.length - 1) {
						setProcessing(false);
						navigate('/');
					}
				});
			}
		}
	};

	const addStudent = () => {
		// called when the Add Another Student button is clicked
		setEmails([...emails, '']);
	};

	const removeStudent = () => {
		if (emails.length > 1) {
			const newEmails = Array.from(emails);
			newEmails.pop();
			setEmails(newEmails);
		}
	};

	const emailInputs = [];
	for (let i = 0; i < emails.length; i++) {
		emailInputs.push(
			<Input 
				label={`${i > 0 ? 'Additional ' : ''}Email`}
				type='text'
				placeHolder='example@gmail.com'
				className='my-3'
				key={i.toString()}
				value={emails[i]}
				onChange={(value) => {
					const newEmails = Array.from(emails);
					newEmails[i] = value;
					setEmails(newEmails);
				}}
				isValid={formErrors[i]?.length}
				errorText={formErrors[i]?.[0]}
			/>
		);
	}

	if (type === 'student') {
		return (
			<div className="container max-w-6xl flex flex-wrap mx-auto p-4 auth">
				<div className="flex-none md:flex-initial w-full md:w-7/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-5 text-center">Parent Account</h1>
					<p className="text-base mb-3">
						Fill out your parent or guardian's email to invite them to create their account profile so they can log in and access information, as well as other AI camp course resources!
					</p>
					<p className="text-base my-5">
						You can add multiple parent(s) or guardian(s) in your dashboard later.
					</p>
					<p className="text-lg">Click "Next" to proceed to your student dashboard!</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial relative w-full md:w-5/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-6 text-center">Invite your parent or guardian to create their AI Camp account.</h2>

					{emailInputs}

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
						If you would like to complete course registration for multiple students, click "Add Another Student" and fill out their email.
					</p>
					<p className="text-lg">
						Click "Next" to proceed to your parent dashboard!
					</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-6 text-center">Invite your student(s) to create their AI Camp account.</h2>

					{emailInputs}

					<div className="grid grid-cols-3 gap-y-5 mt-20">
						<Button bgColor="white" disabled={processing} txtColor="black" className="col-span-3 mx-2 py-3" onClick={() => addStudent()}>Add Another Student</Button>
						{
							emails.length > 1 ? 
								<Button bgColor="white" disabled={processing} txtColor="black" className="col-span-3 mx-2 py-3" onClick={() => removeStudent()}>Remove a Student</Button>
							: null
						}
						<Button bgColor="gray" disabled={processing} txtColor="white" className="mx-2 py-1" onClick={() => backButton()}>Back</Button>
						<Button bgColor="green" disabled={processing} txtColor="white" className="col-span-2 mx-2 py-1" onClick={() => onSubmit()}>{processing ? 'Loading...' : 'Next'}</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default InviteUser;
