import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../services/authentication";
import Loading from "./loading";


function GoogleAuth() {
	const auth = useAuth();
	const location = useLocation();
	const origin = location.state?.from?.pathname || '/';

	const [search] = useSearchParams();
	const code = search.get('code');

	useEffect(() => {
		if (code) {
			auth.handleGoogleLogin(code, origin);
		}
	}, [code, auth, origin]);

	return (
		<Loading />
	);
}

export default GoogleAuth;
