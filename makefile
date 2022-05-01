server:
	cd ./server && go run main.go

client:
	cd ./client && \
		npx webpack --mode=development client.js && \
		yarn static -p 8081
