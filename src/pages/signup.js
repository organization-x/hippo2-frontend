import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../services/authentication';
import baseUrl from '../baseUrl';
import sendReq from '../services/sendReq';

function Signup() {
	const [res, setRes] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const auth = useContext(AuthContext);
	const location = useLocation();

	const origin = location.state.from.pathname || '/';

	const userUrl = baseUrl + '/auth/user/';
	const signUpUrl = baseUrl + '/auth/registration/';
	const vTokenUrl = baseUrl + '/auth/token/verify/';
	const rTokenUrl = baseUrl + '/auth/token/refresh/';

	const testUser = () => {
		sendReq(userUrl, { method: 'POST' }).then(data => setRes(data));
	}

	const logoutUser = () => {
		auth.handleLogout();
	}

	const signUpUser = () => {
		const body = {
			username: username,
			password1: password,
			password2: password,
			email: email
		};
		const options = {
			method: 'POST',
			body: body
		};
		sendReq(signUpUrl, options).then(data => setRes(data));
	}

	const loginUser = () => {
		auth.handleLogin(email, username, password, origin);
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
			<label htmlFor="email">Username</label>
			<input className="mx-3 p-1 border-solid border-2 border-slate-700" type="text" id="email" 
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
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
				target='_blank'
				rel="noreferrer"
				href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8000/auth/google/&prompt=consent&response_type=code&client_id=306664220522-n9okltev4f4ehokm23k4ddiom4lk051b.apps.googleusercontent.com&scope=openid%20email%20"
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
