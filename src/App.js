import {
	BrowserRouter, Routes, Route
} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Example from './pages/example';
import Banner from './components/banner/banner';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/example' element={<Example />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
