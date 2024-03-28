import {useNavigate} from "react-router-dom";
function Protected({children}) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
        console.log("Token is here ", token)
    if(!token){
       navigate("/signin")
       return
    }

   else {
    return (
        {children}
    )
   }

}

export default Protected