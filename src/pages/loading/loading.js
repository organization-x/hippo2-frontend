import logoIcon from '../../loading-screen-icon.png';
import hippoIcon from '../../hippo.svg';
import './loading.css';

function Loading() {
	const randInt = Math.floor(Math.random() * 100) + 1;
	let icon = logoIcon;
	if (randInt <= 5) {
		icon = hippoIcon;
	}

	return (
		<div className="flex justify-center items-center min-h-screen">
			<img class="rotate w-1/6" src={icon} alt='logo'/>
		</div>
	);

}

export default Loading;