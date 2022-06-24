import React from "react";
import DashboardHome from "./dashboard-home"
import AccountSettings from "./account-settings";

function DashboardBody({page}){
        switch(page) {
            case 'dashboard-home':
                return (<DashboardHome />);
            case 'account-settings':
                return (<AccountSettings />);
            case 'course-details':
                //return (<CourseDetails />);
                /* falls through */
            case 'payment-details':
                //return (<PaymentDetails />);
                /* falls through */
            case 'register-for-courses':
                //return (<RegisterForCourses />);
                /* falls through */
            case 'upcoming-events':
                //return (<UpcomingEvents />);
                /* falls through */
            case 'explore-student-products':
                //return (<ExploreStudentProducts />);
                /* falls through */
            case 'help-center':
                //return (<HelpCenter />);
                /* falls through */
            default:
                return (<h2>Page Under Construction</h2>)
        }
    }

export default DashboardBody