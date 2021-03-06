function ScholarshipBanner({ isGeneral }) {

	if (isGeneral) {
		return (
			<div className="w-full bg-main_green p-5">
				<h1 className="font-bold mt-10 text-4xl mb-8 text-center">General Questions</h1>
				<p className="mb-10 text-base text-center">
                Please fill out a few questions in order for us to learn more about you. Don't worry, your responses will <b>not</b> affect scholarship decisions.
				</p>
			</div>
		);
	} else {
		return (
			<div className="w-full bg-main_green p-5">
				<h1 className="font-bold mt-10 text-4xl mb-8 text-center">Application Questions</h1>
				<p className="mb-10 text-base text-center">
                    Please fill out a few questions in order for us to get a better sense of who you are! Responses <b>will be </b> taken into consideration when evaluating scholarship applicants.
				</p>
			</div>
		);
	}

}

export default ScholarshipBanner;
