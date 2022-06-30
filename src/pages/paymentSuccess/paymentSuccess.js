import Button from "../../components/button/button";

function PaymentSuccess({courseName = 'Course Name', batchId = '#', orderNumber = '#######'}) {
	const studentDashboard = () => {
		// called when "Proceed to Student Dashboard" is clicked
	};

	return (
		<div className="container max-w-5xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-1/2 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Congratulations!</h1>
				<p className="text-base mb-5">You are now officially enrolled in {courseName} in Batch {batchId}.</p>
				<p className="text-base mb-5">Order Number: {orderNumber}</p>
				<p className="text-lg">Click "Proceed to Student Dashboard" to view your payment status and prepare for your upcoming AI Camp course!</p>
			</div>
			<div className="flex-none md:flex-initial relative w-full md:w-1/2 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-16 text-center">Thank you for registering at AI Camp!</h2>

				<Button bgColor="green" txtColor="white" className="col-span-3 my-2 mb-8 py-3 w-full" onClick={studentDashboard}>Proceed to Student Dashboard</Button>
			</div>
		</div>
	);
}

export default PaymentSuccess;
