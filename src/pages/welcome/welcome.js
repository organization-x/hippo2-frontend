import WelcomeComponent from './introductionVideo/welcome';
import { useAuth } from "../../services/authentication";
import { useState } from "react";
import GetInformation from "./getInfo/getInformation";
import InviteUser from "./inviteUser/inviteUser";

function Welcome() {
	const { user } = useAuth();
	const [page, setPage] = useState('introductionVideo');
	
	const type = user.type;

	switch (page) {
		case 'introductionVideo':
			return (
				<WelcomeComponent type={type} onNext={() => setPage('confirm')}/>
			);
		case 'confirm':
			return (
				<GetInformation onBack={() => setPage('introductionVideo')} onNext={() => setPage('invite')} />
			);
		case 'invite':
			return (
				<InviteUser type={type} onBack={() => setPage('confirm')} />
			);
		default:
			setPage('introductionVideo');
	}
}

export default Welcome;
