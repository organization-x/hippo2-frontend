import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import baseUrl from "../../apiUrls";
import sendReq from "../../services/sendReq";
import Input from "../../components/form/input";
import Button from "../../components/button/button";
import validatePassword from '../../validation/password';
import { useFlashMsg } from "../../services/flashMsg";


function ForgotPasswordConfirm() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { flashMsg } = useFlashMsg();
	const [search] = useSearchParams();
	const uid = search.get('uid');
	const token = search.get('token');


	const resetPassword = () => {
		const [err, data] = validatePassword(password);
		if (err) {
			//validate password
			setErrorMessage(err);
		}
		else if (password!==confirmPassword) { 
			//check if the 2 passwords match
			setErrorMessage('Passwords do not Match');
		}else if (uid && token) {
			//update password if we have uid and token
			setErrorMessage('');
			const url = baseUrl + '/auth/password/reset/confirm/';
			const options = {
				method: 'POST',
				body: {
					uid: uid,
					token: token,
					new_password1: data,
					new_password2: data
				}
			};
			sendReq(url, options).then(res => {
				flashMsg('success','Password Reset Successfully!');
			}).catch(err => {
				if (err.data?.message){
					return flashMsg('error',err.data.message);
				}
				flashMsg('error', 'Unable to connect to server');
			});	
		}else{
			// no UID or token but passwords are correct format
			setErrorMessage('');
			flashMsg('error', 'Error Resetting Password');
		}
	};

	return (
			<div className="container max-w-3xl flex flex-wrap mx-auto pt-11 auth px-3">
				<div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
					<h1 className="text-2xl mb-8 text-center">Password Reset</h1>
					<p className="text-base">Reset your password by entering your new password.</p>
					
					<p className="text-base pt-10">By logging into AI Camp, you agree to our&nbsp; 
						<a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="https://www.ai-camp.org/terms-of-service">Terms of Service</a> and&nbsp; 
						<a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="https://www.ai-camp.org/privacy-notice">Privacy Policy</a>.
					</p>
				</div>

				<div className="flex-none md:flex-initial w-full  md:w-3/5 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
					<h2 className="text-2xl mb-8 text-center font-semibold">Reset your password to continue your AI adventure with AI Camp.</h2>
					<form action="" method="post" onSubmit={e => e.preventDefault()}>
						<Input label="New Password"
							type="password"
							placeHolder="Password"
							className="mb-3"
							id="password"
							onChange={val => setPassword(val)} 
						/>
						<Input label="Confirm New Password"
							type="password"
							placeHolder="Confirm Password"
							className="mb-5 mt-5"
							onChange={val => setConfirmPassword(val)}
						/>
						<div className='pb-3'>
							{errorMessage && (<p className="error bg-red-100 border-l-4 border-red-500 text-red-700 p-4"> {errorMessage} </p>)}
						</div>
						<Button bgColor="green" txtColor="white" className="w-full py-1" onClick={() => resetPassword()}>Reset Password</Button>
					</form>
				</div>	
			</div>
		
	);
}

export default ForgotPasswordConfirm;
