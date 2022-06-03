import { useAuth } from "../../services/authentication";

function Protected() {
	const auth = useAuth();
	return (
		<>
			<h1>You can only see this if you are logged in.</h1>
			<p>User data: {JSON.stringify(auth.user)}</p>
		</>
	);
}

export default Protected;
