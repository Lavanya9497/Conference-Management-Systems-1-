import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import {
	MDBNavbar,
	MDBContainer,
	MDBIcon,
	MDBNavbarNav,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBNavbarToggler,
	MDBNavbarBrand,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from 'mdb-react-ui-kit';

export default function NavbarComp() {

	const history = useNavigate();
	const [showNavColorThird, setShowNavColorThird] = useState(false);

	function logout() {
		localStorage.removeItem('admin');
		localStorage.removeItem('user');
		history("/login")
	}

	return (
		<>
			<MDBNavbar expand='lg' light style={{ backgroundColor: '#B3E5FC' }}>
				<MDBContainer fluid>
					< MDBNavbarBrand ><h3>ORGANISER</h3></MDBNavbarBrand>
					<MDBNavbarToggler
						type='button'
						data-target='#navbarColor02'
						aria-controls='navbarColor02'
						aria-expanded='false'
						aria-label='Toggle navigation'
						onClick={() => setShowNavColorThird(!showNavColorThird)}
					>
						<MDBIcon icon='bars' fas />
					</MDBNavbarToggler>
					<MDBCollapse show={showNavColorThird} navbar>
						<MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
							<MDBNavbarItem className='active'>
								<MDBNavbarLink active aria-current='page' href='/'>
									<h5>HOME</h5>
								</MDBNavbarLink>
							</MDBNavbarItem>
							<MDBNavbarItem>
								<MDBDropdown>
									<MDBDropdownToggle active tag='b' role='button'>
										MY ACCOUNT
									</MDBDropdownToggle>
									<MDBDropdownMenu>
										{/* <MDBDropdownItem link>Setting</MDBDropdownItem> */}
										<MDBDropdownItem link onClick={logout}>Logout</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBNavbarItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBContainer>
			</MDBNavbar>
		</>
	);
}