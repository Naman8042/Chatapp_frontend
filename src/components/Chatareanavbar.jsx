import defaultImage from '../assets/default.png'

const Chatareanavbar = ({ image, name, users }) => {
   // Path to your default image

  return (
    <div className="w-full bg-white fixed top-0 z-50 sm:static py-2 px-4 flex justify-between items-center shadow-b-xl">
      <div className="flex items-center gap-3 w-full max-w-full">
        <img
          alt="User"
          src={image || defaultImage}
          onError={(e) => (e.currentTarget.src = defaultImage)}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
            {name}
          </p>
          <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-600">
            {users?.map((user) => (
              <span key={user._id} className="truncate">
                {user.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chatareanavbar;
