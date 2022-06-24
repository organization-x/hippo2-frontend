import React from "react";
import DashboardHome from "./dashboard-home"
import AccountSettings from "./account-settings";

function DashboardBody({page}){
        switch(page) {
            case 'dashboard-home':
                return (<DashboardHome />);
            case 'account-settings':
                return (<AccountSettings />);
            default:
                return (<h2>Does the function work?</h2>)
        }
    }

export default DashboardBody