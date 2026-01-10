import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className='sticky top-0 z-20 border-b border-white/40 bg-white/70 shadow-sm backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
        <Link to='/' className='text-lg font-bold text-indigo-600'>
          Blog Management
        </Link>
        <div className='flex items-center gap-3'>
          <Link to='/' className='text-lg text-slate-700 hover:text-indigo-600'>
            Posts
          </Link>

          {user && (
            <Link
              to='/create'
              className='rounded bg-indigo-600 px-3 py-1 text-lg font-medium text-white hover:bg-indigo-500'
            >
              New Post
            </Link>
          )}
          {user ? (
            <>
              <span className='text-lg text-slate-600'>Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className='rounded border border-slate-200 px-3 py-1 text-lg text-slate-700 hover:bg-slate-100'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='text-lg text-slate-700 hover:text-indigo-600'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='rounded border border-indigo-200 px-3 py-1 text-lg font-medium text-indigo-600 hover:bg-indigo-50'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
