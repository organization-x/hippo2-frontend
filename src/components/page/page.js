//for left and right width, use tailwindcss standard classses (https://tailwindcss.com/docs/width)
function page(leftChildren, rightChildren, leftWidth, rightWidth) {
	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className={`flex-none md:flex-initial w-full md:w-${leftWidth} p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none`}>
				<div className='mb-4 mx-4'>
					{leftChildren}
				</div>
			</div>
			<div className={`flex-none md:flex-initial w-full md:w-${rightWidth} py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none`}>
				<div className='mb-4'>
					{rightChildren}
				</div>
			</div>
		</div>
	);
}

export default page;
