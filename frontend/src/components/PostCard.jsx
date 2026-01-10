import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const PostCard = ({ post }) => {
  const preview =
    post.content.length > 180
      ? `${post.content.slice(0, 180)}...`
      : post.content;

  return (
    <article className='rounded-xl border border-white/40 bg-white/80 p-4 shadow-lg shadow-indigo-100 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl'>
      <Link
        to={`/posts/${post._id}`}
        className='text-lg font-semibold text-indigo-600'
      >
        {post.title}
      </Link>
      <p className='text-xs text-slate-500'>
        By {post.author?.name} •{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div
        className='mt-2 text-sm text-slate-700'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
      />
      <Link
        to={`/posts/${post._id}`}
        className='mt-3 inline-block text-sm text-indigo-600'
      >
        Read more →
      </Link>
    </article>
  );
};

export default PostCard;
