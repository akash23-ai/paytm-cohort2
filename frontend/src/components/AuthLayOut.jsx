import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({children}) {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
useEffect(() => {
  
  if(!token){
    navigate('/signup')
    return
  }
}, [])


  return  children
}

