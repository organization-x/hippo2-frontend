import { useState } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authentication';
import { googleSocialUrl } from '../../apiUrls';
import validateUserSignup from '../../validation/signup';
import formatApiErrors from '../../validation/formatApiErrors';
import Button from "../../components/button/button";
import Input from "../../components/form/input";
import './groupJoinSignup.css';
import baseUrl from "../../apiUrls";
import sendReq from "../../services/sendReq";


function GroupJoinSignup() {
    const [success, setSuccess] = useState(false);
	const [password, setPassword] = useState('');

	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [search] = useSearchParams();
	

	const token = search.get('token');
	const passwordResetToken = search.get('passwordresettoken');
	const userid = search.get('userid');

	const origin = location.state?.from?.pathname || '/';

	const joinUser = async () => {
		if (userid && passwordResetToken) {
			const url = baseUrl + '/auth/password/reset/confirm/';

			const options = {
				method: 'POST',
				body: {
					uid: userid,
					token: passwordResetToken,
					new_password1: password,
					new_password2: password
				}
			};

			await sendReq(url, options);

		    setSuccess(true);

            let emailUrl = baseUrl + '/api/v1/userinfo/getemail/' + userid + '/'

            let email = (await sendReq(emailUrl, {})).data.email

            await auth.handleLogin(email, password);
                
            if(token){
                const url = baseUrl + '/api/v1/group/join/';

		        const options = {
		        	method: 'POST',
		        	body: {
		        		token: token
		        	}
		        };

		        auth.autoAuthReq(url, options).then(res => {
		        	navigate('/');
		        });
            }
		}
	}

	return (
		<form action="" method="post" onSubmit={e => e.preventDefault()}>
			<label className="mx-3" htmlFor="newPassword">New password</label>
			<input 
				className="py-2 px-5"
				type="password" name="newPassword" id="newPassword" 
				value={password} onChange={e => setPassword(e.target.value)} 
			/>
			<button className="py-2 px-5 ml-5 bg-blue-400" onClick={() => joinUser()} >Reset Password</button>
			{success ? <h1>Password successfully reset</h1> : null}
		</form>
	)
}

export default GroupJoinSignup;
