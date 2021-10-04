# VanillaSAP

Vanilla JS のSPAサンプル

## 開発環境
node v14系のインストールが必要（他のバージョンでも動くかもしれないが未確認）

## 初回セットアップ
クローン後以下のコマンドでnodeモジュールをインストールする
```shell
npm install
```

## ローカルでの動かし方

以下のコマンドでローカルWEBサーバーを起動。
```shell
npm run serve
```

起動後 http://localhost:8000 からアプリケーションを表示

## ビルド方法

以下のコマンドでsassファイルの監視および自動コンパイル
```shell
npm run sass-watch
```

本番環境へは以下のコマンドでバンドルした `application.bundle.js` をデプロイする。  
（index.htmlのJavaScriptの参照も変更する必要あり）

```shell
npm run webpack
```
