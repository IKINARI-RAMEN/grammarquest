# Grammar Quest

中学英語から高校3年生までの英文法を、クイズ形式で学べる静的サイトです。PC・スマートフォンに対応し、回答解説、学年別フィルター、XP・正解数の保存（ブラウザーの localStorage）を備えています。

## ローカルで見る

`index.html` をブラウザーで開いてください。ビルドやサーバーは不要です。

## GitHub Pages で公開する

1. このフォルダーのファイルを GitHub リポジトリのルートに push します。
2. GitHub のリポジトリ設定で **Pages** を開きます。
3. **Build and deployment** の Source を **GitHub Actions** にします。
4. `main` ブランチへの push 後、Actions の **Deploy to GitHub Pages** が完了すると公開されます。

## 問題を追加する

`script.js` の `bank` 配列に問題を追加します。`group` は `middle`、`high1`、`high2`、`high3` のいずれかです。選択肢は4つ、`answer` は正解の0始まりの番号です。
