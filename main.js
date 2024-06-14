const keys = [
    [
        ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], 
        ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], 
        ["'", "?"], ["¿", "¡"], ["DELETE", "DELETE"]
    ],
    [
        ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], 
        ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], 
        ["´", "¨"], ["+", "*"]
    ],
    [
        ["MAYUS", "MAYUS"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], 
        ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], 
        ["ñ", "Ñ"], ["{", "["], ["+", "*"], ["ENTER", "ENTER"]
    ],
    [
        ["SHIFT", "SHIFT"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], 
        ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], 
        [".", ":"], ["-", "_"], 
    ],
    [
        ["SPACE", "SPACE"]
    ]
];

let mayus = false;
let shift = false;
let current = null;

renderkeyboard();

function renderkeyboard() {
    const keyboardContainer = document.querySelector('#keyboard-container');
    let empty = `<div class="key-empty"></div>`;

    const layers = keys.map((layer) => {
        return layer.map(key => {
            if (key[0] === 'SHIFT') {
                return `<button class="key key-shift">${key[0]}</button>`;
            }
            if (key[0] === "MAYUS") {
                return `<button class="key key-mayus">${key[0]}</button>`;
            }
            if (key[0] === "SPACE") {
                return `<button class="key key-space"></button>`;
            }
            if (key[0] === "DELETE") {
                return `<button class="key key-delete">${key[0]}</button>`;
            }
            if (key[0] === "ENTER") {
                return `<button class="key key-enter">${key[0]}</button>`;
            }

            return `
                <button class="key key-normal">
                    ${shift ? key[1] : (mayus && key[0].toLowerCase().charCodeAt(0) >= 97 && key[0].toLowerCase().charCodeAt(0) <= 122) ? key[1] : key[0]}
                </button>
            `;
        });
    });

    layers[0].push(empty);
    layers[1].unshift(empty);

    const htmllayers = layers.map((layer) => {
        return layer.join("");
    });

    keyboardContainer.innerHTML = "";

    htmllayers.forEach((layer) => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
    });

    document.querySelectorAll('.key').forEach((key) => {
        key.addEventListener('click', (e) => {
            if (current) {
                if (key.textContent === "SHIFT") {
                    shift = !shift;
                } else if (key.textContent === 'MAYUS') {
                    mayus = !mayus;
                } else if (key.textContent === "") {
                    current.value += " ";
                } else if (key.textContent === "DELETE") {
                    current.value = current.value.slice(0, -1);
                } else if (key.textContent === "ENTER") {
                    alert(current.value); 
                    current.value = '';
                } else {
                    current.value += key.textContent.trim();
                    if (shift) {
                        shift = false;
                    }

                    const keySound = document.getElementById('key-sound');
                    keySound.currentTime = 0; // Reiniciar el sonido si ya está en reproducción
                    keySound.play();
                }

                renderkeyboard();
                current.focus();
            }
        });
    });
}

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener('focusin', (e) => {
        current = e.target;
    });
});
