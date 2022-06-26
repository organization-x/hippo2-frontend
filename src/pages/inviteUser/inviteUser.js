import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../services/authentication";
import validateUserInformation from "../../validation/userInformation";
import formatApiErrors from "../../validation/formatApiErrors";

import PhoneInput from "react-phone-input-2";
import Input from "../../components/form/input";
import Button from "../../components/button/button";

import 'react-phone-input-2/lib/style.css';
import './inviteUser.css';

function InviteUser() {
	const { user, handleUserInvite } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState('');
	const [fName, setFName] = useState('');
	const [lName, setLName] = useState('');
	// users can only invite opposite type users currently
	const type = user.type === 'student' ? 'parent' : 'student';
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');

	const [formErrors, setFormErrors] = useState({});

	const origin = location.state?.from?.pathname || '/';
	const here = location.pathname;

	const backButton = () => {
		// return to confirm your details page
		navigate('/details', { state: { from: { pathname: location.pathname + location.search } } });
	};

	const onSubmit = () => {
		setFormErrors({});
		const [err, vData] = validateUserInformation({
			email,
			fName,
			lName,
			type,
			phone,
			dob
		});
		if (err) {
			return setFormErrors(err);
		}

		// send invite
		handleUserInvite(
			vData.email, vData.fName, vData.lName, vData.type, 
			vData.phone, vData.dob, here
		).then(res => {
			navigate(origin);
		}).catch(err => {
			if(err.status === 400) {
				const keyMap = {
					'first_name': 'fName',
					'last_name': 'lName',
					'phone_number': 'phone'
				};
				setFormErrors(formatApiErrors(err.data, keyMap));
			}
		});
	};

	let panelText;
	let formTitle;
	if (type === 'student') {
		panelText = (
			<>
				<h1 className="text-2xl mb-5 text-center">Parent Or Guardian Details</h1>
				<p className="text-base mb-3">
					Fill out your parent or guardian's personal details to create their account profile and invite them to log in so they access information, as well as other AI Camp course resources!
				</p>
			</>
		);
		formTitle = 'Invite your parent or guardian to create their AI Camp account.';
	} else {
		panelText = (
			<>
				<h1 className="text-2xl mb-5 text-center">Student Details</h1>
				<p className="text-base mb-3">
					Fill out your student's email to invite them to create an account, which will allow them to access resources in preparation for their course(s).
				</p>
			</>
		);
		formTitle = 'Invite your student to create their AI Camp account.';
	}

	

	return (
		<div className="container max-w-6xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-7/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				{panelText}
				<p className="text-lg">Click "Next" to move onto the payment stage!</p>
			</div>
			<form action="/" method="GET" onSubmit={event => {
				event.preventDefault();
			}} className="flex-none md:flex-initial relative w-full md:w-5/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl text-center">
					{formTitle}
				</h2>
				<div className="mb-8 mt-6">
					<Input label="Email"
						type="email"
						placeHolder="example@gmail.com"
						className="mb-3"
						value={email}
						isValid={formErrors.email?.length}
						errorText={formErrors.email?.[0]}
						onChange={val => setEmail(val)}
					/>
					<Input label="First Name"
						type="text"
						placeHolder="John"
						className="mb-3"
						value={fName}
						isValid={formErrors.fName?.length}
						errorText={formErrors.fName?.[0]}
						onChange={val => setFName(val)}
					/>
					<Input label="Last Name"
						type="text"
						placeHolder="Doe"
						className="mb-3"
						value={lName}
						isValid={formErrors.lName?.length}
						errorText={formErrors.lName?.[0]}
						onChange={val => setLName(val)}
					/>
					<label className="form-label mb-1">Mobile Phone Number</label>
					<PhoneInput 
						specialLabel="Phone Number"
						enableSearch
						countryCodeEditable={false}
						country={'us'}
						disableSearchIcon
						value={phone}
						onChange={value => {
							setPhone(value);
						}}
						isValid={() => {
							return !formErrors.phone?.length;
						}}
					/>
					{
						formErrors.phone?.length ? 
							<span className='mt-1 block form-error text-sm'>{formErrors.phone[0]}</span> 
						: 
							null
					}
					{type === 'student' &&
						<Input label="Birth Month and Year"
							type="text"
							placeHolder="MM/YYYY"
							value={dob}
							isValid={formErrors.dob?.length}
							errorText={formErrors.dob?.[0]}
							onChange={val => setDob(val)}
							className='mt-3'
						/>
					}
				</div>

				<div className="flex">
					<Button bgColor="gray" txtColor="white" className="w-1/3 mx-2 py-1" onClick={() => backButton()}>Back</Button>
					<Button bgColor="green" txtColor="white" className="w-2/3 mx-2 py-1" onClick={() => onSubmit()}>Next</Button>
				</div>
			</form>
		</div>
	);
}

export default InviteUser;