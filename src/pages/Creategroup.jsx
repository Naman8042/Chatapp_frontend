import { useState, useEffect } from "react";
import Default from "../assets/default.png";
import axios from "axios";
import { BASE_URL } from "../data";

function Creategroup() {
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [findUsers, setFindUsers] = useState("");
  const [user, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${BASE_URL}/user/finduser`,
        { name: findUsers },
        { withCredentials: true }
      )
      .then((res) => setData(res.data));
  }, [findUsers]);

  function createGroup() {
    try {
      axios
        .post(
          `${BASE_URL}/user/creategroup`,
          {
            users: users,
            name: groupName,
            file: file,
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res.data));
      setUsers([]);
    } catch (err) {
      console.log(err);
    }
  }
  function Adduser(id) {
    if (users.includes(id)) {
      console.log(id);
      alert("user already addes");
      console.log(users);
    } else {
      setUsers([...users, id]);
      console.log(users);
    }
  }

  return (
    <div className="w-full sm:w-[60%] lg:w-[70%] h-full m-2 flex flex-col">
      {/* Input Section */}
      <div className="w-full flex flex-col gap-4 justify-center items-center py-4">
        <input
          placeholder="Enter Group Name"
          className="p-2 rounded-xl w-[80%] sm:w-[60%] outline-none border border-gray-300 focus:border-blue-500 transition-all"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <input
          placeholder="Search Users"
          className="p-2 rounded-xl w-[80%] sm:w-[60%] outline-none border border-gray-300 focus:border-blue-500 transition-all"
          value={findUsers}
          onChange={(e) => setFindUsers(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {user.length > 0 ? (
          user.map((u) => {
            if (u._id === localStorage.getItem("id")) return null;
            return (
              <div
                key={u._id}
                className="flex items-center gap-4 bg-gray-100 border shadow rounded-xl p-2 cursor-pointer hover:bg-gray-200 transition-all"
                onClick={() => Adduser(u._id)}
              >
                <img
                  src={u.imageUrl || Default}
                  alt="User"
                  className="w-14 h-14 rounded-full "
                />
                <div className="flex-1 text-lg font-medium truncate">
                  {u.name}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No user found</div>
        )}
      </div>

      {/* Button */}
      <div className="py-4 flex justify-center">
        <button
          onClick={createGroup}
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Create Group
        </button>
      </div>
    </div>
  );
}

export default Creategroup;
