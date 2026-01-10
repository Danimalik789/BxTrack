import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createPost, getPostById, updatePost } from "../services/posts";
import { useAuth } from "../context/AuthContext";

const PostForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    if (isEditing) {
      load();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        await updatePost(id, { title, content });
      } else {
        await createPost({ title, content });
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className='p-6 text-center text-slate-600'>Loading...</div>;
  }

  return (
    <div className='mx-auto mt-6 max-w-4xl rounded-2xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-indigo-100 backdrop-blur md:p-8'>
      <Link
        to='/'
        className='mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900'
      >
        <ArrowLeftIcon className='h-5 w-5' />
        <span>Go back to posts</span>
      </Link>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-slate-900'>
          {isEditing ? "Edit Post" : "Create Post"}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm text-slate-700'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 w-full rounded border border-slate-200 bg-white/80 px-3 py-2 shadow-inner shadow-slate-100 focus:border-indigo-400 focus:outline-none'
            required
          />
        </div>
        <div>
          <label className='block text-sm text-slate-700'>Content</label>
          <ReactQuill
            theme='snow'
            value={content}
            onChange={setContent}
            className='quill-editor bg-white'
          />
        </div>
        {error && <div className='text-sm text-red-600'>{error}</div>}
        <div className='flex items-center gap-3'>
          <button
            type='submit'
            disabled={submitting}
            className='rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:translate-y-0 disabled:opacity-60'
          >
            {submitting
              ? "Saving..."
              : isEditing
              ? "Update Post"
              : "Create Post"}
          </button>
          <div className='text-sm text-slate-600'>
            Author: <span className='font-medium'>{user?.name}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
