const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';

export async function submitContact(payload) {
  let response;

  try {
    response = await fetch(`${apiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('The contact service could not be reached. Please try again.');
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(body?.error?.message ?? 'Your message could not be saved. Please try again.');
    error.fields = body?.error?.fields ?? {};
    throw error;
  }

  if (body?.status !== 'saved' || !Number.isSafeInteger(body.id) || body.id < 1) {
    throw new Error('The contact service did not confirm that your message was saved.');
  }

  return body;
}
