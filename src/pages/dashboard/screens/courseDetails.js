import Loading from "../../loading/loading";
import {useEffect, useState} from "react";
import baseUrl from "../../../apiUrls";
import {useAuth} from "../../../services/authentication";
import Button from "../../../components/button/button";
import './Home.css';

function DashboardCourseDetails() {
	const [courses, setCourses] = useState([]);
	const auth = useAuth();
	const [blockHidden, setBlockHidden] = useState(false);


	function hideView() {
		setBlockHidden(!blockHidden);
	  };

	useEffect(() => {
		auth.autoAuthReq(baseUrl + `/api/v1/users/${auth.user.id}/orders/`)
			.then(data => {
				setCourses(data.data);
				
			}).catch(() => {
			// API request was not successful
			// TODO: handle API error
		});
	}, [auth]);

	const transactionsTable = courses.map((course) =>{
		return <tr>
		<td>{course.transactions.created_at}</td>
		<td>${course.product.course.price}</td>
		<td>{course.transactions.name}</td>
		<td><span className=
		{{unpaid: 'text-red-400', paid: 'text-green-500', cancelled: 'text-yellow-400', 'refunded': 'text-gray-500'}[course.status]}>
		{{unpaid: 'Not Paid', paid: 'Paid', cancelled: 'Cancelled', refunded: 'Refunded'}[course.status]}</span></td>
	</tr>
	});


	
	const coursesList = [];
	if (courses !== null) {
		for (let course of courses) {
			// TODO: remove dummy deadline - API does not return a deadline yet
			coursesList.push((
				<div className="container flex flex-wrap mx-auto mt-10 px-5 mb-10">
					<div className="flex-none md:flex-initial w-full md:w-7/12 py-8 px-16 pb-10 text-lg text-black bg-white rounded-t-xl md:rounded-tl-xl md:rounded-none">
						<h1 className="font-semibold text-2xl mb-8 text-center">Course Information</h1>
						<p className="mb-5"><b className="font-semibold">Student Name: </b>{course.user.first_name} {course.user.last_name}</p>
						<p><b className="font-semibold">Course: </b>{course.product.course.name}</p>
						<a href="/" className="text-blue-500 underline mb-5">Want to cancel your course?</a>
						<p><b className="font-semibold">{course.product.name}: </b>{course.product.start_date} - {course.product.end_date}, {course.product.start_time} - {course.product.end_time} {course.product.time_zone}</p>
						<p className="mb-5"><a href="/" className="text-blue-500 underline">Want to change your batch?</a><span className="italic text-red-400"> (Deadline: 6/1)</span></p>
						
						
						<Button bgColor="white" txtColor="black" className="w-full py-1 mb-4">Cancel Your Course</Button>
					</div>
					<div className="flex-none md:flex-initial w-full md:w-5/12 py-8 px-16 pb-10 bg-stone-300  md:rounded-tr-xl md:rounded-none">
						<h1 className="font-semibold text-2xl mb-10 text-center">Course Materials</h1>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Zoom Link</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Discord Server</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2 mb-4">Class Schedule</Button>
						<Button bgColor="white" txtColor="black" className="w-full py-2">Slideshow Presentations</Button>
					</div>

					
					<div className="flex-none md:flex-initial w-full py-5 px-8 bg-gray-300 rounded-b-xl rounded-none">
						<div className="flex items-center justify-center h-0">
							<Button className="text-2xl flex font-semibold items-center justify-center px-20" onClick={() => hideView()}>
								{blockHidden ? <p id='hideViewText' className='text-base md:text-xl'>Hide Financial Transactions</p>:null}
								{!blockHidden ? <p id='hideViewText'className='text-base md:text-xl'>View Financial Transactions</p>:null}
								{!blockHidden ? <div className='arrow downArrow relative left-3 bottom-1' id='downArrow'></div>:null}
								{blockHidden ? <div className='arrow upArrow relative left-3 top-1' id='upArrow'></div>:null}
							</Button>
						</div>
						
						{blockHidden ? 
						<div id='hideView' className='pt-7'>
							<table className='w-full text-center'>
								<thead>
									<tr className='font-bold'>
										<td >Date</td>
										<td>Amount</td>
										<td>Paid By</td>
										<td>Status</td>
									</tr>
								</thead>
								<tbody>
									{transactionsTable}
								</tbody>
							</table>
						</div>:null}	
	
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
