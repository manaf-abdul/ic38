import React, { useCallback, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';
import { CartState } from '../../Context';
import { BASEURL } from '../../Constants';

function SideBar() {

    const navigate = useNavigate()

    const { category, language, setCategory, setLanguage, admin, setAdmin } = CartState()

    const [sidebar, setSidebar] = useState(false);
    const [categories, setCategories] = useState()
    const [languges, setLanguges] = useState()
    const [catName, setCatName] = useState('')
    const [langName, setLangName] = useState('')

    const fetchCatData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/supercategories`)
        setCategories(data.data)
        setCategory(data.data[0]._id)
        setCatName(data.data[0].name)
    }, [])

    const fetchlangData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/language`)
        setLanguges(data.data)
        setLanguage(data.data[0]._id)
        setLangName(data.data[0].name)
    }, [])

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

        fetchCatData()
        fetchlangData()
    }, [])

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar d-flex justify-content-between' >
                    <div>
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </div>
                    <div>
                        <NavDropdown
                            className="px-5"
                            title={
                                <span style={{ color: 'white' }}>
                                    Admin
                                </span>
                            }
                            id="adminmenu"
                        >
                            {admin && admin.token ?
                                <NavDropdown.Item onClick={() => {
                                    setAdmin({})
                                }} className="">
                                    Logout
                                </NavDropdown.Item>
                                :
                                <NavDropdown.Item onClick={() => {
                                    navigate('/login')
                                }} className="">
                                    LogIn
                                </NavDropdown.Item>
                            }
                        </NavDropdown>
                    </div>
                </div>
                <div className='navbar2'>
                    <NavDropdown
                        className="px-5 col-lg-6 text-center textProperty"
                        title={
                            <span style={{ color: 'white' }}>
                                {catName ? catName : "Categories"}
                            </span>
                        }
                        id="adminmenu"
                    >
                        {categories ? categories.map(cat =>

                            <NavDropdown.Item onClick={() => {
                                setCategory(cat._id)
                                setCatName(cat.name)
                            }}>
                                {cat.name}
                            </NavDropdown.Item>
                        )
                            :
                            <>
                                'No Data Found'
                            </>
                        }
                    </NavDropdown>

                    <NavDropdown
                        className="px-5 col-lg-6 text-center textProperty"
                        title={
                            <span style={{ color: 'white' }}>
                                {langName ? langName : "Languages"}
                            </span>
                        }
                        id="adminmenu"
                    >
                        {languges ? languges.map(cat =>

                            <NavDropdown.Item onClick={() => {
                                setLanguage(cat._id)
                                setLangName(cat.name)
                            }} className="">
                                {cat.name}
                            </NavDropdown.Item>
                        )
                            :
                            <>
                                'No Data Found'
                            </>
                        }
                    </NavDropdown>
                </div>
                <div>
                    <div className='d-flex justify-content-center'>
                        <span className='p5'>
                            Category: {catName ? catName : <span style={{ color: "red", fontWeight: "bold" }}>Please Select A Category</span>}

                        </span>
                        <span className='p5'>

                            Language: {langName ? langName : <span style={{ color: "red", fontWeight: "bold" }}>Please Select A Language</span>}
                        </span>
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default React.memo(SideBar);
