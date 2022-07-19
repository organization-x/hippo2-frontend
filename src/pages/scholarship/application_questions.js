import { useState } from 'react';
import Input from '../../components/form/input';
import Button from '../../components/button/button';

function ApplicationQuestions() 
{
	const [formErrors, setFormErrors] = useState(0);
	
	return (<div className="w-full flex flex-row justify-center md:w-2/3 p-24 mx-auto mt-20 rounded-xl bg-white p-8">
				<form action="/" method="GET" onSubmit={event => {
					event.preventDefault();
				}} className="flex-none md:flex-initial w-full bg-white rounded-xl md:rounded-r-xl md:rounded-none">
					<p className="text-xl mb-2">1. What would you like to learn about AI? <span className='text-sm text-gray-500'>(Word Max: 150 words)</span></p>
					<Input
						type="question1"
						placeHolder="Enter response here"
						className="mb-3 md:w-full"
						id="question1"
						isValid={formErrors.question1?.length}
						errorText={formErrors.question1?.[0]}
						onChange={val => setFormErrors(val)}
					/>
					<p className="text-xl mb-2">2. Why do you want to join AI Camp? <span className='text-sm text-gray-500'>(Word Max: 150 words)</span></p>
					<Input
						type="question2"
						placeHolder="Enter response here"
						className="mb-3"
						id="question2"
						isValid={formErrors.question2?.length}
						errorText={formErrors.question2?.[0]}
						onChange={val => setFormErrors(val)}
					/>
					<p className="text-xl mb-2">3. What do you hope to get out of AI Camp? <span className='text-sm text-gray-500'>(Word Max: 150 words)</span></p>
					<Input
						type="question3"
						placeHolder="Enter response here"
						className="mb-3"
						id="question1"
						isValid={formErrors.question3?.length}
						errorText={formErrors.question3?.[0]}
						onChange={val => setFormErrors(val)}
					/>
					<p className="text-xl mb-2">4. Describe a moment where you felt proud of yourself. <span className='text-sm text-gray-500'>(Word Max: 150 words)</span></p>
					<Input
						type="question4"
						placeHolder="Enter response here"
						className="mb-3"
						id="question1"
						isValid={formErrors.question4?.length}
						errorText={formErrors.question4?.[0]}
						onChange={val => setFormErrors(val)}
					/>
				<div className="flex flex-row flex-nowrap mt-8">
					<Button 
						bgColor="gray"
						txtColor="white" 
						className="w-1/4 py-1 mr-6" 
						onClick={() => console.log("done")}
					>
						Back
					</Button>
					<Button 
						bgColor="green" 
						txtColor="white" 
						className="w-2/4 py-1" 
						onClick={() => console.log("run")}
					>
						Next
					</Button>
				</div>

				</form>
			</div>);
}

export default ApplicationQuestions;
