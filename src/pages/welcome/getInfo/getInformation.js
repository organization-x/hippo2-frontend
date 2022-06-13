import { useState } from "react";
import { useLocation } from "react-router-dom";
import validateUserInformation from "../../../validation/userInformation";
import formatApiErrors from "../../../validation/formatApiErrors";
import { useAuth } from "../../../services/authentication";
import PhoneInput from "react-phone-input-2";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './getInformation.css';

function GetInformation({onBack, onNext}) {
	const {user, handleUserInitiation} = useAuth();
	const location = useLocation();

	const [firstName, setFirstName] = useState(user.fName);
	const [lastName, setLastName] = useState(user.lName);
	const [email, setEmail] = useState(user.email);
	const [type, setType] = useState(user.type);
	const [birthday, setBirthday] = useState(user.dob);
	const [phone, setPhone] = useState(user.phone);
	const [formErrors, setFormErrors] = useState({});
	
	const onSubmit = () => {
		// executes when the Next button is clicked or when form is submitted
		setFormErrors({});
		const info = {
			firstName,
			lastName,
			email,
			type,
			phone
		};
		if (type !== 'parent') {
			info.dob = birthday;
		}

		const [err, data] = validateUserInformation(info, type);
		if (err) {
			return setFormErrors(err);
		}

		handleUserInitiation(
			data.email, data.firstName, data.lastName, data.type, data.dob, data.phone, location.pathname
		).then(res => {
			onNext();
		}).catch(err => {
			if (err.status === 400) {
				const keyMap = {
					'first_name': 'firstName',
					'last_name': 'lastName',
					'phone_number': 'phone'
				};
				setFormErrors(formatApiErrors(err.data, keyMap));
			}
		});

	}
	const backButton = () => {
		// executes when the Back button is clicked
		onBack()
	}

	return (
		<div>
			<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">Account Logistics</h1>
					<p className="text-base mb-3">
						Fill out your personal details to create your account profile!<br /><br />Some items may be pre-filled, so feel free to make edits to ensure that the information is accurate.
					</p>
					<p className="text-base">
						Click "Next" to move onto the {type === 'student' ? 'parent' : 'student'} information section!
					</p>
				</div>
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial w-full md:w-3/5 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-xl mb-7 text-center">Gain real experience by building real AI products. We are here to support you.</h2>
					<div className="flex items-center justify-center">
						<div className="mx-auto inline-block">
							<Button 
								bgColor={type === 'student' ? 'black' : 'white'} 
								txtColor={type === 'student' ? 'white' : 'black'}
								onClick={() => setType('student')}
								className="w-28 md:w-36 mx-2 p-1"
							>
								Student
							</Button>
							<Button 
								bgColor={type === 'parent' ? 'black' : 'white'} 
								txtColor={type === 'parent' ? 'white' : 'black'}
								onClick={() => setType('parent')}
								className="w-28 md:w-36 mx-2 p-1"
							>
								Parent
							</Button>
						</div>
					</div>
					{
						formErrors.type?.length ? 
							<span className='mt-3 block text-center form-error'>{formErrors.type[0]}</span> 
						: 
							null
					}
					<div className="mb-8 mt-5">
						<Input label="First Name"
							type="text"
							placeHolder="John"
							className="mb-3"
						    value={firstName}
						    isValid={formErrors.firstName?.length}
						    errorText={formErrors.firstName?.[0]}
							onChange={val => setFirstName(val)}
						/>
						<Input label="Last Name"
						    type="text"
						    placeHolder="Doe"
						    className="mb-3"
						    value={lastName}
						    isValid={formErrors.lastName?.length}
						    errorText={formErrors.lastName?.[0]}
						    onChange={val => setLastName(val)}
						/>
						<Input label="Email"
							type="email"
							placeHolder="example@gmail.com"
							className="mb-3"
						    value={email}
						    isValid={formErrors.email?.length}
						    errorText={formErrors.email?.[0]}
							onChange={val => setEmail(val)}
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
						{type !== 'parent' &&
							<Input label="Birth Month and Year"
							   type="text"
							   placeHolder="MM/YYYY"
							   value={birthday}
							   isValid={formErrors.dob?.length}
							   errorText={formErrors.dob?.[0]}
							   onChange={val => setBirthday(val)}
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
		</div>
	)
}

export default GetInformation;
