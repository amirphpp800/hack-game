
export async function onRequest(context) {
  const { env } = context;
  
  return new Response(JSON.stringify({
    accountId: env.CF_ACCOUNT_ID || '',
    namespaceId: env.CF_NAMESPACE_ID || '',
    apiToken: env.CF_API_TOKEN || ''
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
