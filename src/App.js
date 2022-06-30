import {
	BrowserRouter, Routes, Route
} from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';

import { AuthProvider } from './services/authentication';
import { FlashMsgProvider } from './services/flashMsg';

import Navbar from './components/navbar/navbar';
import SelectCourses from './pages/selectCourse/selectCourses';
import Home from './pages/dashboard/screens/Home'

import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Protected from './pages/protected/protected';
import GoogleAuth from './pages/google/google';
import Footer from './components/footer/footer';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import ForgotPasswordConfirm from './pages/forgotPasswordConfirm/forgotPasswordConfirm';
import GroupJoin from './pages/groupJoin/groupJoin';
import BatchPayment from "./pages/batchPayment/batchPayment";
import PaymentSuccess from "./pages/paymentSuccess/paymentSuccess";
import BatchPage from './pages/batches/batchPage';
import Dashboard from './pages/dashboard/dashboard'
import InviteUser from './pages/inviteUser/inviteUser';
import SignUpInvite from './pages/signupInvite/signupInvite';
import SelectionPage from './pages/selection/selection';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<FlashMsgProvider>
					<Navbar />
					<Routes>
						<Route path='/' element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}></Route>
						<Route path='/auth/google/' element={<GoogleAuth />}></Route>
						<Route path='/invite' element={
							<ProtectedRoute inviteReq={false}>
								<InviteUser /> 
							</ProtectedRoute>
						}></Route>
						<Route path='/protected' element={
							<ProtectedRoute>
								<Protected />
							</ProtectedRoute>
						}></Route>
						<Route path='/signup' element={<Signup />}></Route>
						<Route path='/dashboard' element={<Dashboard />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/signup/invite' element={<SignUpInvite />}></Route>
						<Route path='/password/reset' element={<ForgotPassword />}></Route>
						<Route path='/password/reset/confirm' element={<ForgotPasswordConfirm />}></Route>
						<Route path='/group/join' element={
							<ProtectedRoute detailsReq={false} inviteReq={false}>
								<GroupJoin />
							</ProtectedRoute>
						}></Route>
						<Route path='/batches/:batchId/payment' element={<BatchPayment />}></Route>
						<Route path='/payment/success' element={<PaymentSuccess />}></Route>
						<Route path='/courses' element={<SelectCourses/>}></Route>
						<Route path='/courses/:courseID/batches' element={<BatchPage />}></Route>
						<Route path='/batches/:batchID/student-selection' element={
							<ProtectedRoute>
								<SelectionPage />
							</ProtectedRoute>
						}></Route>
					</Routes>
					<Footer />
				</FlashMsgProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
