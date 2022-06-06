import { useState } from "react";
import baseUrl from "../../apiUrls";
import sendReq from "../../services/sendReq";

function ForgotPassword() {
	const [sent, setSent] = useState(false);
	const [email, setEmail] = useState('');

	const sendResetEmail = (email) => {
		const url = baseUrl + '/auth/password/reset/';
		const options = {
			method: 'POST',
			body: { email: email }
		};
		sendReq(url, options).then( _ => setSent(true));
	}

	let content;
	if (sent) {
		content = (
			<h1>Reset confirmation link has been sent to your email.</h1>
		);
	} else {
		content = (
			<form action="" method="post" onSubmit={e => e.preventDefault()}>
				<label className="mx-3" htmlFor="email">Email</label>
				<input 
					className="py-2 px-5"
					type="email" name="email" id="email" 
					value={email} onChange={e => setEmail(e.target.value)} 
				/>
				<button className="py-2 px-5 ml-5 bg-green-400" onClick={() => sendResetEmail(email)} >Reset Password</button>
			</form>
		);
	}

	return content;
}

export default ForgotPassword;
