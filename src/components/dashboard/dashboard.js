import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();
const greet=()=>{
  const date = new Date();
  const hours = date.getHours();
  let greeting;
  if (hours < 12) {
    greeting = "Good morning!";
  } else if (hours < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }
  return greeting

}
const getUserName=()=>{
  const user = JSON.parse(localStorage.getItem("authToken"))
  return user.firstName
}
const signOut = ()=>{
  localStorage.removeItem("authToken")
  return navigate("/login")
}
  return (
    <>
    {greet()}, {getUserName()} !
      <h1>This is Dashboard page !!</h1>
      <button onClick={signOut} className="signOut" style={{ backgroundColor: 'red', color: 'white',border:"none", padding:"7px", borderRadius:"5px",cursor:"pointer" }}>sign out</button>
      
     </>
  );
}

export default Dashboard;