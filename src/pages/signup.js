import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../services/authentication';
import baseUrl, { googleSocialUrl } from '../apiUrls';
import sendReq from '../services/sendReq';

function Signup() {
	const [res, setRes] = useState(null);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const auth = useAuth();
	const location = useLocation();

	const origin = location.state?.from?.pathname || '/';

	const userUrl = baseUrl + '/auth/user/';
	const vTokenUrl = baseUrl + '/auth/token/verify/';
	const rTokenUrl = baseUrl + '/auth/token/refresh/';

	const testUser = () => {
		sendReq(userUrl, { method: 'GET' }).then(data => setRes(data));
	}

	const logoutUser = () => {
		auth.handleLogout();
	}

	const signUpUser = () => {
		auth.handleSignup(email, password, origin).then(res => {
			if (res.error) {
				setRes(res);
			}
		});;
	}

	const loginUser = () => {
		auth.handleLogin(email, password, origin).then(res => {
			if (res.error) {
				setRes(res);
			}
		});
	}

	const verifyToken = () => {
		const options = {
			method: 'POST',
			body: {}
		}
		sendReq(vTokenUrl, options).then(data => setRes(data));
	}
	const refreshToken = () => {
		const options = {
			method: 'POST',
			body: {}
		}
		sendReq(rTokenUrl, options).then(data => setRes(data));
	}

	return (
		<form className="mt-10" action="/" method="get">
			<label htmlFor="email">Email</label>
			<input className="mx-3 p-1 border-solid border-2 border-slate-700" type="text" id="email" 
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="password">Password</label>
			<input className="mx-3 p-1 border-solid border-2 border-slate-700" type="text" id="password" 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="bg-green-500 p-1" type="button"
				onClick={() => signUpUser()}
			>Sign Up</button>
			<button className="bg-red-400 p-1" type="button"
				onClick={() => loginUser()}
			>Login</button>
			<a className="text-blue-500 hover:text-blue-300 mx-3"
				href={googleSocialUrl}
			>Connect with Google</a>
			<button className="bg-blue-500 p-1" type="button" 
				onClick={() => testUser()}>Test User</button>
			<button className="bg-purple-500 p-1" type="button" 
				onClick={() => logoutUser()}>Logout User</button>
			<button className="bg-yellow-500 p-1 ml-3" type="button" 
				onClick={() => verifyToken()}>Verify Token</button>
			<button className="bg-red-400 p-1" type="button" 
				onClick={() => refreshToken()}>Refresh Token</button>
			<div className="results mt-5">
				{JSON.stringify(res, null, '\t')}
			</div>
		</form>
	)
}

export default Signup;
