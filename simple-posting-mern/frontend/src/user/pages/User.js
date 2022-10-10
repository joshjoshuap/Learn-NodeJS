import UserList from "../components/UserList";

const User = () => {
  const USERS = [
    {
      id: 1,
      name: "Joshua",
      image:
        "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png",
      places: 3,
    },
  ];

  return (
    <div className="center">
      <UserList items={USERS} />
    </div>
  );
};

export default User;
