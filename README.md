# great-pari-wall

This is an spam filter for Misskey API and ActivityPub inbox designed to operate on Cloudflare Workers.

## Deployment

0. Install Node.js and Wrangler `npm install wrangler --save-dev`
1. `npx wrangler kv:namespace create KV` Create a Key-Value (KV) store.
2. With the assigned `id`, replace `kv_namespaces.id`(YOUR_KV_ID) in `wrangler.toml`.
3. `pnpm run deploy` Deploy.
4. Register prohibited words in the KV store with the key `badWords` (multiple entries can be separated by `;`)
5. Add a route to Workers Routes.
   - `[YourDomain]/api/notes/create`
   - `[YourDomain]/api/i/update`
   - `[YourDomain]/inbox`
   - `[YourDomain]/users/*`

## Customize KV

By setting additional keys in KV, you can customize the behavior of the Great Pari Wall.

| Key          | Value                                                                                             | Examples |
| ------------ | ------------------------------------------------------------------------------------------------- | -------- |
| errorMessage | You can customize the error message presented to the user.                                        | ERROR!   |
| cclimit      | Specify the number of mentions to restrict via ActivityPub. If not specified, it defaults to '6'. | 6        |
| atlimit      | Specify the maximum number of mentions (@) for users.If not specified, it defaults to '3'.        | 3        |

atLimit will **NOT** affect the number of people mentioned in the reply.

## Credits

[shrimpia/great-ebichiri-wall](https://github.com/shrimpia/great-ebichiri-wall)

## License

CC0
