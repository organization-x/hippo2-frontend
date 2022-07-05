import GetInformation from '../userInformation/getInformation'
import { useEffect, useState } from "react";
import { useAuth } from "../../services/authentication";
import sendReq from "../../services/sendReq";
import '../userInformation/getInformation.css';
import baseUrl from '../../apiUrls';

function AccountSettings() {
    const [groupUsers, setGroup] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
	const users = [];

    	const groupUrl = `${baseUrl}/api/v1/users/groupstudents/`; 
        const options = {
            method: 'GET',
        };

	// Add the parent if the current user is one, can fetch the current student from the sendReq
	if (user.type === 'PARENT') {
	    users.push(
	        <GetInformation key={user.id} 
		    headerText={`${user.fName}'s Profile`}
		    init_first_name={user.fName} 
		    init_last_name={user.lName} 
		    init_email={user.email}
		    init_phone={user.phone}
		    id={user.id} 
		    type={user.type}
		    className="md:w-80 w-min: bg-white rounded-xl"
		/>
	    );
	}

    	sendReq(groupUrl, options).then(res => {
	    for (let i = 0; i < res.data.length; i++) {
	    	const groupUser = res.data[i];
	        users.push(
		    <GetInformation key={groupUser.id} 
			headerText={`${groupUser.first_name}'s Profile`}
			init_first_name={groupUser.first_name} 
			init_last_name={groupUser.last_name} 
			init_email=" "
			id={groupUser.id} 
			type="STUDENT" 
			className="md:w-80 w-min: bg-white rounded-xl"
		    />
		);
	    }
	    setGroup(users);
        });
    }, [user]);

    return (
	<div className="flex flex-row flex-wrap gap-5 p-4 auth rounded-xl">
	    {groupUsers}
	</div>
    );
}

export default AccountSettings;
