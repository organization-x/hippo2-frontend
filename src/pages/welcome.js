import './welcome.css';
import {Link} from "react-router-dom";

function Welcome() {
	return (
		<div>
			<div className="bg-banner w-full flex items-center justify-center">
				<div className="mx-auto max-w-3xl py-10">
					<p className="font-semibold text-3xl mb-4 text-center">Welcome to AI Camp!</p>
					<p className="text-lg text-center">Watch the video below for important information about next steps on how you can create an AI Camp account and complete course registration for your student(s).</p>
				</div>
			</div>

			<div className="container max-w-4xl flex flex-wrap mx-auto p-4 pt-6 auth">
				<iframe className="bg-banner rounded-2xl w-full mb-5" title="placeholder iframe" />

				<Link to="/" className="w-full my-1 py-1 mx-auto block text-center btn button txt-white bg-green">Next</Link>
			</div>
		</div>
	)
}

export default Welcome;