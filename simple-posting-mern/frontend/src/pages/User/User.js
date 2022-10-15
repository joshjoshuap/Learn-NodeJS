import { useEffect, useState } from "react";
import UserList from "./UserList";

const User = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();

  useEffect(() => {
    const getUserFetch = async () => {
      try {
        // setIsLoading(true);
        const res = await fetch(`${apiBackendUrl}/api/users/`);
        const data = await res.json();

        // if response is not ok or fetch failed
        if (!res.ok) {
          setIsLoading(true);
          throw new Error(data.message);
        }

        setUserData(data.users);
        setIsLoading(false);
      } catch (err) {
        // setError(err.message);
        setIsLoading(true);
      }
    };

    getUserFetch();
  }, []);

  if (isLoading)
    return (
      <div className="center">
        <h3>Loading ...</h3>
      </div>
    );

  return (
    <div className="center">
      {!isLoading && userData && <UserList items={userData} />}
    </div>
  );
};

export default User;
