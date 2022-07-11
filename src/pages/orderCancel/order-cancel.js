import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import { useFlashMsg } from "../../services/flashMsg";
import baseUrl from '../../apiUrls';
import Button from "../../components/button/button";


function OrderCancel () {

    const { autoAuthReq } = useAuth(); // import this
    const { flashMsg } = useFlashMsg(); // this too
    const navigate = useNavigate(); // this too
    const here = useLocation().pathname; // this too
    const { orderID } = useParams(); // this too

    const onConfirm = () => {
        // import baseUrl
        const url = baseUrl + `/api/v1/orders/${orderID}/refund/`;
        const options = { method: 'POST' };
    
        autoAuthReq(url, options, here).then(res => {
          flashMsg('success', 'Order successfully refunded');
          navigate('/'); // navigate to dashboard once successful
        }).catch(err => {
          // handle errors
          flashMsg('error', 'Error refunding order');
        });
      };

    const onBack = () => {
		//dummy onback function for now
	};
    

    return (
      <div className="container content-center flex flex-wrap mx-auto pt-11 auth max-w-xl">
				<div className="md:flex-initial w-full py-5 px-8 bg-white">
					<h2 className="text-2xl mb-3 text-center font-semibold">Are you sure you want to cancel your course?</h2>
            <div className="mb-2 mt-2">
                <p className="italic text-center text-red-600">Deadline to cancel: 6/1/2022</p>
            </div>

          <div className="mb-4 mt-5 ml-16 mr-16 text-center" >
            <p className="mb-3 text-sm font-light pr-4">At AI Camp, our students not only gain a deep understanding of AI under guidance from world-class instructors, but also a supportive, lifelong, rapidly expanding network of peers, mentors, and industry professionals to help further their journey in the technical industry at a low cost compared to other educational programs.</p>
          </div>

          <h4 className="text-xl mb-3 mt-10 text-center font-semibold">Refund Policy</h4>
					
          <div className="mb-4 mt-5 ml-16 mr-16 text-center" >
						<p className="mb-3 text-sm font-light pr-4">We hope to see you again. Please note that refunds are only available if you cancel your course before the deadline, and Stripe's processing fee will be automatically applied when you request a refund.</p>
          </div>

          <div className="flex ml-12 mr-12 mt-10">
            <div className="w-1/3 p-4">
              <Button bgColor="gray" txtColor="white" className="w-full py-1" onClick={() => onBack()}>Back</Button>
            </div>

            <div className="w-2/3 p-4">
              <Button bgColor="white" txtColor="black" className="w-full py-1" conClick={() => onConfirm()}>Confirm Cancellation</Button>
            </div>
          </div>

				</div>	
			</div>
    );
}

export default OrderCancel;
