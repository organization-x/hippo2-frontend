import {
	BrowserRouter, Routes, Route
} from 'react-router-dom';
import PrivateRoute from './components/privateroute/privateRoute';

import { AuthProvider } from './services/authentication';

import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Signup from './pages/signup';
import Protected from './pages/protected';
import GoogleAuth from './pages/google';
import Banner from './components/banner/banner';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/auth/google/' element={<GoogleAuth />}></Route>
					<Route path='/protected' element={
						<PrivateRoute>
							<Protected />
						</PrivateRoute>
					}></Route>
					<Route path='/signup' element={<Signup />}></Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
