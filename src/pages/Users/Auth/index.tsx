import { useContext } from "react"
import { AppContext } from "../../../context/AppContext"
import { Navigate } from "react-router-dom"

const UserHome = () => {

  const { userData } = useContext(AppContext)

  return (
    <>
      { userData.type === 'admin' && <Navigate to='/home' /> }
      <div>Home Participantes</div>
    </>
  )
}

export default UserHome