export const Post = ({ post, idx }) => {
  return (
    <dl className="p-4 border border-pink-500 m-3">
      <dt className="font-semibold text-xl">
        <span className="underline mr-0.5">#{idx + 1}.</span>
        {post.title}
      </dt>
      <dd>{post.title}</dd>
    </dl>
  );
};
