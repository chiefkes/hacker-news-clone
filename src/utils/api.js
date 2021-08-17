const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

function filterItems(items) {
  return items.filter(
    (item) => item !== null && item.dead !== true && item.deleted !== true
  );
}

function handleErrors(response, errorString) {
  if (!response.ok) {
    throw Error(`Error Code ${response.statusText} - ` + errorString);
  }
  return response;
}

function onlyPosts(items) {
  return items.filter((item) => item.type === "story" && item.title !== null);
}

function onlyComments(items) {
  return items.filter((item) => item.type === "comment");
}

function getItems(itemIDs) {
  return Promise.all(itemIDs.map((itemID) => getItem(itemID))).then((items) =>
    filterItems(items)
  );
}

export function getUser(userID) {
  return fetch(`${api}/user/${userID}${json}`)
    .then((response) =>
      handleErrors(response, `Could not fetch User with ID: ${userID}`)
    )
    .then((response) => response.json());
}

export function getItem(postID) {
  return fetch(`${api}/item/${postID}${json}`)
    .then((response) =>
      handleErrors(response, `Could not fetch the post with ID ${postID}`)
    )
    .then((response) => response.json());
}

export function getPosts(postIDs) {
  return getItems(postIDs).then((posts) => onlyPosts(posts));
}

export function getComments(commentIDs) {
  return getItems(commentIDs).then((comments) => onlyComments(comments));
}

export function getMainPosts(type, numPosts = 50) {
  return fetch(`${api}/${type}${json}`)
    .then((response) => handleErrors(response, `Could not fetch ${type}`))
    .then((response) => response.json())
    .then((postIDs) => getItems(postIDs.slice(0, numPosts + 5)))
    .then((posts) => onlyPosts(posts.slice(0, numPosts)));
}
