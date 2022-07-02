import GetInformation from '../userInformation/getInformation'
import { useEffect, useState } from "react";
import sendReq from "../../services/sendReq";
import '../userInformation/getInformation.css';
import baseUrl from '../../apiUrls';

function AccountSettings() {
    const [groupUsers, setGroup] = useState([]);

    useEffect(() => {
	const groupUsers = [];

    	const groupUrl = `${baseUrl}/api/v1/users/groupstudents/`; 
        const options = {
            method: 'GET',
        };

    	sendReq(groupUrl, options).then(res => {
	    for (let i = 0; i < res.data.length; i++) {
	    	const groupUser = res.data[i];
	        groupUsers.push(
		    <GetInformation key={i} headerText={`${groupUser.first_name}'s Profile`} {...groupUser} className="md:w-full bg-white rounded-xl"/>
		);
	    }
	    setGroup(groupUsers);
        });
    }, []);

    return (
	<div className="flex flex-row justify-center gap-3 flex-wrap p-4 auth rounded-xl">
	    {groupUsers}
	</div>
    );
}

export default AccountSettings;
