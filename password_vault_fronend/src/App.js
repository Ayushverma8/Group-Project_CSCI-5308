import './App.css';
import LendingPage from './components/LendingPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from './components/common/Routes'
import PageNotFound from './components/common/404';
import Home from './components/Home';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<PublicRoute restrictedToPublicOnly={true} />}>
						<Route path='/' element={<LendingPage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
					</Route>

					<Route path='/' element={<PrivateRoute />}>
						<Route path='/home' element={<Home />}/>
					</Route>

					{/* TODO: FIX THIS : NOT WORKING */}
					{/* <Route path='*' element={<PageNotFound />} /> */}
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;


