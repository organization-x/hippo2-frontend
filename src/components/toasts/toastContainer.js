import { useFlashMsg } from '../../services/flashMsg';
import Toast from './toast';
import './toastContainer.css';

function ToastContainer() {
	const { msg } = useFlashMsg();
	const messageIds = Object.keys(msg);
	const toasts = [];
	for (let i = 0; i < messageIds.length; i++) {
		toasts.push(
			<Toast msg={msg[messageIds[i]]} key={messageIds[i]} />
		);
	}

	return (
		<div className="toast-container">
			{toasts}
		</div>
	);
}

export default ToastContainer;
