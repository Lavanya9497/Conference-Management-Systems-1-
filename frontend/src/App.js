import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import HomePage from './components/home';
import OrganiserTable from './components/Table';
import Details from './components/Userdetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/uploadPapers" element={<HomePage />} />
					<Route path="/savedPapers" element={<OrganiserTable />} />
					<Route path='/adminhome' element={<OrganiserTable />} />
					<Route
						path='/details' element={<Details />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
