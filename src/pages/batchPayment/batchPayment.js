import Input from "../../components/form/input";
import {useState, useEffect} from "react";
import Button from "../../components/button/button";
import {useParams} from "react-router-dom";
import baseUrl from "../../apiUrls";
import {useAuth} from "../../services/authentication";

function BatchPayment() {
	const {batchId} = useParams();
	const [batchInfo, setBatchInfo] = useState(null);
	const auth = useAuth();

	const batchInfoDisplay = batchInfo ? (
		<div>
			<p className="text-lg font-semibold">{batchInfo.course_name}</p>
			<p className="text-base mb-3">${batchInfo.course_price}</p>
		</div>
	) : (
		<div>
			<p className="text-lg font-semibold">Loading...</p>
		</div>
	);

	// currently, API does not return payment deadline
	// TODO
	const paymentDeadline = batchInfo ? '6/1/22' : 'Loading...';
	const endpoint = baseUrl + `/api/v1/batches/${batchId}/`;

	// fetch batch data from API
	useEffect(() => {
		auth.autoAuthReq(endpoint, {method: 'GET'})
			.then(data => setBatchInfo(data.data))
			.catch(data => {
				if (data.status === 404) {
					// batch does not exist
					// TODO
				}
			});
	}, [endpoint, auth]);

	const [promoCode, setPromoCode] = useState('');

	const onPayNow = () => {
		// called when Submit Tuition button is clicked
		auth.autoAuthReq(baseUrl + `/api/v1/batches/${batchId}/payment/`, {method: 'POST'})
			.then(data => {
				const checkoutURL = data.data.checkout_url;
				window.location.replace(checkoutURL);
			}).catch(data => {
				// failed to get payment URL
				// TODO
			});
	};

	const onPayLater = () => {
		// called when Pay Later button is clicked
		// TODO
	};

	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-1/2 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none text-base">
				<h1 className="text-2xl mb-5 text-center">Payment Details</h1>
				<p className="mb-5">Course tuition is listed under your selected course. We offer competitive prices for the best AI education.</p>
				<p className="mb-5">Optional: Enter promo codes under the "Promotional Code" section.</p>
				<p>Pay later by clicking "Pay Later". There will be an option to do so in your dashboard.</p>
				<p className="mb-5 font-semibold">Payment Deadline: {paymentDeadline}</p>
				<p className="text-lg">Pay now by clicking "Submit Tuition".</p>
			</div>
			<div className="flex-none md:flex-initial relative w-full md:w-1/2 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">Submit payment to finalize registration.</h2>
				{batchInfoDisplay}

				<Input
					label="Promotional Code"
					type='text'
					placeHolder='Code'
					className="mb-8"
					value={promoCode}
					onChange={setPromoCode}
				/>

				<Button bgColor="green" txtColor="white" className="col-span-3 py-3 w-full mb-3" onClick={onPayNow}>Submit Tuition</Button>
				<Button bgColor="white" txtColor="black" className="col-span-3 py-3 w-full mb-8" onClick={onPayLater}>Pay Later</Button>

				<Button bgColor="gray" txtColor="white" className="px-8 py-1">Back</Button>
			</div>
		</div>
	);
}

export default BatchPayment;
