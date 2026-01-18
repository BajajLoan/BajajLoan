import { useEffect, useState } from "react";
import AppStack from "./navigation/AppStack";
import { useAuth } from "./navigation/AuthContext";
import AuthStack from "./navigation/AuthStack";
const App = ()=>{
  const {token}=useAuth();
  const [isToken,setIsToken]=useState(null)
  useEffect(()=>{
    if(!token){
      const result = localStorage.getItem("token")
      setIsToken(result)
    }else{
      setIsToken(token)
    }
  })
  return(
    <>
  {
    isToken ? <AppStack/> : <AuthStack/>
  }
  </>
  )
}
export default App;