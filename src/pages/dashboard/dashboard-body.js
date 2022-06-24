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
            case 'payment-details':
                //return (<PaymentDetails />);
            case 'register-for-courses':
                //return (<RegisterForCourses />);
            case 'upcoming-events':
                //return (<UpcomingEvents />);
            case 'explore-student-products':
                //return (<ExploreStudentProducts />);
            case 'help-center':
                //return (<HelpCenter />);
            default:
                return (<h2>Page Under Construction</h2>)
        }
    }

export default DashboardBody