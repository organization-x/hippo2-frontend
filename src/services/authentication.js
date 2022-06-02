import { useState, createContext, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sendReq from "./sendReq";
import baseUrl from "../apiUrls";

import Navbar from "../components/navbar/navbar";
import Loading from "../pages/loading";

/**
 * ==============================================
 * Provides abstractified auth methods
 * useAuth() 	- returns react context with auth methods
 * AuthProvider	- component wrapper that provides auth context
 *
 * METHODS
 * user					- object with user info
 * handleLogin()		- logins user (redirects to '/' or custom)
 * handleGoogleLogin()	- logins user with Google (redirects to '/' or custom)
 * handleSignup()		- registers user (redirects to '/' or custom)
 * handleLogout()		- logouts user (redirects to '/' or custom)
 * autoAuthReq()		- sendReq wrapper that refreshes token or 
 *					  	  redirects to signup page as necessary
 * ==============================================
 */

const AuthContext = createContext();
// so that app does not redirect user back to login after login
const excludeRedirects = [
	'/signup', '/login'
];

const blankUser = {
	email: '',
	fName: '',
	lName: '',
	type: '', // parent || student
	isLoggedIn: false
};

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(blankUser);
	const [checkLogin, setCheckLogin] = useState(false);
	const navigate = useRef(useNavigate()).current;
	const location = useRef(useLocation()).current;

	const autoAuthReq = useRef(async (url, options, redirect = null) => {
		const res = await sendReq(url, options);

		// unauthenticated
		if ([401, 403].includes(res.status)) {
			setUser(blankUser);
			navigate('/signup', { state: { from: { pathname: redirect } } });
		}
		return res;
	}).current;

	const handleSignup = async (email, fName, lName, type, password, redirect = '/') => {
		const newUrl = baseUrl + '/auth/registration/';
		const newOptions = {
			method: 'POST',
			body: {
				email: email,
				password1: password,
				password2: password
			}
		};
		// signup user
		const newRes = await sendReq(newUrl, newOptions);
		if (newRes.error) {
			return newRes;
		}

		// update user's info (fname, lname, type)
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const updateOptions = {
			method: 'POST',
			body: {
				first_name: fName,
				last_name: lName
				// TODO: add type later
			}
		};
		const updateRes = await sendReq(userUrl, updateOptions);
		if (updateRes.error) {
			return updateRes;
		}

		// set user's info on frontend
		setUser({
			email: email,
			fName: fName,
			lName: lName,
			type: type,
			isLoggedIn: true
		});

		navigate(redirect);
		return newRes;
	};

	const handleLogin = async (email, password, redirect = '/') => {
		const lUrl = baseUrl + '/auth/login/';
		const lOptions = {
			method: 'POST',
			body: {
				email: email,
				password: password
			}
		};
		// login
		const lRes = await sendReq(lUrl, lOptions);
		if (lRes.error) {
			return lRes;
		}
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const userOptions = { method: 'GET' };
		const userRes = await sendReq(userUrl, userOptions);
		if (userRes.error) {
			return userRes;
		}
		const data = userRes.data;
		setUser({
			email: data.email,
			fName: data.first_name,
			lName: data.last_name,
			type: data.user_type,
			isLoggedIn: true
		});

		navigate(redirect);
		return userRes;
	};
	// TODO: add state param to google redirect uri for redirect memory
	const handleGoogleLogin = async (code, redirect = '/') => {
		const url = baseUrl + '/auth/google/';
		const options = {
			method: 'POST',
			body: { code: code }
		};
		const res = await sendReq(url, options);
		if (!res.error) {
			const data = res.data;
			setUser({
				email: data.user.email,
				fName: data.user.first_name,
				lName: data.user.last_name,
				isLoggedIn: true
			});
			navigate(redirect);
		}
		return res;
	};

	const handleLogout = async () => {
		const url = baseUrl + '/auth/logout/';
		const options = {
			method: 'POST',
			body: {}
		};
		const res = await sendReq(url, options);
		if (!res.error) {
			setUser({
				email: '',
				fName: '',
				lName: '',
				isLoggedIn: false
			});
			navigate('/signup');
		}
		return res;
	};

	useEffect(() => {
		if (location.pathname === '/auth/google/') {
			return setCheckLogin(true);
		}
		const url = baseUrl + '/api/v1/userinfo/';
		const options = {
			method: 'GET'
		};
		let origin = location.pathname;
		if (excludeRedirects.includes(location.pathname)) {
			origin = '/';
		}
		autoAuthReq(url, options, origin).then(res => {
			setCheckLogin(true);
			if (!res.error) {
				const data = res.data;
				console.log(data);
				setUser({
					email: data.email,
					fName: data.first_name,
					lName: data.last_name,
					type: data.user_type,
					isLoggedIn: true
				});
				// redirect user away from signup/login 
				// if they're signed in already
				navigate(origin);
			}
			// TODO: error handling
		}).catch(err => {
			// TODO: error handling pt 2.
		});
	}, [autoAuthReq, location, navigate]);

	const value = {
		user,
		autoAuthReq,
		handleSignup,
		handleLogin,
		handleGoogleLogin,
		handleLogout
	};

	if (!checkLogin) {
		return (
			<>
				<Navbar />
				<Loading />
			</>
		);
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}



