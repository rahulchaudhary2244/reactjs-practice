export const PAGE_LIMIT = 10;

export const fetchPosts = async (start) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_LIMIT}&_start=${start}`
  );
  const data = await response.json();
  return data;
};
