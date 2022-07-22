import { useState, useEffect } from 'react';
import './human.css';

function Human() {
	const [human, setHuman] = useState({ 'name': 'Name', 'role': 'Role', 'imgUrl': '' });
	useEffect(() => {
		const humans = [
			{ 'name': 'Jackson Choyce', 'role': 'Engineering Manager', 'imgUrl': `${process.env.PUBLIC_URL}/humans/jackson.png` },
			{ 'name': 'Sricharan Guddanti', 'role': 'Product Manager', 'imgUrl': `${process.env.PUBLIC_URL}/humans/sri.jpeg` },
			{ 'name': 'Bernice Lau', 'role': 'Project Designer', 'imgUrl': `${process.env.PUBLIC_URL}/humans/bernice.jpg` },
			{ 'name': 'Alexander Zhou', 'role': 'Engineering Manager', 'imgUrl': `${process.env.PUBLIC_URL}/humans/alex.jpg` },
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
