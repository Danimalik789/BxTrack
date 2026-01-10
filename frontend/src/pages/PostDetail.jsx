import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { deletePost, getPostById } from "../services/posts";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const isOwner = post && user && post.author?._id === user._id;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    setDeleting(true);
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className='p-6 text-center text-slate-600'>Loading post...</div>
    );
  }

  if (error) {
    return <div className='p-6 text-center text-red-600'>{error}</div>;
  }

  if (!post) return null;

  return (
    <div className='mx-auto mt-6 max-w-4xl rounded-2xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-indigo-100 backdrop-blur md:p-8'>
      <Link
        to='/'
        className='mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900'
      >
        <ArrowLeftIcon className='h-5 w-5' />
        <span>Back</span>
      </Link>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1'>
          
          <h1 className='text-3xl font-bold text-slate-900'>{post.title}</h1>
          <p className='text-sm text-slate-500'>
            By {post.author?.name || "Unknown"} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {isOwner && (
          <div className='flex gap-2'>
            <Link
              to={`/posts/${post._id}/edit`}
              className='rounded border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-100'
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={!token || deleting}
              className='rounded border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100 disabled:opacity-60'
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
      <div
        className='prose prose-indigo mt-6 max-w-none'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
    </div>
  );
};

export default PostDetail;
