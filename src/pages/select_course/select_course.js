import './select_course.css';
import { useAuth } from "../../services/authentication";
import { useState } from "react";
import GetInformation from "./select_course/get_courses";

function Select_course() {
	return (
		<GetInformation />
	);
}

export default Select_course;
