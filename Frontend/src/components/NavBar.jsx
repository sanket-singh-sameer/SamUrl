import { useNavigate } from "@tanstack/react-router";

const NavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const handleAuthRedirect = () => {
    navigate({ to: "/auth" });
  };
  const handleDashboardRedirect = () => {
    navigate({ to: "/dashboard" });
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white">
      <a href="/" className="text-xl font-bold">SamUrl</a>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleDashboardRedirect}
            className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-100 hover:text-blue-600 transition duration-300"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={handleAuthRedirect}
            className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-100 hover:text-blue-600 transition duration-300"
          >
            Create an account!
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
