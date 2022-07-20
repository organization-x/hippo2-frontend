import './page.css';

//for left and right width, use tailwindcss standard classses (https://tailwindcss.com/docs/width)
//for maxWidth, use tailwindcss standard classses (https://tailwindcss.com/docs/max-width)
function Page({ leftChildren, rightChildren, leftWidth, rightWidth, maxWidth }) {
	return (
		<div className={`container max-w-${maxWidth} flex flex-wrap mx-auto my-10 overflow-hidden rounded-xl`}>
			<div className={`w-full md:w-${leftWidth} text-white bg-green p-7`}>
				{leftChildren}
			</div>
			<div className={`w-full md:w-${rightWidth} bg-white p-7`}>
				{rightChildren}
			</div>
		</div>
	);
}

export default Page;
