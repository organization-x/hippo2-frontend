import Button from "../../components/button/button";

function PageRight () {

	const fileUpload = () => {
		//Dummy for now
	};

	const onBack = () => {
		//Dummy for now
	};

	const onSubmit = () => {
		//Dummy for now
	};

	return (
		<div>
			<h1 className='text-xl text-center mb-12'>Upload Materials</h1>

			<div className='flex items-center justify-center'>
				<Button bgColor='gray' className="p-2 w-60 text-white mb-20" onClick={() => fileUpload()}>Upload W-2 Form</Button>
			</div>

			<div className="flex mt-20">
				<div className="w-1/3 p-4">
					<Button bgColor="gray" txtColor="white" className="w-full py-2 w-28" onClick={() => onBack()}>Back</Button>
				</div>

				<div className="w-2/3 p-4">
					<Button bgColor="green" txtColor="white" className="w-full py-2 w-56" onClick={() => onSubmit()}>Submit</Button>
				</div>
			</div>

		</div>
	);
}

export default PageRight;