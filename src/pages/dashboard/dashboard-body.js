import DashboardCourseDetails from "./screens/courseDetails";
import AccountSettings from "./screens/accountSettings";
import ToDo from "./screens/ToDo/ToDo";
import AlertBanner from "./alertBanner";

function DashboardBody({ page, navigate }) {
	switch (page) {
		case 'dashboard-home':
			return (
				<div className="flex flex-col">
					<div className='w-full'>
						<AlertBanner navigate={navigate}/>
					</div>
					<DashboardCourseDetails />
				</div>
			);
		case 'To-Do':
			return (<ToDo />);
		case 'account-settings':
			return (<AccountSettings />);
		case 'register-for-courses':
			//return (<RegisterForCourses />);
			break;
		case 'explore-student-products':
			//return (<ExploreStudentProducts />);
			break;
		case 'help-center':
			//return (<HelpCenter />);
			break;
		default:
			return (<h2>Page Under Construction</h2>);
	}
}

export default DashboardBody;
