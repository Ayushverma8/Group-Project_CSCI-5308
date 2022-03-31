import './App.scss';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from './components/common/Routes'
import PageNotFound from './components/common/404';
import Home from './components/Home';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Notes from './components/Notes'
import ProfilePage from './components/ProfilePage';
import PasswordVault from './components/PasswordVault';
import Todo from './components/Todo';
import MpinValidation from './components/MpinValidation';
import VerifyEmailMessgage from './components/VerifyEmailMessage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<PublicRoute restrictedToPublicOnly={true} />}>
						<Route path='/' element={<LandingPage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/forgot-password' element={<ForgetPassword />} />
						<Route path='/reset-password' element={<ResetPassword />} />
					</Route>

					<Route path='/' element={<PrivateRoute />}>
						<Route path='/home' element={<Home />} />
						<Route path='/password' element={<PasswordVault />} />
						<Route path='/notes' element={<Notes />} />
						<Route path='/todo' element={<Todo />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/validate_mpin' element={<MpinValidation />} />
						<Route path='/verify_email_message' element={<VerifyEmailMessgage />} />
					</Route>

					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;


