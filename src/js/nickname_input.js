const nicknameInput = document.getElementById("nickname_input");
const startButton = document.getElementById("start_button");

nicknameInput.addEventListener("input", () => {
    startButton.disabled = nicknameInput.value.trim() === "";
});
