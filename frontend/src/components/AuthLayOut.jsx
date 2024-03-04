import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, token}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
       

        navigate('/')
        setLoader(false)
    })


  return  loader? <h1>Loading ....</h1>:<h1>{children}</h1>
}

