
export async function onRequest(context) {
    return new Response(JSON.stringify({
        kvNamespace: context.env?.GAME_KV?.namespace || null,
        environment: context.env?.ENVIRONMENT || 'development'
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
