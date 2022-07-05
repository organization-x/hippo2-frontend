import GetInformation from "./getInformation";
import { useAuth } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import './getInformation.css';

function UserDetails() {
    const { user } = useAuth();
    const  navigate  = useNavigate();

    return (
        <div className="container max-w-3xl flex justify-center flex-wrap mx-auto p-4 auth">
            <div className="flex-none md:flex-initial w-full md:w-2/5 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                <h1 className="text-2xl mb-8 text-center">Account Logistics</h1>
                <p className="text-base mb-3">
                    Fill out your personal details to edit your account profile!<br /><br />Some items may be pre-filled, so feel free to make edits to ensure that the information is accurate.
                </p>
            </div>
            <GetInformation headerText="Edit User Information" 
                init_first_name={user.fName} 
                init_last_name={user.lName} 
                id={user.id} 
                className="md:w-3/5 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none"
                editing
	    	type={user.type}
	    	onNext={ () => navigate('/invite') }
            />
        </div>
    );
}

export default UserDetails;
