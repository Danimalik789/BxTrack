import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getPosts({ page, limit });
        setPosts(data.items || []);
        setPages(data.pages || 1);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page]);

  if (loading) {
    return (
      <div className='p-6 text-center text-slate-600'>Loading posts...</div>
    );
  }

  if (error) {
    return <div className='p-6 text-center text-red-600'>{error}</div>;
  }

  return (
    <div className='mx-auto mt-6 max-w-7xl space-y-5 rounded-2xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-indigo-100 backdrop-blur md:p-8'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Latest Posts</h1>
          <p className='text-sm text-slate-600'>
            Showing {posts.length} of {total} posts
          </p>
        </div>
      </div>
      {posts.length === 0 ? (
        <p className='text-slate-600'>No posts yet.</p>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
      {pages > 1 && (
        <div className='flex items-center justify-between pt-4'>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className='rounded border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-700 shadow-sm disabled:opacity-60'
          >
            Prev
          </button>
          <div className='text-sm text-slate-700'>
            Page {page} of {pages}
          </div>
          <button
            disabled={page === pages}
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
            className='rounded border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-700 shadow-sm disabled:opacity-60'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
