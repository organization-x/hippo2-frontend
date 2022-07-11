import { useState, createContext, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
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
	'/auth/google/', '/password/reset', '/password/reset/confirm', '/signup/invite', '/courses'
];

const blankUser = {
	id: '',
	email: '',
	fName: '',
	lName: '',
	type: '', // parent || student,
	phone: '',
	dob: '',
	filledDetails: false,
	filledInvite: false,
	passwordSet: false,
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

	const autoAuthReq = useRef((url, options, redirect = null) => (
		new Promise((resolve, reject) => {
			sendReq(
				url, options
			).then(res => {
				resolve(res);
			}).catch(err => {
				// redirect if unauthenticated
				if (err.status && [401, 403].includes(err.status)) {
					setUser(blankUser);
					navigate('/signup', { state: { from: { pathname: redirect }}});
				}
				reject(err);
			});
		})
	)).current;

	const handleSignup = async (email, type, password, redirect = '/') => {
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

		// update user's info (type)
		const userUrl = baseUrl + '/api/v1/users/';
		const updateOptions = {
			method: 'POST',
			body: {
				type: type
			}
		};
		const updateRes = await sendReq(userUrl, updateOptions);
		const data = updateRes.data;
		// set user's info on frontend
		setUser({
			id: data.id,
			email: data.email,
			fName: data.first_name || '',
			lName: data.last_name || '',
			type: data.type || '',
			phone: data.phone_number || '',
			dob: data.dob || '',
			filledDetails: data.filled_details,
			filledInvite: data.filled_invite,
			passwordSet: data.password_set,
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
		const userUrl = baseUrl + '/api/v1/users/';
		const userRes = await sendReq(userUrl, { method: 'GET' });

		const data = userRes.data;
		setUser({
			id: data.id,
			email: data.email,
			fName: data.first_name || '',
			lName: data.last_name || '',
			type: data.type || '',
			phone: data.phone_number || '',
			dob: data.dob || '',
			filledDetails: data.filled_details,
			filledInvite: data.filled_invite,
			passwordSet: data.password_set,
			isLoggedIn: true
		});

		navigate(redirect);
		return userRes;
	};

	const handleGoogleLogin = async (code, type = null, redirect = '/') => {
		const loginUrl = baseUrl + '/api/v1/auth/google/';
		const loginOptions = {
			method: 'POST',
			body: { 
				code: code 
			}
		};
		if (type) {
			loginOptions.body.type = type;
		}
		// signup/login
		const loginRes = await sendReq(loginUrl, loginOptions);

		// get user info
		const infoUrl = baseUrl + '/api/v1/users/';
		const infoRes = await sendReq(infoUrl, { method: 'GET' });

		const data = infoRes.data;
		setUser({
			id: data.id,
			email: data.email,
			fName: data.first_name || '',
			lName: data.last_name || '',
			type: data.type || '',
			phone: data.phone_number || '',
			dob: data.dob || '',
			filledDetails: data.filled_details,
			filledInvite: data.filled_invite,
			passwordSet: data.password_set,
			isLoggedIn: true
		});

		navigate(redirect);
		return loginRes;
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

	const handleUserUpdate = async (fName, lName, dob, phoneNum, init, id, redirect = '/') => {
		const userUrl = baseUrl + `/api/v1/users/${id}/`;
		const updateOptions = {
			method: 'POST',
			body: {
				first_name: fName,
				last_name: lName,
				dob: dob,
				phone_number: phoneNum
			}
		};
		if (init) {
			updateOptions.body.initiate = true;
		}
		const res = await autoAuthReq(userUrl, updateOptions, redirect);
		if (id === user.id) {
			const data = res.data;
			// set user's info on frontend
			setUser({
				id: data.id,
				email: data.email,
				fName: data.first_name || '',
				lName: data.last_name || '',
				type: data.type || '',
				phone: data.phone_number || '',
				dob: data.dob || '',
				filledDetails: true,
				filledInvite: data.filled_invite,
				passwordSet: data.password_set,
				isLoggedIn: true
			});
		}
		return res;
	};

	const handleUserInvite = async (email, fName, lName, type, phone, dob, redirect = '/invite') => {
		const url = baseUrl + '/api/v1/groups/invite/';
		const options = {
			method: 'POST',
			body: {
				email: email,
				first_name: fName,
				last_name: lName,
				type: type,
				phone_number: phone,
			}
		};
		if (dob) {
			options.body.dob = dob;
		}
		const res = await autoAuthReq(url, options, redirect);
		setUser(prev => ({
				...prev,
				'filledInvite': true
			}));
		return res;
	};

	useEffect(() => {
		if (
			excludeChecks.includes(location.pathname) || 
			matchPath('/courses/:id/batches', location.pathname)
		) {
			return setCheckLogin(true);
		}
		const url = baseUrl + '/api/v1/users/';
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
				id: data.id,
				email: data.email,
				fName: data.first_name || '',
				lName: data.last_name || '',
				type: data.type || '',
				phone: data.phone_number || '',
				dob: data.dob || '',
				filledDetails: data.filled_details,
				filledInvite: data.filled_invite,
				passwordSet: data.password_set,
				isLoggedIn: true
			});
			// redirect user away from signup/login 
			// if they're signed in already
			navigate(origin);
		}).catch(err => {
			if (err.status !== 403 && err.status !== 401) {
				setUser(blankUser);
				navigate('/signup');
			}
			setCheckLogin(true);
		});
	}, [autoAuthReq, location, navigate]);

	const value = {
		user,
		autoAuthReq,
		handleSignup,
		handleLogin,
		handleGoogleLogin,
		handleLogout,
		handleUserUpdate,
		handleUserInvite
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



