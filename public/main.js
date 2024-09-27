var socket = io.connect("http://localhost:8000", {
  forceNew: true,
});

socket.on("messages", function (data) {
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `
    <div>
        <strong>${elem.autor}</strong>
        <em>${elem.text}</em>
    </div>
        `;
    })
    .join("");
  document.getElementById("messages").innerHTML = html;
}

function addMenssage(e) {
  var message = {
    autor: document.querySelector("#username").value,
    text: document.querySelector("#texto").value,
  };
  socket.emit("new-message", message);
  return false;
}
