//for left and right width, use tailwindcss standard classses (https://tailwindcss.com/docs/width)
//for maxWidth, use tailwindcss standard classses (https://tailwindcss.com/docs/max-width)
function Page(leftChildren, rightChildren, leftWidth, rightWidth, maxWidth) {
	return (
		<div className={`container max-w-${maxWidth} flex flex-wrap mx-auto my-10 md:rounded-l-xl md:rounded-none md:rounded-r-xl overflow-hidden rounded-t-xl rounded-b-xl bg-green`}>
			<div className={`w-full md:w-${leftWidth} p-5 text-white bg-green p-7`}>
				{leftChildren}
			</div>
			<div className={`w-full md:w-${rightWidth} py-5 px-8 bg-white p-7`}>
				{rightChildren}
			</div>
		</div>
	);
}

export default Page;
