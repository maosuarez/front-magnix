const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9090/api';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export async function apiCall(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { body, ...init } = options;

  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('token')
    : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(typeof init.headers === 'object' && !Array.isArray(init.headers)
      ? (init.headers as Record<string, string>)
      : {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...init,
    credentials: 'include',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export async function post(endpoint: string, data: unknown) {
  return apiCall(endpoint, {
    method: 'POST',
    body: data,
  });
}

export async function get(endpoint: string) {
  return apiCall(endpoint, {
    method: 'GET',
  });
}

export async function put(endpoint: string, data: unknown) {
  return apiCall(endpoint, {
    method: 'PUT',
    body: data,
  });
}

export async function del(endpoint: string) {
  return apiCall(endpoint, {
    method: 'DELETE',
  });
}
