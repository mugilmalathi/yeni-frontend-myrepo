interface HttpClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
  getAuthToken?: () => string | undefined;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private getAuthToken?: () => string | undefined;

  constructor(config: HttpClientConfig) {
    this.baseURL = config.baseURL;
    this.getAuthToken = config.getAuthToken;
    this.defaultHeaders = {
      'Accept': 'application/json',
      ...config.headers
    };
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers as any)
    };

    const token = this.getAuthToken?.();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      }
      // @ts-ignore
      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: any): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(endpoint, {
      method: 'POST',
      body
    });
  }

  put<T>(endpoint: string, data: any): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(endpoint, {
      method: 'PUT',
      body
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export default HttpClient;