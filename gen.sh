#!/bin/sh

CLIENT_OUTDIR=client/src/hello
SERVER_OUTPUT_DIR=server

mkdir -p ${CLIENT_OUTDIR} ${SERVER_OUTPUT_DIR}

# client
protoc --proto_path=protocol hello.proto \
  --js_out=import_style=commonjs:${CLIENT_OUTDIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTDIR}

# server
protoc --go_out=${SERVER_OUTPUT_DIR} --go_opt=paths=source_relative \
  --go-grpc_out=${SERVER_OUTPUT_DIR} --go-grpc_opt=paths=source_relative \
  protocol/hello.proto
