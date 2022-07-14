import loadingIcon from '../../loading-screen-icon.png';
import hippoIcon from '../../hippo.svg';
import './loading.css';

function Loading() {
	const randInt = Math.floor(Math.random() * 100) + 1;
	let hippo = false;
	if (randInt <= 5) {
		hippo = true;
	}

	if (hippo) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<img class="w-1/5 rotate" src={hippoIcon} alt='logo'/>
			</div>
		);
	} else {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<img class="w-1/5 rotate" src={loadingIcon} alt='logo'/>
			</div>
		);
	}
}

export default Loading;