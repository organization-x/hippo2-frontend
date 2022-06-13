import { useState, createContext, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sendReq from "./sendReq";
import baseUrl from "../apiUrls";

import Navbar from "../components/navbar/navbar";
import Loading from "../pages/loading/loading";

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
// routes that don't require check to see if user is authenticated
// prevents navigate from removing query string
const excludeChecks = [
	'/auth/google/', '/password/reset', '/password/reset/confirm'
];

const blankUser = {
	email: '',
	fName: '',
	lName: '',
	type: '', // parent || student,
	phone: '',
	dob: '',
	isInit: false,
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

	const autoAuthReq = useRef((url, options, redirect = null) => {
		return new Promise((resolve, reject) => {
			sendReq(
				url, options
			).then(res => {
				resolve(res);
			}).catch(err => {
				// redirect if unauthenticated
				if (err.status && [401, 403].includes(err.status)) {
					setUser(blankUser);
					navigate('/signup', { state: { from: { pathname: redirect } } });
				}
				reject(err);
			});
		});
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
		await sendReq(newUrl, newOptions);

		// update user's info (fname, lname, type)
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const updateOptions = {
			method: 'POST',
			body: {
				first_name: fName,
				last_name: lName,
				type: type
			}
		};
		const updateRes = await sendReq(userUrl, updateOptions);

		// set user's info on frontend
		setUser({
			email: email,
			fName: fName,
			lName: lName,
			type: type,
			phone: '',
			dob: '',
			isInit: false,
			isLoggedIn: true
		});

		navigate(redirect);
		return updateRes;
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
		await sendReq(lUrl, lOptions);

		// get user info
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const userRes = await sendReq(userUrl, { method: 'GET' });

		const data = userRes.data;
		setUser({
			email: data.email,
			fName: data.first_name || '',
			lName: data.last_name || '',
			type: data.user_type || '',
			phone: data.phone_number || '',
			dob: data.dob || '',
			isInit: data.is_initiated,
			isLoggedIn: true
		});

		navigate(redirect);
		return userRes;
	};

	// TODO: add state param to google redirect uri for redirect memory
	const handleGoogleLogin = async (code, redirect = '/') => {
		const url = baseUrl + '/api/v1/auth/google/';
		const options = {
			method: 'POST',
			body: { code: code }
		};
		// signup/login
		await sendReq(url, options);
		
		// get user info
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const userRes = await sendReq(userUrl, { method: 'GET' });

		const data = userRes.data;
		setUser({
			email: data.email,
			fName: data.first_name || '',
			lName: data.last_name || '',
			type: data.user_type || '',
			phone: data.phone_number || '',
			dob: data.dob || '',
			isInit: data.is_initiated,
			isLoggedIn: true
		});

		navigate(redirect);
		return userRes;
	};

	const handleLogout = async () => {
		const url = baseUrl + '/auth/logout/';
		const options = {
			method: 'POST',
			body: {}
		};
		const res = await sendReq(url, options);
		setUser(blankUser);

		navigate('/signup');
		return res;
	};

	const handleUserInitiation = async (email, fName, lName, type, dob, phoneNum, redirect = '/') => {
		const userUrl = baseUrl + '/api/v1/userinfo/';
		const updateOptions = {
			method: 'POST',
			body: {
				email: email,
				first_name: fName,
				last_name: lName,
				type: type,
				dob: dob,
				phone_number: phoneNum,
				initiate: true
			}
		};
		const res = await autoAuthReq(userUrl, updateOptions, redirect);

		// set user's info on frontend
		setUser({
			email: email,
			fName: fName,
			lName: lName,
			type: type,
			dob: dob,
			phone: phoneNum,
			isInit: true,
			isLoggedIn: true
		});

		return res;
	};

	useEffect(() => {
		if (excludeChecks.includes(location.pathname)) {
			return setCheckLogin(true);
		}
		const url = baseUrl + '/api/v1/userinfo/';
		const options = {
			method: 'GET'
		};
		let origin = location.pathname + location.search;
		if (excludeRedirects.includes(location.pathname)) {
			origin = '/';
		}
		autoAuthReq(url, options, origin).then(res => {
			setCheckLogin(true);
			const data = res.data;
			
			setUser({
				email: data.email,
				fName: data.first_name || '',
				lName: data.last_name || '',
				type: data.user_type || '',
				phone: data.phone_number || '',
				dob: data.dob || '',
				isInit: data.is_initiated,
				isLoggedIn: true
			});
			// redirect user away from signup/login 
			// if they're signed in already
			navigate(origin);
		}).catch(err => {
			setCheckLogin(true);
			// TODO: error handling for non-unauthenticated messages
		});
	}, [autoAuthReq, location, navigate]);

	const value = {
		user,
		autoAuthReq,
		handleSignup,
		handleLogin,
		handleGoogleLogin,
		handleLogout,
		handleUserInitiation
	};

	if (!checkLogin) {
		return (
			<AuthContext.Provider value={value}>
				<Navbar />
				<Loading />
			</AuthContext.Provider>
		);
	}
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}



