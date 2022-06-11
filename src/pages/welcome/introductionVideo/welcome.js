import './welcome.css';
import Button from "../../../components/button/button";

function WelcomeComponent({onNext}) {
	return (
		<div>
			<div className="bg-banner w-full flex items-center justify-center">
				<div className="mx-auto max-w-3xl py-10">
					<h1 className="font-semibold text-3xl mb-4 text-center">Welcome to AI Camp!</h1>
					<p className="text-lg text-center">Watch the video below for important information about next steps on how you can create an AI Camp account and complete course registration for your student(s).</p>
				</div>
			</div>

			<div className="container max-w-4xl flex flex-wrap mx-auto p-4 pt-6 auth">
				<iframe className="bg-banner rounded-2xl w-full mb-5" title="placeholder iframe" />

				<Button onClick={onNext()} bgColor="green" txtColor="white" className="w-full my-1 py-1 mx-auto block text-center">Next</Button>
			</div>
		</div>
	)
}

export default WelcomeComponent;
