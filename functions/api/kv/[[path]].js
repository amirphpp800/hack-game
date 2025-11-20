
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = context.params.path ? context.params.path.join('/') : '';
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    const operation = url.searchParams.get('op') || 'get';
    const key = url.searchParams.get('key') || path;

    if (!env.GAME_DATA) {
      return new Response(JSON.stringify({ error: 'KV namespace not bound' }), {
        status: 500,
        headers: corsHeaders
      });
    }

    switch (operation) {
      case 'get':
        if (!key) {
          return new Response(JSON.stringify({ error: 'Key required' }), {
            status: 400,
            headers: corsHeaders
          });
        }
        const value = await env.GAME_DATA.get(key, { type: 'json' });
        return new Response(JSON.stringify(value), {
          status: 200,
          headers: corsHeaders
        });

      case 'put':
        if (!key) {
          return new Response(JSON.stringify({ error: 'Key required' }), {
            status: 400,
            headers: corsHeaders
          });
        }
        const data = await request.json();
        await env.GAME_DATA.put(key, JSON.stringify(data));
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: corsHeaders
        });

      case 'delete':
        if (!key) {
          return new Response(JSON.stringify({ error: 'Key required' }), {
            status: 400,
            headers: corsHeaders
          });
        }
        await env.GAME_DATA.delete(key);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: corsHeaders
        });

      case 'list':
        const prefix = url.searchParams.get('prefix') || '';
        const list = await env.GAME_DATA.list({ prefix });
        return new Response(JSON.stringify(list.keys.map(k => k.name)), {
          status: 200,
          headers: corsHeaders
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid operation' }), {
          status: 400,
          headers: corsHeaders
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
