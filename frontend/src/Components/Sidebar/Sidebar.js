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

function SideBar() {

    const navigate = useNavigate()

    const {setCategory,setLanguage}=CartState()

    const [sidebar, setSidebar] = useState(false);
    const [categories, setCategories] = useState()
    const [languges, setLanguges] = useState()

    const fetchCatData=useCallback(async () => {
        const { data } = await axios.get('https://ic38.herokuapp.com/api/supercategories')
            setCategories(data.data)
            console.log("data", data)
            setCategory(data.data[0]._id)
    },[])

    const fetchlangData=useCallback(async () => {
        const { data } = await axios.get('https://ic38.herokuapp.com/api/language')
            setLanguges(data.data)
            console.log("data", data)
            setLanguage(data.data[0]._id)
    },[])

    console.log("Rendereing")

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
                                    {/* {cart && cart.email ? cart.email : 'Admin'} */}
                                </span>
                            }
                            id="adminmenu"
                        >
                        </NavDropdown>
                    </div>
                </div>
                <div className='navbar2'>
                    <NavDropdown
                        className="px-5 col-lg-6 text-center textProperty"
                        title={
                            <span style={{ color: 'white' }}>
                                Categories
                            </span>
                        }
                        id="adminmenu"
                    >
                        {categories ? categories.map(cat =>

                            <NavDropdown.Item onClick={()=>setCategory(cat._id)}>
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
                                Languages
                            </span>
                        }
                        id="adminmenu"
                    >
                        {languges ? languges.map(cat =>

                            <NavDropdown.Item onClick={()=>setLanguage(cat._id)} className="">
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
