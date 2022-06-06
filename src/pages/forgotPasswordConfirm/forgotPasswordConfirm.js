import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import baseUrl from "../../apiUrls";
import sendReq from "../../services/sendReq";

function ForgotPasswordConfirm() {
	const [success, setSuccess] = useState(false);
	const [password, setPassword] = useState('');
	const [search] = useSearchParams();
	const uid = search.get('uid');
	const token = search.get('token');

	const resetPassword = () => {
		if (uid && token) {
			const url = baseUrl + '/auth/password/reset/confirm/';
			const options = {
				method: 'POST',
				body: {
					uid: uid,
					token: token,
					new_password1: password,
					new_password2: password
				}
			};
			sendReq(url, options).then(res => {
				setSuccess(true);
			});
		}
	};

	return (
		<form action="" method="post" onSubmit={e => e.preventDefault()}>
			<label className="mx-3" htmlFor="newPassword">New password</label>
			<input 
				className="py-2 px-5"
				type="password" name="newPassword" id="newPassword" 
				value={password} onChange={e => setPassword(e.target.value)} 
			/>
			<button className="py-2 px-5 ml-5 bg-blue-400" onClick={() => resetPassword()} >Reset Password</button>
			{success ? <h1>Password successfully reset</h1> : null}
		</form>
	);
}

export default ForgotPasswordConfirm;
