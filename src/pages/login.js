import { useState } from 'react';
import './auth.css';
import { googleSocialUrl } from '../apiUrls';
import {useAuth} from "../services/authentication";
import {Link, useLocation} from "react-router-dom";
import Input from "../components/form/input";
import Button from "../components/button/button";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = useAuth();
	const location = useLocation();

	const origin = location.state?.from?.pathname || '/';

	const loginUser = () => {
		auth.handleLogin(email, password, origin);
	}

	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-5/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Log In</h1>

				<p className="text-base mb-3">Nice to see you again!</p>

				<p className="text-base">
					By logging into AI Camp, you agree to our <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Terms of Service</a> and <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Privacy Policy</a>.
				</p>
			</div>

			<form action="/" method="GET" onSubmit={event => {
				event.preventDefault();
			}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-2xl mb-7 text-center">Welcome back to AI Camp!</h2>

				<Input label="Email"
					   type="email"
					   placeHolder="JohnDoe@yahoo.com"
					   className="mb-5"
					   onChange={val => setEmail(val)}
				/>
				<Input label="Password"
					   type="password"
					   placeHolder="JohnDoePassword"
					   className="mb-2"
					   onChange={val => setPassword(val)}
				/>
				<div className="mb-4">
					<Link to="/" className="mx-auto text-blue-700 hover:text-blue-600">Forgot password?</Link>
				</div>

				<p className="text-xl mb-5 text-center">Or</p>

				<div className="block mb-4">
					<Button isLink={true} bgColor="white" href={googleSocialUrl} className="w-full my-1 py-1 mx-auto block text-center">Log in with Google</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Log in with Facebook</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Log in with LinkedIn</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Log in with Apple</Button>
				</div>

				<div className="mb-5 flex items-center justify-center">
					<Link to="/signup" className="mx-auto text-blue-700 hover:text-blue-600">Create an account</Link>
				</div>

				<Button bgColor="green" txtColor="white" className="w-full my-1 py-1 mx-auto block text-center" onClick={() => loginUser()}>Next</Button>
			</form>
		</div>
	);
}

export default Login;
