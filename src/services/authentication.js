import { useState, createContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sendReq from "./sendReq";
import baseUrl from "../baseUrl";

import Navbar from "../components/navbar/navbar";
import Loading from "../pages/loading";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState({
		email: '',
		fName: '',
		lName: '',
		isLoggedIn: false
	});
	const [checkLogin, setCheckLogin] = useState(false);
	const navigate = useRef(useNavigate()).current;

	const autoAuthReq = useRef(async (url, options, redirect=null) => {
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
			// refresh failed
			// logout user to clear cookies 
			const loUrl = baseUrl + '/auth/logout/';
			const loRes = await sendReq(loUrl, rOptions);
			if (!loRes.error && redirect) {
				setUser({
					email: '',
					fName: '',
					lName: '',
					isLoggedIn: false
				});
				navigate('/signup', { state: { from: { pathname: redirect } } });
			}
		}
		return res;
	}).current;

	const handleLogin = async (email, username, password, redirect) => {
		const url = baseUrl + '/auth/login/';
		const body = {
			email: email,
			username: username,
			password: password
		};
		const options = {
			method: 'POST',
			body: body
		};
		const data = await sendReq(url, options);
		if (!data.error) {
			const body = data.data;
			setUser({
				email: body.user.email,
				fName: body.user.first_name,
				lName: body.user.last_name,
				isLoggedIn: true
			});
			navigate(redirect ? redirect : '/');
		}
	};

	const handleLogout = async () => {
		const url = baseUrl + '/auth/logout/';
		const options = {
			method: 'POST',
			body: {},
			credentials: false
		}
		const res = await sendReq(url, options);
		if (!res.error) {
			setUser({
				email: '',
				fName: '',
				lName: '',
				isLoggedIn: false
			});
			navigate('/signup')
		}
	};
	useEffect(() => {
		const url = baseUrl + '/auth/user/';
		const options = {
			method: 'GET'
		};
		autoAuthReq(url, options, '/').then(res => {
			setCheckLogin(true);
			if (!res.error) {
				const data = res.data;
				setUser({
					email: data.email,
					fName: data.first_name,
					lName: data.last_name,
					isLoggedIn: true
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}, [autoAuthReq]);

	const value = {
		user, 
		setUser,
		autoAuthReq,
		handleLogin,
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



