  const API_BASE_URL = 'http://localhost:8000'; // Your Django server

  export const fetchPlaces = async (query: string, location?: string, radius?: number) => {
    const params = new URLSearchParams({
      query,
      ...(location && { location }),
      ...(radius && { radius: radius.toString() })
    });

    const response = await fetch(`${API_BASE_URL}/places/?${params}`);
    return response.json();
  };

  export const sendAIQuestion = async (question: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending AI question:', error);
      throw error;
    }
  };
 export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error response:', errorData);
      throw new Error(`Login failed: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // Store tokens in localStorage
    if (data.access) {
      localStorage.setItem('access_token', data.access);
    }
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
