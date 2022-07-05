import {useParams, useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {useAuth} from "../../services/authentication";
import Button from "../../components/button/button";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";

function BatchPayment() {
	const { batchId } = useParams();
	const [batchInfo, setBatchInfo] = useState({});
	const [searchParams] = useSearchParams();
	const [payForUser, setPayForUser] = useState({});
	const auth = useAuth();
	const forUserId = searchParams.get('for') ? searchParams.get('for') : auth.user.id;

	const batchInfoDisplay = batchInfo ? (
		<div className="mb-8">
			<p className="text-lg font-semibold">{batchInfo.course_name}</p>
			<p className="text-base">${batchInfo.course_price}</p>
		</div>
	) : (
		<div>
			<p className="text-lg font-semibold">Loading...</p>
		</div>
	);
	const studentInfoDisplay = payForUser ? (
		<div className="mb-8 text-lg font-semibold">
			<p>Student Name: {payForUser.first_name} {payForUser.last_name}</p>
			<p>Batch: {batchInfo.batch_name} ({batchInfo.time_zone}) {batchInfo.batch_start_date}-{batchInfo.batch_end_date}</p>
		</div>
	) : null;
	useEffect(() => {
		// fetch user that is being paid for
		auth.autoAuthReq(baseUrl + `/api/v1/users/${forUserId}/`, {method: 'GET'})
			.then(res => setPayForUser(res.data)).catch();

		// fetch batch info
		auth.autoAuthReq(baseUrl + `/api/v1/batches/${batchId}/`, {method: 'GET'})
			.then(res => setBatchInfo(res.data)).catch();
	}, [auth, batchId, forUserId, searchParams]);


	const onPayNow = () => {
		auth.autoAuthReq(baseUrl + `/api/v1/batches/${batchId}/payment/`, {method: 'POST', body: {user: payForUser.id}})
			.then(res => {
				const checkoutURL = res.data.checkout_url;
				window.location.replace(checkoutURL);
			}).catch(); // TODO handle errors
	};
	const onPayLater = () => {
		// TODO pay in installments
	};
	if ([payForUser, batchInfo].includes(null)) {
		return (
			<Loading />
		);
	}

	const reviewStars = [];
	for (let i = 0; i < 5; i++) {
		reviewStars.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor">
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
		</svg>)
	}

	return (
		<div className="container max-w-4xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-1/2 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none text-base">
				<h1 className="text-2xl mb-5 text-center">Payment Details</h1>
				<p className="mb-5">Course tuition is listed under your selected course, alongside other course details. We offer competitive prices for the best AI education.</p>
				<p className="mb-5">Optional: Enter promo codes under the "Promotional Code" section.</p>
				<p className="mb-5">Pay the full tuition in smaller installments over time by clicking "Pay in Installments".</p>
				<p className="mb-8 text-lg">Pay now by clicking "Submit Tuition".</p>
				<p className="mb-5"><b>Note: Your spot is not reserved until you have paid the tuition. Courses are filling up fast!</b></p>
				<hr className="mx-3 mb-4" />
				<div className="mx-auto w-fit mb-4">
					{/* star SVG */}
					<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
					</svg>
					<p className="inline-block text-3xl align-middle">4.7/5 (208 reviews)</p>
				</div>
				<div className="bg-zinc-200 px-4 py-2 rounded-2xl text-black">
					<div className="flex justify-between">
						<div className="h-fit">{reviewStars}</div>
						<p className="text-xs mt-1 align-middle">July 14, 2021</p>
					</div>
					<p className="text-sm mb-1">"This class not only teaches us about AI, it provides us with resources that can help us determine what we will do in the future."</p>
					<div className="h-8 flex">
						<div className="inline-block">
							<img className="rounded-full bg-zinc-300 h-8 w-8" src="" alt="" />
						</div>
						<span className="inline-block text-sm ml-1 my-auto leading-none">Valeria Cisneros</span>
					</div>
				</div>
			</div>
			<div className="flex-none md:flex-initial relative w-full md:w-1/2 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">Submit payment to finalize registration.</h2>
				{batchInfoDisplay}
				{studentInfoDisplay}

				<Button bgColor="green" txtColor="white" className="col-span-3 py-4 w-full mb-3" onClick={onPayNow}>Submit Full Tuition</Button>
				<Button bgColor="white" txtColor="black" className="col-span-3 py-4 w-full mb-8" onClick={onPayLater}>Pay in Installments</Button>
			</div>
		</div>
	);
}

export default BatchPayment;
