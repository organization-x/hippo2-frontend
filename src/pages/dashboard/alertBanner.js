import { useState, useEffect } from 'react';
import { useFlashMsg } from "../../services/flashMsg";
import { useAuth } from "../../services/authentication";
import baseUrl from '../../apiUrls';
import { useNavigate } from 'react-router-dom';


function AlertBanner() {
	const auth = useAuth();
	const isParent = auth.user.type === 'PARENT';
	const [completed, setCompleted] = useState(true);
	const { flashMsg } = useFlashMsg(); 
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let data;
			try {
				data = await auth.autoAuthReq(
					baseUrl + `/api/v1/users/${auth.user.id}/orders/`,
					{ method: 'GET' }
				);
			} catch (e) {
				flashMsg('error', 'Failed to fetch tasks');
				return;
			}

			// fetch incomplete tasks from API
			for (const course of data.data) {
				try {
					const incompleteTasks = (await auth.autoAuthReq(baseUrl + `/api/v1/orders/${course.id}/tasks/?countonly=true`, { method: 'GET' })).data.count;
					if (incompleteTasks > 0) {
						setCompleted(false);
						return;
					}
				} catch (e) {
					flashMsg('error', 'Failed to fetch tasks');
					return;
				}
			}
			setCompleted(true);
		})();
	}, [auth, flashMsg]);

	const onClick = () => {
		navigate('todo');
	};
	
	return (
		<>
			{!completed ?
				<div onClick={onClick} className="bg-red-500 w-full text-white text-center py-6">
					{isParent ? 
						<div>
							<p>One or more of your children have incomplete tasks in their To Do List.</p>
							<p><b className='underline cursor-pointer hover:text-gray-200'>Click here</b> to complete them so you can help your child prepare for their course!</p>
						</div> :
						<div>
							<p>You have incomplete tasks in your To Do List.</p>
							<p><b className='underline cursor-pointer hover:text-gray-200'>Click here</b> to complete them now so you can gain access to your course materials!</p>
						</div>
					}
				</div> : null
			}
		</>
	);
}

export default AlertBanner;
