import Button from "../../components/button/button";

function PaymentSuccess() {
	// placeholders
	const courseName = 'Course Name';
	const batchId = '#';

	const registerCourse = () => {
		// called when "Register for Another Course" is clicked
	};

	const studentDashboard = () => {
		// called when "Proceed to Student Dashboard" is clicked
	};

	const onBack = () => {
		// called when the Back button is clicked
	};

	return (
		<div className="container max-w-4xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-1/2 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Congratulations!</h1>
				<p className="text-base mb-5">You are now officially enrolled in {courseName} in Batch {batchId}.</p>
				<p className="text-base mb-5">If you would like to register for another course, click "Register for Another Course".</p>
				<p className="text-lg">Click "Proceed to Student Dashboard" to view your payment status and prepare for your upcoming AI Camp course!</p>
			</div>
			<div className="flex-none md:flex-initial relative w-full md:w-1/2 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">Thank you for registering at AI Camp!</h2>

				<Button bgColor="white" txtColor="black" className="col-span-3 my-2 py-3 w-full" onClick={registerCourse}>Register for Another Course</Button>
				<Button bgColor="white" txtColor="black" className="col-span-3 my-2 mb-8 py-3 w-full" onClick={studentDashboard}>Proceed to Student Dashboard</Button>

				<Button bgColor="gray" txtColor="white" className="px-8 py-2" onClick={onBack}>Back</Button>
			</div>
		</div>
	)
}

export default PaymentSuccess;
