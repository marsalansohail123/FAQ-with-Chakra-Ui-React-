import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ques from '../../Assets/User Screens/Ques';
import Login from '../../Assets/Admin Screens/Login-Signup';
import Ans from '../../Assets/Admin Screens/Ans';

const AppRoutering = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Ques />} />
                <Route path='/admin' element={<Login />} />
                <Route path='/admin/answers' element={<Ans />} />
            </Routes>
        </Router>
    )
}

export default AppRoutering;