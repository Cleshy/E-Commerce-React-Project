import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const { userId } = useAuth();
  return (
    <section className="mt-56">
      <h1>Profile id: {userId}</h1>
    </section>
  );
};

export default Profile;
