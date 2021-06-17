// function handleErrors(response)
const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

function getPostIDs(sortMethod, numPosts) {
  return fetch(`${api}/${sortMethod}${json}`)
    .then((response) => response.json())
    .then((postIDs) => {
      if (!postIDs) {
        throw new Error(`Error fetching the ${sortMethod} posts`);
      }
      return postIDs.slice(0, numPosts);
    });
}

function getPost(postID) {
  return fetch(`${api}/item/${postID}${json}`)
    .then((response) => response.json())
    .then((post) => {
      if (!post) {
        throw new Error(`Error fetching the post with ID = ${postID}`);
      }
      return post;
    });
}

export function getPosts(sortMethod, numPosts) {
  return getPostIDs(sortMethod, numPosts).then((postIDs) =>
    Promise.all(postIDs.map((postID) => getPost(postID))).then((posts) => posts)
  );
}
