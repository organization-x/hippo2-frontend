import {
	BrowserRouter, Routes, Route
} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Example from './pages/example';
import Footer from './components/footer/footer';

import './App.css';


function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/example' element={<Example />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
