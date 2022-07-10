import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

function Toast({ msg }) {
	let icon;
	if (msg.type === 'success') {
		icon = faCircleCheck;
	} else if (msg.type === 'error') {
		icon = faCircleInfo;
	}
	return (
		<div className={`toast ${msg.type} ${msg.status}`}>
			<FontAwesomeIcon icon={icon} />
			<span>
				{msg.text}
			</span>
		</div>
	);
}

export default Toast;
