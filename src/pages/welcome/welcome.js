import { useAuth } from "../../services/authentication";
import { useState } from "react";
import GetInformation from "./getInfo/getInformation";
import InviteUser from "./inviteUser/inviteUser";

function Welcome() {
	const { user } = useAuth();
	const [page, setPage] = useState('confirm');
	
	const type = user.type;

	switch (page) {
		case 'confirm':
			return (
				<GetInformation onNext={() => setPage('invite')} />
			);
		case 'invite':
			return (
				<InviteUser type={type} onBack={() => setPage('confirm')} />
			);
		default:
			setPage('confirm');
	}
}

export default Welcome;
