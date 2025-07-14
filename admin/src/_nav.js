import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilFolder,
  cilPlus,
  cilList,
  cilCart,
  cilImage,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  // 🔷 CATEGORY MANAGEMENT
  {
    component: CNavTitle,
    name: 'Category Management',
  },
  {
    component: CNavGroup,
    name: 'CATEGORY',
    to: '/Category',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Category',
        to: '/CATEGORY/Add Category',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Category List',
        to: '/CATEGORY/View Category',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  // 🔷 PRODUCT MANAGEMENT
  {
    component: CNavTitle,
    name: 'Product Management',
  },
  {
    component: CNavGroup,
    name: 'PRODUCT',
    to: '/Product',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/PRODUCT/Add Product',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View Product',
        to: '/PRODUCT/View Product',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  // 🔷 BANNER MANAGEMENT
  {
    component: CNavTitle,
    name: 'Banner Management',
  },
  {
    component: CNavGroup,
    name: 'BANNER',
    to: '/banner',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Banner',
        to: '/BANNER/Add Banner',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View Banner',
        to: '/BANNER/View Banner',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
