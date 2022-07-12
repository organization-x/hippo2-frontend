import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/authentication';
import { FlashMsgProvider } from './services/flashMsg';

import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import ToastContainer from './components/toasts/toastContainer';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import GoogleAuth from './pages/google/google';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import ForgotPasswordConfirm from './pages/forgotPasswordConfirm/forgotPasswordConfirm';
import SelectCourses from './pages/selectCourse/selectCourses';
import OrderCancel from './pages/orderCancel/order-cancel';
import GroupJoin from './pages/groupJoin/groupJoin';
import BatchPayment from "./pages/batchPayment/batchPayment";
import PaymentSuccess from "./pages/paymentSuccess/paymentSuccess";
import BatchSelect from './pages/batchSelect/batchSelect';
import Dashboard from './pages/dashboard/dashboard';
import InviteUser from './pages/inviteUser/inviteUser';
import SignUpInvite from './pages/signupInvite/signupInvite';
import SelectionPage from './pages/selection/selection';
import ConfirmDetails from './pages/confirmDetails/confirmDetails';
import BatchChange from './pages/batchChange/batchChange';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<FlashMsgProvider>
					<div className="main">
						<Navbar />
						<ToastContainer />
						<Routes>
							<Route path='/' element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}/>
							<Route path='/auth/google/' element={<GoogleAuth />}/>
							<Route path='/invite' element={
								<ProtectedRoute inviteReq={false}>
									<InviteUser /> 
								</ProtectedRoute>
							}/>
							<Route path='/user/details' element={
								<ProtectedRoute detailsReq={false} inviteReq={false} >
									<ConfirmDetails />
								</ProtectedRoute>
							}/>
							<Route path='/signup' element={<Signup />}/>
							<Route path='/login' element={<Login />}/>
							<Route path='/signup/invite' element={<SignUpInvite />}/>
							<Route path='/password/reset' element={<ForgotPassword />}/>
							<Route path='/password/reset/confirm' element={<ForgotPasswordConfirm />}/>
							<Route path='/group/join' element={
								<ProtectedRoute detailsReq={false} inviteReq={false}>
									<GroupJoin />
								</ProtectedRoute>
							}/>
							<Route path='/batches/:batchId/payment' element={
								<ProtectedRoute>
									<BatchPayment />
								</ProtectedRoute>
							}/>
							<Route path='/orders/:orderID/success' element={<PaymentSuccess />}/>
							<Route path='/courses' element={<SelectCourses/>}/>
							<Route path='/courses/:courseID/batches' element={<BatchSelect />}/>
							<Route path='/orders/:orderID/change-batch' element={
								<ProtectedRoute>
									<BatchChange />
								</ProtectedRoute>
							}/>
							<Route path='/orders/:orderID/refund' element={
								<ProtectedRoute>
									<OrderCancel />
								</ProtectedRoute>
							}/>
							<Route path='/batches/:batchID/student-selection' element={
								<ProtectedRoute>
									<SelectionPage />
								</ProtectedRoute>
							}/>
						</Routes>
					</div>
					<Footer />
				</FlashMsgProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
