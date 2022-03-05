import './App.css';
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
import  AddNotes  from "./components/AddNotes";
//import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalProvider } from "./context/GlobalState";

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
					</Route>

					{/* TODO: FIX THIS : NOT WORKING */}
					{/* <Route path='*' element={<PageNotFound />} /> */}
				</Routes>
			</BrowserRouter>
<<<<<<< HEAD
=======
			<div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
				<GlobalProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/notes' element={<Notes />} />
							<Route path="/add" element={<AddNotes />}></Route>
						</Routes>
					</BrowserRouter>
				</GlobalProvider>
			</div>

>>>>>>> solve coflict
		</div>
	);
}

export default App;


