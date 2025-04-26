import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import { Button } from './ui/button';

const PostList = () => {
  const pageSize = 10
  const [page,setPage] = useState(1)
  const { data: posts, error, isLoading } = usePosts({page,pageSize});
  const [expandedPost, setExpandedPost] = useState<number | null>(null); // Track which post is expanded

  if (error) return <p className="text-red-400 text-center">{error.message}</p>;
  if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;

  const togglePost = (postId:number) => {
    setExpandedPost(expandedPost === postId ? null : postId); // Toggle expanded state
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        📝 Posts
      </h2>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-orange-100 p-4 rounded-lg shadow"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => togglePost(post.id)}
            >
              <h1 className="font-bold text-gray-700 text-lg">{post.title}</h1>
              <svg
                className={`w-5 h-5 text-gray-700 transform transition-transform duration-200 ${
                  expandedPost === post.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedPost === post.id ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="mt-2 text-gray-600">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex mt-10 justify-between'>
<Button className='cursor-pointer' disabled={page === 1} onClick={()=>setPage(Math.max(page - 1,1))}>Previous</Button>
<p>{`Page ${page}`}</p>
<Button disabled={posts?.length < 10} className='cursor-pointer' onClick={() => setPage(page + 1)}>Next</Button>

      </div>
      
    </div>
  );
};

export default PostList;