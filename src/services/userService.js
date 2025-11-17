const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }


export const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    console.log(data)
    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}


export const updateFreelancerSkills = async (userId, skills) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/skills`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ skills })
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating skills:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/current-user`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }
    console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw new Error(err);
  }
};