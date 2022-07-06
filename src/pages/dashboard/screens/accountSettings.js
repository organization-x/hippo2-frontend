import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../services/authentication";
import { useFlashMsg } from "../../../services/flashMsg";
import Profile from "../../../components/profile/profile";
import baseUrl from "../../../apiUrls";

function AccountSettings() {
    const [profiles, setProfiles] = useState([]);
    const { user, autoAuthReq } = useAuth();
	const { flashMsg } = useFlashMsg();
	const flashMsgRef = useRef(flashMsg).current;
	const here = useLocation().pathname;

    useEffect(() => {
		const data = [];

		const url = baseUrl + '/api/v1/users/groupstudents/'; 
		const options = { method: 'GET' };

		// Add the parent if the current user is one, can fetch the current student from the sendReq
		if (user.type === 'PARENT') {
			data.push(
				<Profile 
					key={0}
					fName={user.fName}
					lName={user.lName}
					phone={user.phone}
					email={user.email}
					type='PARENT'
					className='w-full md:w-96 m-5'
					id={user.id}
				/>
			);
		}

		autoAuthReq(url, options, here).then(res => {
			for (let i = 0; i < res.data.length; i++) {
				const student = res.data[i];
				data.push(
					<Profile 
						key={i+1}
						fName={student.first_name}
						lName={student.last_name}
						email={student.email}
						dob={student.dob}
						phone={student.phone_number}
						type='STUDENT'
						className='w-full md:w-96 m-5'
						id={student.id}
					/>
				);
			}
			setProfiles(data);
		}).catch(err => {
			flashMsgRef('error', 'Could not retrieve student info')
		});
    }, [user, autoAuthReq, here, flashMsgRef]);

    return (
		<div className="flex flex-row flex-wrap rounded-xl">
			{profiles}
		</div>
    );
}

export default AccountSettings;
