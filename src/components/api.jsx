

const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
const POST_URL = `${BASE_URL}/posts`;

export async function fetchPostsData() {
  try {
    const response = await fetch(POST_URL);
    const result = await response.json();

    if (result.success) {
      return result.data.posts;
    } else {
      throw new Error('Failed to fetch posts.');
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function myData() {

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STRING_HERE}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}