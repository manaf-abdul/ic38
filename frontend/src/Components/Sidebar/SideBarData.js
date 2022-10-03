import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/admin',
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
    path: '/admin/view-blog-posts',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Enquiry',
    path: '/admin/enquiry',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Batch',
    path: '/admin/batch',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Webinars',
    path: '/admin/webinars',
    icon: <IoIcons.IoIosCamera />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/admin/category',
    icon: <AiIcons.AiFillTags />,
    cName: 'nav-text'
  },
  {
    title: 'WorkShop',
    path: '/admin/workshop',
    icon: <AiIcons.AiFillTool />,
    cName: 'nav-text'
  },
  
];
