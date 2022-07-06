import React from "react";
import DashboardHome from "./dashboard-home"
import AccountSettings from "./screens/accountSettings";

function DashboardBody({page}){
        switch(page) {
            case 'dashboard-home':
                return (<DashboardHome />);
            case 'account-settings':
                return (<AccountSettings />);
            case 'course-details':
                //return (<CourseDetails />);
                break;
            case 'payment-details':
                //return (<PaymentDetails />);
                break;
            case 'register-for-courses':
                //return (<RegisterForCourses />);
                break;
            case 'upcoming-events':
                //return (<UpcomingEvents />);
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
