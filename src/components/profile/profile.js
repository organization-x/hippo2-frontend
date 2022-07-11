import { useState } from "react";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useAuth } from "../../services/authentication";
import { useFlashMsg } from "../../services/flashMsg";
import validateUserInformation from "../../validation/userInformation";
import formatApiErrors from "../../validation/formatApiErrors";
import Input from "../form/input";
import Button from "../button/button";
import 'react-phone-input-2/lib/style.css';
import './profile.css';

function Profile({
	fName, lName, email, dob, phone, type, className, id
}) {
	const [f, setF] = useState(fName);
	const [l, setL] = useState(lName);
	const e = email;
	const [d, setD] = useState(dob);
	const [p, setP] = useState(phone);
	const [formErrors, setFormErrors] = useState({});
	const [editing, setEditing] = useState(false);
	const { handleUserUpdate } = useAuth();
	const { flashMsg } = useFlashMsg();
	const location = useLocation();

	const header = type === 'PARENT' ? 'Parent Profile' : 'Student Profile';

	const onSubmit = () => {
		setFormErrors({});
		const rawData = {
			fName: f,
			lName: l,
			email: e,
			type: type,
			phone: p
		};
		if (type !== 'PARENT') {
			rawData.dob = d;
		}
		const [err, data] = validateUserInformation(rawData, type);
		if (err) {
			return setFormErrors(err);
		}
		handleUserUpdate(
			data.fName, data.lName, data.dob,
			data.phone, false, id, location.pathname
		).then(res => {
			flashMsg('success', `Updated ${data.fName}'s profile`);
			setEditing(false);
		}).catch(err => {
			if (err.status === 400) {
				const keyMap = {
					'first_name': 'fName',
					'last_name': 'lName',
					'phone_number': 'phone'
				};
				setFormErrors(formatApiErrors(err.data, keyMap));
			} else if (err.data?.message) {
				flashMsg('error', err.data.message);
			} else {
				flashMsg('error', 'Something went wrong');
			}
		});
	};

	return (
		<form action="/" method="GET" onSubmit={event => {
            event.preventDefault();
        }} className={`flex flex-col py-5 px-12 bg-white rounded-2xl ${className}`}>
			<div className="grow">
				<h2 className="text-xl mb-7 text-center">{header}</h2>
				<Input label="First Name"
					type="text"
					placeHolder={editing ? 'John' : ''}
					className="mb-3" 
					value={f}
					isValid={formErrors.fName?.length}
					errorText={formErrors.fName?.[0]}
					onChange={val => setF(val)}
					readOnly={!editing}    
				/>
				<Input label="Last Name"
					type="text"
					placeHolder={editing ? 'Doe' : ''}
					className="mb-3"
					value={l}
					isValid={formErrors.lName?.length}
					errorText={formErrors.lName?.[0]}
					onChange={val => setL(val)}
					readOnly={!editing}    
				/>
				<Input label="Email"
					type="text"
					className="mb-3"
					value={e}
					readOnly   
				/>

				<label className={`form-label`}>Mobile Phone Number</label>
				<PhoneInput 
					specialLabel="Phone Number"
					enableSearch
					countryCodeEditable={false}
					inputClass={!editing && 'readonly'}
					buttonClass={!editing && 'hidden'}
					country={'us'}
					disableSearchIcon
					disabled={!editing}    
					value={p}
					onChange={value => {
						setP(value);
					}}
					isValid={() => !formErrors.phone?.length}
				/>
				{
					formErrors.phone?.length ? 
						<span className='mt-1 block form-error text-sm'>{formErrors.phone[0]}</span> 
					: null
				}
				{type !== 'PARENT' ?
					<Input label="Birth Month and Year"
						type="text"
						placeHolder={editing ? 'MM/YYYY' : ''}
						value={d}
						isValid={formErrors.dob?.length}
						errorText={formErrors.dob?.[0]}
						onChange={val => setD(val)}
						className="mt-3"
						readOnly={!editing}    
					/>
				: null
				}

			</div>
			<Button 
				bgColor='white'
				txtColor='black'
				className={`w-full py-1 mt-5 grow-0`}
				onClick={() => { 
					if (editing) { 
						onSubmit();
					} else {
						setEditing(true);
					} 
				}}
			>
				{editing ? "Save" : "Edit Profile"}
			</Button>
        </form>
	);
}

export default Profile;
