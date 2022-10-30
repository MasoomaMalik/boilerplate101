import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from '../screen/signup'
import Login from '../screen/login'
// import Home from '../screen/home'
import Result from '../screen/result'
import CourseForm from '../screen/courseForm'
import CourseFormResult from '../screen/courseFormResult'
import Home from '../screen/userRegistrationForm'
import Dashboard from '../screen/adminDashboard'

function AppRouter() {

    return (
        <>
        <Router>

            <Routes>
                <Route path="/" element={<Signup/> }/>
                <Route path="result" element={<Result/> }/>
                <Route path="courseFormResult" element={<CourseFormResult/> }/>
                <Route path="login" element={<Login/> }/>
                <Route path="courseForm" element={<CourseForm/> }/>
                <Route path="adminDashboard/:id" element={<Dashboard/> }/>
                <Route path="userRegistrationForm/:id" element={<Home/> }/>
            </Routes>
        </Router>
        </>
    )
}
export default AppRouter