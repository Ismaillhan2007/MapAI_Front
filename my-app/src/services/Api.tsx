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
