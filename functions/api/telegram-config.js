export async function onRequest(context) {
  const botToken = context.env?.BOT_TOKEN || process.env?.BOT_TOKEN || '';
  const chatId = context.env?.ADMIN_CHAT_ID || process.env?.ADMIN_CHAT_ID || '0';

  return new Response(JSON.stringify({
    botToken: botToken,
    chatId: chatId,
    configured: !!botToken
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}