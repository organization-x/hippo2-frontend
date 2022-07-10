import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import { useFlashMsg } from "../../services/flashMsg";
import Loading from "../loading/loading";


function GoogleAuth() {
	const { handleGoogleLogin } = useAuth();
	const { flashMsg } = useFlashMsg();
	const [search] = useSearchParams();
	const code = useRef(search.get('code')).current;
	const state = useRef(search.get('state')).current;
	
	const navigate = useNavigate();
	

	useEffect(() => {
		if (code) {
			let type;
			let origin;
			try {
				const stateObj = JSON.parse(window.atob(decodeURI(state)));
				type = stateObj.type;
				origin = stateObj.origin;
			} catch (err) {
				return flashMsg('error', 'Invalid login credentials');
			}
			handleGoogleLogin(code, type, origin).then(res => {
				flashMsg('success', 'Welcome!');
			}).catch(err => {
				if (err.status === 400) {
					// check that err.data is defined
					if (
						typeof err.data === 'object' &&
						!Array.isArray(err.data) &&
						err.data !== null
					) {
						// display backend errors as toasts
						const errors = Object.values(err.data);
						for (let i = 0; i < errors.length; i++) {
							if (errors[0].length && errors[0][0]) {
								flashMsg('error', errors[0][0]);
							}
						}
						navigate(origin);
					}
				} else {
					flashMsg('error', 'Failed to Sign in');
				}
			});
		}
	}, [code, handleGoogleLogin, state, flashMsg, navigate]);

	return (
		<Loading />
	);
}

export default GoogleAuth;
