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

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState({
		email: '',
		fName: '',
		lName: '',
		isLoggedIn: false
	});
	const [checkLogin, setCheckLogin] = useState(false);
	const navigate = useRef(useNavigate()).current;
	const location = useRef(useLocation()).current;

	const autoAuthReq = useRef(async (url, options, redirect = null) => {
		const res = await sendReq(url, options);

		// access token expired
		// attempt refresh
		if (res.status === 401) {
			const rOptions = {
				method: 'POST',
				body: {}
			};
			const rUrl = baseUrl + '/auth/token/refresh/';
			const rRes = await sendReq(rUrl, rOptions);
			if (!rRes.error) {
				return await sendReq(url, options);
			}
			// refresh token invalid/expired
			// set user as not logged in
			setUser({
				email: '',
				fName: '',
				lName: '',
				isLoggedIn: false
			});
			// get user to signup again
			navigate('/signup', { state: { from: { pathname: redirect } } });
		}
		return res;
	}).current;

	const handleSignup = async (email, password, redirect = '/') => {
		const url = baseUrl + '/auth/registration/';
		const body = {
			email: email,
			password1: password,
			password2: password
		};
		const options = {
			method: 'POST',
			body: body
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

	const handleLogin = async (email, password, redirect = '/') => {
		const url = baseUrl + '/auth/login/';
		const body = {
			email: email,
			password: password
		};
		const options = {
			method: 'POST',
			body: body
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
		const url = baseUrl + '/auth/user/';
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
				setUser({
					email: data.email,
					fName: data.first_name,
					lName: data.last_name,
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



