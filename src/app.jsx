import React from "react";
import ReactDOM from "react-dom";
import App from "./Containers/App/App";
if (process.env.NODE_ENV == "development") {
  if (window.EventSource) {
    const source = new EventSource("/files-changed");

    source.addEventListener(
      "message",
      function (e) {
        if (e.data) {
          location.reload();
        }
      },
      false
    );

    source.addEventListener(
      "open",
      function (e) {
        console.log("Connected");
      },
      false
    );

    source.addEventListener(
      "error",
      function (e) {
        //const id_state = document.getElementById('state')
        if (e.eventPhase == EventSource.CLOSED) source.close();
        if (e.target.readyState == EventSource.CLOSED) {
          //id_state.innerHTML =
          console.log("Disconnected");
        } else if (e.target.readyState == EventSource.CONNECTING) {
          // id_state.innerHTML =
          console.log("Connecting...");
        }
      },
      false
    );
  } else {
    console.log("Your browser doesn't support SSE");
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
