import React, { useState, useEffect } from 'react';
import NavbarComp from './NavbarComp';
import { useNavigate, useLocation } from "react-router-dom"

const UserDetails = () => {

	const location = useLocation()
	const history = useNavigate();
	const [user, setUser] = useState([]);
	const [paper, setPaper] = useState([]);
	const [uname, setUname] = useState('');

	
	useEffect(() => {
		if (localStorage.getItem('user')) {
			setUname(localStorage.getItem('user'));
		}
		if (location.state.user) {
			setUser(location.state.user);
		} else {
			setPaper(location.state.paper);
		}
	}, [user, paper])

	function logout() {
		localStorage.removeItem('user');
		history("/login")
	}

	const userUi = (
		<div>
			<NavbarComp />
			<div className="container my-5">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-6">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="text-center">
								{user.image ?
									<img
										style={{width: '25vw', height: '25vw'}}
										src={user.image}
										alt="user icon"
										className="rounded-circle img-thumbnail"
									/>
									:
									<img
										src='https://via.placeholder.com/150'
										alt="user icon"
										className="rounded-circle img-thumbnail"
									/>
								}
								<h4 className="my-3">{user.name}</h4>
							</div>
							<p className="my-3">
								<strong>Affiliation:</strong> {user.affiliation}
							</p>
							<p className="my-3">
								<strong>Full Affiliation Address:</strong> {user.affiliation_address}
							</p>
							<p className="my-3">
								<strong>Email:</strong> {user.email}
							</p>
							<p className="my-3">
								<strong>Contact:</strong> {user.contact_no}
							</p>
							<div className="text-center">
								<a href={user.website} className="btn btn-info">
									Visit  Website
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const paperUi = (
		<div>
			<nav className="navbar navbar-expand-lg p-3 mb-2 bg-success-subtle text-emphasis-success">
				<div className="container-fluid">
					<a className="navbar-brand mb-0 h1 d-inline-block align-text-top"> RESEARCH PAPERS</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">

							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="/savedPapers">HOME</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									PAPERS
								</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="/uploadPapers">Upload Paper </a></li>
									<li><a className="dropdown-item" href="/savedPapers">Saved Paper</a></li>
								</ul>
							</li>
						</ul>
						<div className="nav-item dropdown">
							<a className="nav-link active dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{uname}
							</a>
							<ul className="dropdown-menu">
								{/* <li><a className="dropdown-item" href="#">Account Details </a></li>
                                                        <li><a className="dropdown-item" href="#">Settings</a></li> */}
								{/* <div className="dropdown-divider"></div> */}
								<li><a className="dropdown-item" onClick={logout}>Logout </a></li>
							</ul>
						</div>
						<form className="d-flex" role="search">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						</form>
					</div>
				</div>
			</nav>
			<div className="container my-5">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-6">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="text-center">
								<h4 className="my-3">{paper.title}</h4>
							</div>
							<p className="my-3">
								<strong>Authors:</strong> {paper.authors}
							</p>
							<p className="my-3">
								<strong>Keywords:</strong> {paper.keywords}
							</p>
							<p className="my-3">
								<strong>Abstract:</strong> {paper.abstract}
							</p>
							<div className="text-center">
								<a href={paper.pdf} className="btn btn-info">
									View Paper
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	if (location.state.user) {
		return userUi;
	} else {
		return paperUi;
	}
};

export default UserDetails;
