import { useState } from 'react';
import Button from "../components/button/button";
import './auth.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/authentication';
import { googleSocialUrl } from '../apiUrls';
import Input from "../components/form/input";

function Signup() {
	// We ignore these lines from linting because firstName and lastName aren't used yet but setFirstName and setLastName are used
	// eslint-disable-next-line
	const [firstName, setFirstName] = useState('');
	// eslint-disable-next-line
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [type, setType] = useState('');
	const [email, setEmail] = useState('');
	const auth = useAuth();
	const location = useLocation();

	const origin = location.state?.from?.pathname || '/';

	const signUpUser = () => {
		auth.handleSignup(
			email, 
			firstName,
			lastName,
			type,
			password, 
			origin
		);
	}

	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-5/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Create an Account</h1>
				<p className="text-base mb-3">
					AI Camp teaches future leaders about coding, AI, how to learn, and how to work through creating impressive AI products and tech internships.
				</p>

				<p className="text-base mb-3">
					By creating AI products, our students apply what they have learned through first-hand experience of being an engineer, a product manager, or a data scientist.
				</p>

				<p className="text-base mb-3">
					Ready to start your AI journey? Our world class mentors and instructors are here to guide you!
				</p>

				<p className="text-base">
					By signing up for AI Camp, you agree to our <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Terms of Service</a> and <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="/">Privacy Policy</a>.
				</p>
			</div>

			<form action="/" method="GET" onSubmit={event => {
				event.preventDefault();
			}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">Join AI Camp as a</h2>

				<div className="mb-6 flex items-center justify-center">
					<div className="mx-auto inline-block">
						<Button bgColor="white" className="w-28 md:w-36 mx-2 p-1">Student</Button>
						<Button bgColor="black" className="w-28 md:w-36 mx-2 p-1" txtColor="white">Parent</Button>
					</div>
				</div>

				<Input label="First Name"
					type="text"
					placeHolder="John"
					className="mb-3"
					id="firstName"
					onChange={val => setFirstName(val)}
				/>
				<Input label="Last Name"
					type="text"
					placeHolder="Doe"
					className="mb-3"
					id="lastName"
					onChange={val => setLastName(val)}
				/>
				<Input label="Email"
					type="email"
					placeHolder="JohnDoe@yahoo.com"
					className="mb-3"
					id="email"
					onChange={val => setEmail(val)}
				/>
				<Input label="Password"
					type="password"
					placeHolder="JohnDoePassword"
					className="mb-3"
					id="password"
					onChange={val => setPassword(val)}
				/>

				<p className="text-xl mb-3 text-center">Or</p>

				<div className="block mb-5">
					<Button isLink={true} bgColor="white" href={googleSocialUrl} className="w-full my-1 py-1 mx-auto block text-center">Continue with Google</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Continue with Facebook</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Continue with LinkedIn</Button>
					<Button isLink={true} bgColor="white" href="/" className="w-full my-1 py-1 mx-auto block text-center">Continue with Apple</Button>
				</div>

				<div className="mb-6 flex items-center justify-center">
					<Link to="/login" className="mx-auto text-blue-700 hover:text-blue-600 underline decoration-inherit">Already have an account?</Link>
				</div>

				<Button bgColor="green" txtColor="white" className="w-full my-1 py-1 mx-auto block text-center" onClick={() => signUpUser()}>Next</Button>
			</form>
		</div>
	)
}

export default Signup;
