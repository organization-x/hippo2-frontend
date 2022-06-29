import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import Loading from "../loading/loading";


function GoogleAuth() {
	const { handleGoogleLogin } = useAuth();

	const [search] = useSearchParams();
	const code = search.get('code');
	const state = search.get('state');
	

	useEffect(() => {
		if (code) {
			let type;
			let origin;
			try {
				const stateObj = JSON.parse(window.atob(decodeURI(state)));
				type = stateObj.type;
				origin = stateObj.origin;
			} catch (err) {
				// TODO: error handling
				return console.log(err);
			}
			handleGoogleLogin(code, type, origin);
		}
	}, [code, handleGoogleLogin, state]);

	return (
		<Loading />
	);
}

export default GoogleAuth;
