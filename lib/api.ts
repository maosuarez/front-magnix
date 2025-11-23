export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`http://localhost:9090${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Error en la petición");
    }

    return res.json();
  } catch (err: any) {
    console.error("API Error:", err);
    throw new Error(err.message || "Error desconocido");
  }
}
