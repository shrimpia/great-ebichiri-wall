import { hasBadWords } from "./libs/hasBadWords";

export interface Env {
  KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const badWords = (await env.KV.get('badWords') ?? '').split(';').filter(w => w != '');
    const cclimit = Number((await env.KV.get('cclimit') ?? '6'));
    const atLimit = Number((await env.KV.get('atLimit') ?? '3')); // Set the maximum allowed mentions

    // If the request method is HEAD or GET, return it as it is.
    if (request.method === 'HEAD' || request.method === 'GET') {
      return await fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });
    }
    const body = await request.text();

    try {
      const bodyJson = JSON.parse(body);
      const cc = bodyJson.cc?.length ?? 0;

      // Check if mentions exceed the limit
      const mentions = (bodyJson.text || '').match(/@.*?@.*?\..*?/g) || [];
      if (mentions.length > atLimit) {
        return new Response(JSON.stringify({
          error: {
            message: 'Too many Ats.',
            code: 'TOO_MANY_ATS',
            id: 'c7e10ff1-042f-441a-b490-836956560650',
          }
        }), {
          // Note: Returning a 400 in ActivityPub may result in repeated retries from the remote or, in the worst case, delivery suspension. Therefore, return a 202 for 'inbox'.
          status: request.url.includes('inbox') ? 202 : 400,
        });
      }

      if (cc > cclimit) {
        return new Response(JSON.stringify({
          error: {
            message: 'Too many mentions.',
            code: 'BAD_WORDS',
            id: 'c7e10ff1-042f-441a-b490-836956560650',
          }
        }), {
          // Note: Returning a 400 in ActivityPub may lead to repeated retries from the remote or, in the worst case, delivery suspension. Therefore, return a 202 in the case of 'inbox'.
          status: request.url.includes('inbox') ? 202 : 400,
        });
      }

    } catch (e) {
      // do nothing
    }

    // If the text contains prohibited words, reject it with an error.
    if (hasBadWords(body, badWords)) {
      const message = (await env.KV.get('errorMessage') ?? 'Bad words contained.')
      return new Response(JSON.stringify({
        error: {
          message: message,
          code: 'BAD_WORDS',
          id: 'c7e10ff1-042f-441a-b490-836956560650',
        }
      }), {
        // Note: Returning a 400 in ActivityPub may result in repeated retries from the remote or, in the worst case, delivery suspension. Therefore, return a 202 for 'inbox'
        status: request.url.includes('inbox') ? 202 : 400,
      });
    }

    return await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body,
    });
  },
};
