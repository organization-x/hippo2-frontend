import { useState, useEffect } from 'react';
import './human.css';

function Human() {
	const [human, setHuman] = useState({ 'name': 'Name', 'role': 'Role', 'imgUrl': '' });
	useEffect(() => {
		const humans = [
			{ 'name': 'dummy1', 'role': 'Backend Engineer', 'imgUrl': 'https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png' },
			{ 'name': 'dummy2', 'role': 'Designer', 'imgUrl': 'https://barryburnett.net/wp-content/uploads/2018/03/Blank-Avatar-Man-in-Suit.jpg' },
			{ 'name': 'dummy3', 'role': 'Tech Lead', 'imgUrl': 'https://rocksolidpaintingco.com/wp-content/uploads/2019/10/Blank-avatar.png' },
			{ 'name': 'dummy4', 'role': 'Data Scientist', 'imgUrl': 'https://freesvg.org/img/generic-avatar.png' },
			{ 'name': 'dummy5', 'role': 'Frontend Engineer', 'imgUrl': 'https://pbs.twimg.com/media/B5PP-IIIMAA-qem.png' },
		];
		setHuman(humans[Math.floor(Math.random() * humans.length)]);
	}, []);

	return (
		<div className="flex flex-col items-center">
			<img src={human.imgUrl} alt="" className="mb-4 human-img"/>
			<h1 className='text-xl text-center'>Hi! I'm {human.name}, {human.role} at AI Camp.</h1>
			<h1 className='text-xl'>Let's get started.</h1>
		</div>
	);
}

export default Human;
