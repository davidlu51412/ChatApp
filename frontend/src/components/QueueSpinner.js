import React from "react";
import Spinner from "react-bootstrap/Spinner";

function QueueSpinner() {
  return (
    <main class="h-screen text-white">
      <div
        style={{ marginLeft: -100, marginTop: -50 }}
        class="absolute top-2/4 left-2/4 text-center"
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
        <div class="">finding a potential chat</div>
      </div>
    </main>
  );
}

export default QueueSpinner;
