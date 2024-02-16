# グレートエビチリウォール

Cloudflare Workersで動作するMisskey APIおよびActivityPub inboxへのNGワードフィルターです。

シュリンピア帝国内での利用を想定して開発していますが、Cloudflareに通したMisskeyという環境であれば、よそでもおそらく動くと思います。

## 利用方法

1. デプロイする
  ```
  pnpm i
  pnpm run deploy
  ```

2. KVに「badWords」というキーでNGワードを登録する（ `;` で区切ると複数個登録できます）

3. Workers Routesにルートを追加する
  - `あなたのドメイン/api/notes/create`
  - `あなたのドメイン/api/i/update`
  - `あなたのドメイン/inbox`
  - `あなたのドメイン/users/*`

## ライセンス

CC0
