import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../screen/home/Home"
import NavBar from "../component/NavBar"
import Personal from "../screen/personal/Personal"
import Calculator from "../component/Calculator"
import ViewAll from "../component/ViewAll"
import Business from "../screen/bussiness/Business"
import Apply from "../component/Apply"
import Education from "../screen/education/Education"
import Homepage from "../screen/home/Homepage"
import ProtectedRoute from "../component/ProtectedRoute"
import Login from "../screen/login/Login"
import UserDashboard from "../screen/dasboard/UserDashboard"
import ApplicationPreview from "../screen/previewPage/ApplicationPreview"
import SupportPage from "../component/SupportPage"
import UPIPayment from "../component/UPIPayment"
import TermCondition from "../component/TermCondition"

const AppStack = ()=>{
    return ( 
        <>
        {/* // <Router> */}
            <NavBar/>
       <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/personal" element={<Personal/>}/>
         <Route path="/calculator" element={<Calculator />} />
          <Route path="/viewAll" element={<ViewAll/>} /> 
           <Route path="/business-loan" element={<Business />} />
           <Route path="/apply" element={<Apply/>}/>
           <Route path="/education-loan" element={<Education/>}/>
           <Route path="/home-loan" element={<Homepage/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/dashboard" element={<ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>}/>
           <Route path="/loan-application" element={<ApplicationPreview/>}/>
           <Route path="/Contact" element={<SupportPage/>}/>
           <Route path="/payment" element={<UPIPayment/>}/>
           <Route path="/term&condition" element={<TermCondition/>}/>
       </Routes>
    {/* //    </Router> */}
    </>
   
    )
}
export default AppStack