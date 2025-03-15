import axios from 'axios';

export class ApiService {
  async fetchData(url: string, params: Record<string, any>, accessToken: string): Promise<any> {
    try {
      const response = await axios.get(url, {
        params,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
  }
}