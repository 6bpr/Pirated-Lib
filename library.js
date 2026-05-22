document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector('.manga-button');
    const panel = document.querySelector('.manga-panel');

    // simple hover effect
    button.addEventListener('mouseenter', () => {
        panel.style.transform = 'scale(1.01)';
    });

    button.addEventListener('mouseleave', () => {
        panel.style.transform = 'scale(1)';
    });

});

// 🔐 HARD CODED CREDENTIALS
const credentials = {
    username: 'Mee',
    email: 'mee@gmail.com',
    password: 'mee12345678'
};

// 💥 LOGIN FUNCTION
function login() {

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    const buttonText = document.querySelector('.button-text');
    const buttonJP = document.querySelector('.button-japanese');
    const button = document.querySelector('.manga-button');
    const panel = document.querySelector('.manga-panel');

    // loading state
    button.disabled = true;
    button.style.opacity = '0.7';
    button.style.cursor = 'not-allowed';

    buttonText.textContent = "Checking...";
    buttonJP.textContent = "確認中";

    setTimeout(() => {

        if (
            username === credentials.username &&
            email === credentials.email &&
            password === credentials.password
        ) {
            buttonText.textContent = "Success!";
            buttonJP.textContent = "成功";

            msg.style.color = "green";
            msg.textContent = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } else {
            msg.style.color = "red";
            msg.textContent = "Invalid credentials!";

            // 🔥 VIBRATION / SHAKE EFFECT
            panel.classList.remove('shake');
            void panel.offsetWidth; // restart animation
            panel.classList.add('shake');

            buttonText.textContent = "Login";
            buttonJP.textContent = "ログイン";

            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        }

    }, 800);
}