import GetInformation from '../userInformation/getInformation'
import { useEffect, useState } from "react";
import { useAuth } from "../../services/authentication";
import sendReq from "../../services/sendReq";
import '../userInformation/getInformation.css';
import baseUrl from '../../apiUrls';

function AccountSettings() {
    const [groupUsers, setGroup] = useState([]);
    const { user }= useAuth();

    useEffect(() => {
	const groupUsers = [];

    	const groupUrl = `${baseUrl}/api/v1/users/groupstudents/`; 
        const options = {
            method: 'GET',
        };

	// Add the parent if the user is one, can fetch the current student from the sendReq
	if (user.type === 'PARENT') {
	    groupUsers.push(
	        <GetInformation key={user.id} 
		    headerText={`${user.first_name}'s Profile`}
		    init_first_name={user.first_name} 
		    init_last_name={user.last_name} 
		    id={user.id} 
		    type={user.type}
		    className="md:w-80 w-min: bg-white rounded-xl"
		/>
	    );
	}

    	sendReq(groupUrl, options).then(res => {
	    for (let i = 0; i < res.data.length; i++) {
	    	const groupUser = res.data[i];
	        groupUsers.push(
		    <GetInformation key={groupUser.id} 
			headerText={`${groupUser.first_name}'s Profile`}
			init_first_name={groupUser.first_name} 
			init_last_name={groupUser.last_name} 
			id={groupUser.id} 
			type="STUDENT" 
			className="md:w-80 w-min: bg-white rounded-xl"
		    />
		);
	    }
	    setGroup(groupUsers);
        });
    }, []);

    return (
	<div className="flex flex-row flex-wrap gap-5 p-4 auth rounded-xl">
	    {groupUsers}
	</div>
    );
}

export default AccountSettings;
