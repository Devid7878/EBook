import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import Logo from './images/logo.svg';

const suggetion = [
	{ full_name: 'the rickest man in babylon' },
	{ full_name: 'the girl on the train' },
	{ full_name: 'the guest list' },
	{ full_name: 'the silent patient' },
	{ full_name: "Harry Potter And The Philosopher's Stone" },
	{ full_name: "Harry Potter And The Sorcerer's Stone" },
	{ full_name: 'Robin Hood' },
];

export default function Header() {
	const state = useContext(GlobalState);
	const [isLogged] = state.userAPI.isLogged;
	const [isAdmin] = state.userAPI.isAdmin;
	const [cart] = state.userAPI.cart;
	const [search, setSearch] = state.productsAPI.search;
	const [infor] = state.userAPI.infor;
	const [category, setCategory] = state.productsAPI.category;
	const [handleSearch, setHandleSearch] = useState('');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearch(handleSearch);
		setHandleSearch('');
		history.push('/products');
	};

	const logoutUser = async () => {
		await axios.get(`http://localhost:5000/user/logout`);
		localStorage.removeItem('Login');
		window.location.href = '/';
	};

	
	useEffect(() => {}, [search, category]);

	return (
		<header>
			<div className='container'>
				<div className='header__top--container'>
					<div className='logo__top'>
						<Link to='/' onClick={() => setCategory('')}>
							<img src={Logo} alt='' className='logo__image' />
						</Link>
					</div>
					<div className='languages'>{/* <p>Vi-VN | En-US</p> */}</div>
					<div className='navbar__container'>
						<label htmlFor='menu__input'>
							<i className='fas fa-bars menu__icon header__icon'></i>
						</label>

						<input
							type='checkbox'
							name=''
							id='menu__input'
							className='menu__input'
						/>
						<label htmlFor='menu__input' className='nav__overlay'></label>
						<ul className='navbar__list'>
							{isLogged ? (
								<>
									<li>
										<div className='nav__header'>
											{/* ======================================== */}
											<div className='flexrow infor__icon--mobile'>
												<i className='far fa-user'></i>
												<p>{infor[0]}</p>
											</div>
											<div className='flexrow infor__icon'>
												<i className='far fa-user header__icon'></i>
												<p className='fa-user__p' style={{ fontSize: '15px' }}>
													{infor[0]}
												</p>
											</div>
											{/* ======================================== */}
											<div>
												<label htmlFor='menu__input'>
													<i className='fas fa-times-circle'></i>
												</label>
											</div>
										</div>
									</li>
									<li>
										<Link to='/' onClick={() => setCategory('')}>
											Home
										</Link>{' '}
									</li>
									<li>
										<Link to='/products'>Products</Link>
									</li>
									{
										isAdmin ? (
											<li>
												<Link to='/admin'>Seller</Link>
											</li>
										) : (
											<p></p>
										)
										// <li><Link to="/history">HISTORY</Link></li>
									}
									<div
										className='flexrow cart navbar__list'
										style={{ marginRight: '8px' }}>
										<Link to='/cart'>
											<i className='fas fa-shopping-cart header__icon cartname'></i>
											&nbsp;&nbsp;
										</Link>
										<p>{cart.length}</p>
									</div>

									<li>
										<Link
											to='/'
											onClick={logoutUser}
											style={{ display: 'flex', alignItems: 'center' }}>
											Logout&nbsp; <i className='fal fa-sign-out'></i>
										</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link to='/login'>Login</Link>
									</li>
									<li className='navbar__list-register'>
										<Link to='/register'>Register</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
				<div className='header__bottom--container'>
					<div className='logo__bottom'>
						<Link to='/' onClick={() => setCategory('')}>
							<img src={Logo} alt='' className='logo__image' />
						</Link>
					</div>
					<div className='heart__icon'>
						{/* <Link to="/products"><i className="fas fa-heart header__icon"></i></Link> */}
					</div>
					<div className='search__header--container'>
						<form onSubmit={handleSubmit} className='search__form'>
							<input
								name=''
								placeholder='Search for products...'
								className='search__input'
								value={handleSearch}
								onChange={(e) => setHandleSearch(e.target.value)}
							/>
							<button type='submit'>
								<i className='fas fa-search'></i>&nbsp;
								<p>Search</p>
							</button>
							<div className='dropdown'>
								{suggetion
									.filter((item) => {
										const searchTerm = handleSearch.toLowerCase();
										const fullName = item.full_name.toLowerCase();

										return (
											searchTerm &&
											fullName.startsWith(searchTerm) &&
											fullName !== searchTerm
										);
									})
									.slice(0, 10)
									.map((item) => (
										<div
											onClick={() => setHandleSearch(item.full_name)}
											className='dropdown-row'
											key={item.full_name}>
											{item.full_name}
										</div>
									))}
							</div>
						</form>
					</div>
				</div>
			</div>
		</header>
	);
}
