import Loading from "../../loading/loading";
import {useEffect, useState} from "react";
import baseUrl from "../../../apiUrls";
import {useAuth} from "../../../services/authentication";
import Button from "../../../components/button/button";

function DashboardCourseDetails() {
	const [courses, setCourses] = useState(null);
	const auth = useAuth();

	useEffect(() => {
		auth.autoAuthReq(baseUrl + `/api/v1/users/${auth.user.id}/orders/`)
			.then(data => {
				setCourses(data.data)
			}).catch(() => {
			// API request was not successful
			// TODO: handle API error
		});
	}, [auth]);

	const coursesList = [];
	if (courses !== null) {
		for (let course of courses) {
			// TODO: remove dummy deadline - API does not return a deadline yet
			coursesList.push((
				<div className="container flex flex-wrap mx-auto mt-10 px-5 mb-10">
					<div className="flex-none md:flex-initial w-full md:w-7/12 py-8 px-16 pb-10 text-lg text-black bg-white rounded-t-xl md:rounded-l-xl md:rounded-none">
						<h1 className="font-semibold text-2xl mb-8 text-center">Course Information</h1>
						<p className="mb-5"><b className="font-semibold">Student Name: </b>{course.user.first_name} {course.user.last_name}</p>
						<p><b className="font-semibold">Course: </b>{course.product.course.name}</p>
						<a href="/" className="text-blue-500 underline mb-5">Want to cancel your course?</a>
						<p><b className="font-semibold">{course.product.name}: </b>{course.product.start_date} - {course.product.end_date}, {course.product.start_time} - {course.product.end_time} {course.product.time_zone}</p>
						<p className="mb-5"><a href="/" className="text-blue-500 underline">Want to change your batch?</a><span className="italic text-red-400"> (Deadline: 6/1)</span></p>
						<p className="mb-5"><b className="font-semibold">Total Tuition: </b>${course.product.course.price}</p>
						<p className="font-semibold"><b>Payment Status: </b><span className={
							{unpaid: 'text-red-400', paid: 'text-green-500', cancelled: 'text-yellow-400', 'refunded': 'text-gray-500'}[course.status]
						}>{
							{unpaid: 'Not Paid', paid: 'Paid', cancelled: 'Cancelled', refunded: 'Refunded'}[course.status]
						}</span></p>
						<a href="/" className="text-blue-500 underline">View Payment Details</a>
					</div>
					<div className="flex-none md:flex-initial w-full md:w-5/12 py-8 px-16 pb-10 bg-stone-300 rounded-b-xl md:rounded-r-xl md:rounded-none">
						<h1 className="font-semibold text-2xl mb-10 text-center">Course Materials</h1>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Zoom Link</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Discord Server</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Class Schedule</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2">Slideshow Presentations</Button>
					</div>
				</div>
			));
		}
	}

	return courses ? (
		<>
			{coursesList}
		</>
	) : (
		<Loading />
	);
}

export default DashboardCourseDetails;
