import { useNavigate } from 'react-router-dom'

export default function Protected({children}) {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    if(!token){
      navigate('/')
      return
    }


  return  children
}

