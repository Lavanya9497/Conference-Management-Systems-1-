import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import NavbarComp from './NavbarComp';
import { useNavigate } from 'react-router-dom';

const OrganiserTable = () => {
	const [users, setUsers] = useState([]);
	const [papers, setPapers] = useState([]);
	const [uname, setName] = useState([]);
	const history = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('user')) {
			setName(localStorage.getItem('user'))
			axios.post("http://localhost:8000/getpapers", { user: uname })
				.then(res => {
					setPapers(res.data);
				})
		} else if (localStorage.getItem('admin')) {
			setName(localStorage.getItem('admin'))
			axios.post("http://localhost:8000/getusers", {})
				.then(res => {
					setUsers(res.data);
				})
		}
	}, [uname, papers]);

	function showDetails(data, mode) {
		if (mode === 'user')
			history("/details", { state: { user: data } })
		else
			history("/details", { state: { paper: data } })
	}

	function editPaper(paper) {
		history("/home", { state: { paper: paper } })
	}

	function logout() {
		localStorage.removeItem('user');
		history("/login")
	}

	async function handleDecision(uname, decision) {

		try {
			await axios.post("http://localhost:8000/changeStatus", {
				uname, decision
			})
				.then(res => {
					if (res.data === 'Success') {
						window.location.reload();
					}
				})
				.catch(e => {
					alert("Somthing whet wrong please try again")
					console.log(e);
				})
		}
		catch (e) {
			console.log(e);

		}
	}

	const admin = (
		<div>
			<section class="h-100">
				<NavbarComp />
				<div class="container py-5 h-100">
					<div class="row d-flex justify-content-center align-items-center h-100">
						<div class="col">
							<div class="card card-registration my-4" className="shadow p-3 mb-5 bg-white rounded">
								<h3 class="mb-4 pb-0 pb-md-0 mb-md-9">CONFERENCE APPLICANTS</h3>
								<div class="row g-0">
									<Table stripped  >
										<thead>
											<tr>
												{/* <th>Sr. ID</th> */}
												<th>NAME</th>
												<th>EMAIL</th>
												<th>STATUS</th>
												<th>ACTION</th>
												<th>USER DETAILS</th>
											</tr>
										</thead>
										<tbody>
											{users.map((user) => (
												<tr key={user.name}>
													{/* <td>{user.id}</td> */}
													<td>{user.name}</td>
													<td>{user.email}</td>
													<td>{user.status}</td>
													<td>
														{user.status === "Pending Approval" && (
															<div>
																<Button rounded className='me-1' variant='success' onClick={() => handleDecision(user.name, 'Approved')}>Approve</Button>
																<Button variant="outline-danger" onClick={() => handleDecision(user.name, 'Rejected')} >Reject</Button>
															</div>
														)}
													</td>
													<td>
														<div onClick={() => showDetails(user, 'user')}>
															<Button variant='warning'>Details</Button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);

	const user = (
		<div>
			<section class="h-100">
				{/* <NavbarComp /> */}
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
				<div class="container py-5 h-100">
					<div class="row d-flex justify-content-center align-items-center h-100">
						<div class="col">
							<div class="card card-registration my-4" className="shadow p-3 mb-5 bg-white rounded">
								<h3 class="mb-4 pb-0 pb-md-0 mb-md-9">Saved Papers</h3>
								<div class="row g-0">
									<Table stripped  >
										<thead>
											<tr>
												{/* <th>Sr. ID</th> */}
												<th>Title</th>
												<th>Authors</th>
												<th>Keywords</th>
												<th>Action</th>
												<th>USER DETAILS</th>
											</tr>
										</thead>
										<tbody>
											{papers.map((paper) => (
												<tr key={paper.title}>
													<td>{paper.title}</td>
													<td>{paper.authors}</td>
													<td>{paper.keywords}</td>

													<td>
														{paper.status === "Draft" && (
															<div onClick={() => editPaper(paper)}>
																<Button variant='warning'>Edit</Button>
															</div>
														)}
														{paper.status === "Submit" && (
															<div>
																<div variant='Success'>Submited</div>
															</div>
														)}
													</td>
													<td>
														<div onClick={() => showDetails(paper, 'paper')}>
															<Button variant='success'>Details</Button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);

	if (localStorage.getItem('user')) {
		return user;
	} else if (localStorage.getItem('admin')) {
		return admin;
	}
};
export default OrganiserTable;