import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/instructor',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Blog',
    path: '/numericaltest',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Enquiry',
    path: '/short-and-simple',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Batch',
    path: '/terminology',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Language',
    path: '/language',
    icon: <IoIcons.IoIosCamera />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/category',
    icon: <AiIcons.AiFillTags />,
    cName: 'nav-text'
  },
  {
    title: 'OneLiner',
    path: '/one-liners',
    icon: <AiIcons.AiFillTool />,
    cName: 'nav-text'
  },
  
];
