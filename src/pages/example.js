import { useState } from 'react';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function Example() {
	const [res, setRes] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const userUrl = 'http://localhost:8000/auth/user/';
	const signUpUrl = 'http://localhost:8000/auth/registration/';
	const loginUrl = 'http://localhost:8000/auth/login/';
	const logoutUrl = 'http://localhost:8000/auth/logout/';

	const csrftoken = getCookie('csrftoken');

	const sendReq = (url, method='GET', body=null) => {
		const options = {
			method: method,
			credentials: 'include',
			headers: {
				'X-CSRFToken': csrftoken
			}
		}
		if (body) {
			options.body = JSON.stringify(body);
			options.headers['Content-Type'] = 'application/json';
		}
		console.log(options);
		fetch(url, options).then((res) => {
			if (!res.ok) {
				return res.text().then(text => { throw new Error(text) });
			}
			return res.json();
		}).then((data) => {
			console.log('success');
			setRes(JSON.stringify(data, null, 2));
		}).catch((err) => {
			console.log('error');
			console.log(err);
			setRes(JSON.stringify(err));
		});
	};

	const testUser = () => {
		sendReq(userUrl);
	}

	const logoutUser = () => {
		sendReq(logoutUrl, 'POST');
	}

	const signUpUser = () => {
		const body = {
			username: username,
			password1: password,
			password2: password,
			email: email
		};
		sendReq(signUpUrl, 'POST', body);
	}

	const loginUser = () => {
		const body = {
			email: email,
			username: username,
			password: password
		};
		sendReq(loginUrl, 'POST', body);
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
			<div className="results">
				{res}
			</div>
		</form>
	)
}

export default Example;
