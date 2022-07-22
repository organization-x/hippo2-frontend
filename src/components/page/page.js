import './page.css';
import TTLogo from '../ttlogo/ttlogo';

//for left and right width, use tailwindcss standard classses (https://tailwindcss.com/docs/width)
//for maxWidth, use tailwindcss standard classses (https://tailwindcss.com/docs/max-width)
function Page({ leftChildren, rightChildren, leftRightRatio, maxWidth, developers }) {
	let maxWidthClass;
	switch (maxWidth) {
		case '3xl':
			maxWidthClass = 'max-w-3xl';
			break;
		case '4xl':
			maxWidthClass = 'max-w-4xl';
			break;
		case '5xl':
			maxWidthClass = 'max-w-5xl';
			break;
		case '7xl':
			maxWidthClass = 'max-w-7xl';
			break;
		default:
			maxWidthClass = 'max-w-screen-xl';
			break;
	}

	let leftWidthClass;
	let rightWidthClass;

	switch (leftRightRatio) {
		case '1:1':
			leftWidthClass = 'w-1/2';
			rightWidthClass = 'w-1/2';
			break;
		case '1:2':
			leftWidthClass = 'w-1/3';
			rightWidthClass = 'w-2/3';
			break;
		case '2:3':
			leftWidthClass = 'w-2/5';
			rightWidthClass = 'w-3/5';
			break;
		case '5:7':
			leftWidthClass = 'w-5/12';
			rightWidthClass = 'w-7/12';
			break;
		default:
			leftWidthClass = 'w-full';
			rightWidthClass = 'w-full';
			break;
	}

	return (
		<div className={`container ${maxWidthClass} flex flex-wrap mx-auto my-10 overflow-hidden rounded-xl`}>
			<div className={`w-full md:${leftWidthClass} text-white bg-green p-7 flex flex-col`}>
				{leftChildren}
				<TTLogo developers={developers} className='mt-auto'></TTLogo>
			</div>
			<div className={`w-full md:${rightWidthClass} bg-white p-7`}>
				{rightChildren}
			</div>
		</div>
	);
}

export default Page;
