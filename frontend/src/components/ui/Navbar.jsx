
import AvatarComponent from "./AvatarComponent"


function Navbar({user}) {
  return (
    <nav className="p-4 flex justify-between items-center border-b border-solid border-gray-600">
        <h1 className="text-3xl font-bold ">Payment App</h1>
        <div className="flex justify-center items-center">
          <h2 className="text-lg font-medium mr-2">
            Hello, {user.user.firstName}
          </h2>
          <AvatarComponent />
        
        </div>
      </nav>
  )
}

export default Navbar