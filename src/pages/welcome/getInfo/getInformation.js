import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import { useState } from "react";
import validateUserInformation from "../../../validation/userInformation";
import sendReq from "../../../services/sendReq";
import baseUrl from "../../../apiUrls";
import {useAuth} from "../../../services/authentication";

function GetInformation({type, onBack, onNext}) {
	const auth = useAuth()
	const user = auth.user

	const [firstName, setFirstName] = useState(user.fName);
	const [lastName, setLastName] = useState(user.lName);
	const [email, setEmail] = useState(user.email);
	const [birthday, setBirthday] = useState('');
	const [phone, setPhone] = useState('');
	const [formErrors, setFormErrors] = useState({});

	const onSubmit = () => {
		// executes when the Next button is clicked or when form is submitted
		setFormErrors({});
		const info = {
			firstName,
			lastName,
			email,
			phone
		}
		if (user.type === 'student') {
			info.dob = birthday
		}

		const [err, data] = validateUserInformation(info, user.type);
		if (err) {
			return setFormErrors(err);
		}
		sendReq(baseUrl + '/api/v1/userinfo/', {
			method: 'POST',
			body: {
				first_name: data.firstName,
				last_name: data.lastName,
				dob: type === 'student' ? data.dob : undefined,
				email: data.email
				// TODO: add phone number when backend supports updating it
			}
		}).then(() => {
			onNext()
		}).catch(e => {
			console.error(e)
		})
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

					<div className="mb-8">
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
						<Input label="Mobile Phone Number"
							type="text"
						    placeHolder="(415) 123-4567"
						    className="mb-3"
						    value={phone}
						    isValid={formErrors.phone?.length}
						    errorText={formErrors.phone?.[0]}
						    onChange={val => setPhone(val)}
						/>
						{type === 'student' &&
							<Input label="Date of Birth"
							   type="text"
							   placeHolder="MM/DD/YYYY"
							   value={birthday}
							   isValid={formErrors.dob?.length}
							   errorText={formErrors.dob?.[0]}
							   onChange={val => setBirthday(val)}
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
