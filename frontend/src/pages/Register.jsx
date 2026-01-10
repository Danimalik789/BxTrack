import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, setError, error } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='mx-auto mt-10 max-w-md rounded-2xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-indigo-100 backdrop-blur md:p-8'>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-slate-900'>Register</h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-lg text-slate-700'>Name</label>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            className='mt-1 w-full rounded border border-slate-200 bg-white/80 px-3 py-2 shadow-inner shadow-slate-100 focus:border-indigo-400 focus:outline-none'
            required
          />
        </div>
        <div>
          <label className='block text-lg text-slate-700'>Email</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='mt-1 w-full rounded border border-slate-200 bg-white/80 px-3 py-2 shadow-inner shadow-slate-100 focus:border-indigo-400 focus:outline-none'
            required
          />
        </div>
        <div>
          <label className='block text-lg text-slate-700'>Password</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='mt-1 w-full rounded border border-slate-200 bg-white/80 px-3 py-2 shadow-inner shadow-slate-100 focus:border-indigo-400 focus:outline-none'
            required
            minLength={6}
          />
        </div>
        {error && <div className='text-lg text-red-600'>{error}</div>}
        <button
          type='submit'
          disabled={submitting}
          className='w-full rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:translate-y-0 disabled:opacity-60'
        >
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className='mt-4 text-md text-slate-600'>
        Already have an account?{" "}
        <Link to='/login' className='text-indigo-600'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;