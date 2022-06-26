import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import baseUrl from "../../apiUrls";
import validatePassword from "../../validation/password";
import { useAuth } from "../../services/authentication";
import sendReq from "../../services/sendReq";

import Loading from "../loading/loading";
import Button from "../../components/button/button";
import Input from "../../components/form/input";

function SignUpInvite() {
	const [data, setData] = useState({
		invite_to: {},
		invited_by: {}
	});
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(true);
	const [formErrors, setFormErrors] = useState('');
	const [search] = useSearchParams();
	const { handleLogin } = useAuth();
	const resetToken = search.get('resettoken');
	const inviteToken = search.get('invitetoken');

	useEffect(() => {
		if (!resetToken || !inviteToken) {
			// TODO: error handling
			return;
		}
		// get invite information
		const url = baseUrl + `/api/v1/group/invite/${inviteToken}/`;
		sendReq(url, {method: 'GET'}).then(res => {
			setData(res.data);
			setLoading(false);
		});
	}, [resetToken, inviteToken]);

	const setupUser = () => {
		setFormErrors({});
		const [err, vPassword] = validatePassword(password);
		if (err) {
			return setFormErrors(err);
		}
		// set user password
		const url = baseUrl + '/auth/password/reset/confirm/';
		const options = {
			method: 'POST',
			body: {
				uid: data.invite_to.id,
				token: resetToken,
				new_password1: vPassword,
				new_password2: vPassword
			}
		};
		(async () => {
			await sendReq(url, options);
			// login user
			await handleLogin(data.invite_to.email, vPassword, '/');
		})().catch(err => {
			// TODO: handle error
		});
	};

	if (loading) {
		return <Loading/>;
	}

	const formTitle = `
		Your ${data.invited_by.type === 'STUDENT' ? 'student': 'parent or guardian'}, 
		${data.invited_by.first_name}, has invited you to create a 
		${data.invite_to.type === 'STUDENT' ? 'student' : 'parent'} account.
	`;

	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-5/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Create an Account</h1>
				<p className="text-base mb-3">
					AI Camp teaches future leaders about coding, AI, how to learn, and how to work through creating impressive AI products and tech internships.
				</p>

				<p className="text-base mb-3">
					By creating AI products, our students apply what they have learned through first-hand experience of being an engineer, a product manager, or a data scientist.
				</p>

				<p className="text-base mb-3">
					Ready to start your AI journey? Our world class mentors and instructors are here to guide you!
				</p>

				<p className="text-base">
					By signing up for AI Camp, you agree to our <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Terms of Service</a> and <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Privacy Policy</a>.
				</p>
			</div>

			<form action="/" method="GET" onSubmit={event => {
				event.preventDefault();
			}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">
					{formTitle}
				</h2>
				<Input label="Email"
					type="email"
					className="mb-3"
					id="email"
					value={data.invite_to.email}
					readOnly
					onChange={() => {}}
				/>
				<Input label="Password"
					type="password"
					placeHolder="JohnDoePassword"
					className="mb-3"
					id="password"
					isValid={formErrors}
					errorText={formErrors}
					onChange={val => setPassword(val)}
				/>

				<Button bgColor="green" txtColor="white" className="w-full my-1 py-1 mx-auto block text-center" onClick={() => setupUser()}>Next</Button>
			</form>
		</div>
	);
}

export default SignUpInvite;
