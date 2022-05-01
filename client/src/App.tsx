import * as React from "react";
import "./App.css";

import { HelloRequest } from "./hello/hello_pb";
import { GreeterClient } from "./hello/HelloServiceClientPb";

const initialState = {
  inputText: "World",
  message: ""
};
type State = Readonly<typeof initialState>;

class App extends React.Component<{}, State> {
  public readonly state: State = initialState;

  public render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Send!</button>
        <p>{this.state.message}</p>
      </div>
    );
  }

  private onClick = () => {
    const request = new HelloRequest();
    request.setName(this.state.inputText);

    // const client = new GreeterClient("http://172.25.0.2:9000", {}, {});
    const client = new GreeterClient("http://localhost:9000", {}, {});
    client.sayHello(request, {}, (err, ret) => {
      // console.log("error");
      if (err || ret === null) {
        throw err;
      }
      this.setState({ message: ret.getMessage() });
    });
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;
