import { useCallback, useEffect, useReducer, useRef } from 'react';
import { Post } from './post';
import { useIsIntersecting } from '../../hooks/use-is-intersecting';
import { fetchPosts, PAGE_LIMIT } from './utils';

const reducer = (state, action) => {
  return { ...state, ...action };
};

export const InfiniteScrollWithPosts = () => {
  const targetRef = useRef();
  const containerRef = useRef();

  const [{ posts, totalPosts, start, isFetching }, setState] = useReducer(reducer, {
    posts: [],
    totalPosts: 0,
    start: 0,
    isFetching: false,
  });

  const { isIntersecting } = useIsIntersecting(targetRef, containerRef);

  const handleFetch = async () => {
    setState({ isFetching: true });
    const data = await fetchPosts(start);
    const updatedPosts = [...posts, ...data];
    setState({
      posts: updatedPosts,
      totalPosts: updatedPosts.length,
      start: start + PAGE_LIMIT,
      isFetching: false,
    });
  };

  useEffect(() => {
    if (isIntersecting && !isFetching) {
      console.log('triggered', { posts, totalPosts, start, isFetching });
      (async function () {
        await handleFetch();
      })();
    }
  }, [isIntersecting]);

  return (
    <>
      <section className="max-h-[400px] overflow-auto border border-green-700 p-3 m-3">
        <main>
          {posts.map((post, idx) => (
            <Post key={post.userId + '-' + post.id} post={post} idx={idx} />
          ))}
        </main>

        <div ref={targetRef} />
      </section>

      <div className="flex gap-4 items-end">
        <div>{totalPosts} Posts loaded</div>
        {isFetching ? (
          <div>Fetching...</div>
        ) : (
          <button className="cursor-pointer border border-black p-3" onClick={handleFetch}>
            Fetch more
          </button>
        )}
      </div>
    </>
  );
};
