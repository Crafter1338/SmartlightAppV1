export async function http<T = any>(
	url: string,
	options: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
		body?: any,
		headers?: Record<string, string>,
		token?: string
	} = {}
): Promise<T> {
	const { method = 'GET', body, headers = {}, token } = options;

	const fetchOptions: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
			...(token ? { Authorization: `Bearer ${token}` } : {})
		},
		...(body ? { body: JSON.stringify(body) } : {})
	};

	const response = await fetch("http://localhost:3000" + url, fetchOptions);

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.message || `HTTP error! status: ${response.status}`);
	}

	return response.json();
}
