# gRPC-WEB

## 内容

ブラウザから文字列を入力して送信ボタンを押すと、gRPC通信でサーバー側のメソッドを実行する。
ブラウザでは直接gRPC通信出来ないため、envoyというプロキシサーバーが必要。

* grpc-client：javascript(React.js)
* gRPC-server：Golang(WSL2)
* proxy：envoy(コンテナ)

## 環境構築手順(WSL2)

* protobufインストールする

```
$ brew install protobuf
$ protoc --version
```

* コンテナを立てる

```
$ docker-compose build
$ docker-compose up -d
(エラーが発生した場合)
$ sudo docker compose up -d --build
```

## 実行

* スクリプトを実行

```
$ bash gen.sh
```

* サーバー

```
$ cd ./server
$ go run main.go
```

* クライアント

```
$ cd ./client
$ yarn
$ npm run start
```

## 注意点

envoy.yamlの61行目のIPアドレスはWSL2のIPアドレスを指定しないと、サーバーに接続できない。

## 参考サイト

https://qiita.com/kitauji/items/c7d1e7fff7eb3e311f6f
