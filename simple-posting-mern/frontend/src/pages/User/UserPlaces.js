import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../Place/PlaceList";

const UserPlaces = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userPlaces, setUserPlaces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userId = useParams().userId; // get params id App.js - /:userId/places

  useEffect(() => {
    const getUserFetch = async () => {
      try {
        // setIsLoading(true);
        const res = await fetch(
          `${apiBackendUrl}/api/places/user/${userId}`
        );
        const data = await res.json();

        // if response is not ok or fetch failed
        if (!res.ok) {
          setIsLoading(true);
          throw new Error(data.message)
        }

        setUserPlaces(data.place);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
        setError(err.message);
      }
    };

    getUserFetch();
  }, [userId]);

  // if (isLoading)
  //   return (
  //     <div className="center">
  //       <h3>Loading ...</h3>
  //     </div>
  //   );

  return (
    <div className="center">
      {!isLoading && userPlaces && <PlaceList items={userPlaces} />}
    </div>
  );
};

export default UserPlaces;
