package main

import (
	"fmt"
	"log"
	"net"

	pb "github.com/gushikem01/grpc-sample/protocol"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":50051"
)

// server is used to implement hello.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements hello.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	fmt.Println("execute ok")
	return &pb.HelloReply{Message: "Hello: " + in.Name}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		fmt.Println(err)
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	// pb.RegisterGreeterServer(s, &server{})
	pb.RegisterGreeterServer(s, &server{})

	// Register reflection service on gRPC server.
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		fmt.Println(err)
		log.Fatalf("failed to serve: %v", err)
	}
}
