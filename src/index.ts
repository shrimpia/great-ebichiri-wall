export interface Env {
  KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const badWords = (await env.KV.get('badWords') ?? '').split(';');

    // HEADやGETの場合はそのまま返す
    if (request.method === 'HEAD' || request.method === 'GET') {
      return await fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });
    }
    const body = await request.text();

    // NGワードを含む場合は400を返す
    if (badWords.length > 0 && badWords.some(word => body.includes(word))) {
      return new Response(JSON.stringify({
        error: {
          message: '死刑',
          code: 'BAD_WORDS',
          id: 'c1d9e31a-85ee-45b9-9456-7c749fc4f475',
        }
      }), {
        // Note: ActivityPubで400を返してしまうとリモートからのretryが相次いだり、最悪配送停止されてしまったりするので、inboxでは202を返す
        status: request.url.includes('inbox') ? 202 : 400,
      });
    }

    const mkResponse = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body,
    });
    return new Response(await mkResponse.text(), {
      headers: mkResponse.headers,
    });
  },
};