
// Dexie Setup to Use IndexedDB
const db = new Dexie('Passwords');
db.version(1).stores( {items: 'passphrase'} );

const nav_btns = document.querySelectorAll('.main_nav div');

nav_btns.forEach(item => {
    item.addEventListener('click', function (e) {
        if (e.srcElement.classList[0] == "generator_nav") {
            document.querySelector('.savedpass_nav').classList.remove("nav_active");
            document.querySelector('.generator_nav').classList.add("nav_active");
            document.getElementById('generator_page').style.display = '';
            document.getElementById('savedpass_page').style.display = 'none';
        } else {
            document.querySelector('.generator_nav').classList.remove("nav_active");
            document.querySelector('.savedpass_nav').classList.add("nav_active");
            document.getElementById('generator_page').style.display = 'none';
            document.getElementById('savedpass_page').style.display = '';
        }
    });
});

// Generate Password & Display + Copy it

const uppercase = ["Y", "R", "B", "D", "W", "T", "C", "Q", "A", "X", "U", "E", "Z", "V", "S", "F"];
const lowercase = ["c", "h", "p", "e", "j", "a", "n", "g", "k", "i", "d", "m", "l", "f", "o", "b"];
const numbers = [7, 5, 9, 1, 1, 6, 0, 3, 3, 8, 4, 2, 8, 5, 9, 4];
const symbols = ["!", "@", "#", "%", "^", "&", "*", "<", ";", "~", "`", "(", ")", "_", "-"];

const passGenBtn = document.querySelector('.generator_btn');
const passDisplay = document.querySelector('.password_display');
const passCopyBtn = document.querySelector('.password_copy_btn');

passGenBtn.addEventListener('click', () => {
    let password = ``;

    const random1 = Math.floor(Math.random() * 15);
    const random2 = Math.floor(Math.random() * 15);
    const random3 = Math.floor(Math.random() * 15);
    const random4 = Math.floor(Math.random() * 15);
    const random5 = Math.floor(Math.random() * 15);
    const phaseRandom = Math.floor(Math.random() * 5);

    const phase1 = `${uppercase[random1]}${lowercase[random1]}${numbers[random1]}${symbols[random1]}`;
    const phase2 = `${lowercase[random2]}${uppercase[random2]}${numbers[random2]}${symbols[random2]}`;
    const phase3 = `${numbers[random3]}${symbols[random4]}${uppercase[random3]}${lowercase[random3]}`;
    const phase4 = `${uppercase[random4]}${symbols[random4]}${lowercase[random4]}${numbers[random4]}`;
    const phase5 = `${symbols[random5]}${lowercase[random5]}${numbers[random5]}${uppercase[random5]}`;

    switch (phaseRandom) {
        case 0:
            password = `${phase1}${phase2}${phase3}${phase4}${phase5}`;
            break;
        case 1:
            password = `${phase2}${phase1}${phase4}${phase5}${phase3}`;
            break;
        case 2:
            password = `${phase5}${phase2}${phase3}${phase4}${phase1}`;
            break;
        case 3:
            password = `${phase4}${phase2}${phase3}${phase1}${phase5}`;
            break;
        case 4:
            password = `${phase3}${phase5}${phase1}${phase2}${phase2}`;
            break;
        default:
            break;
    }

    passDisplay.value = password;
});

passCopyBtn.addEventListener('click', async () => {
    const passphrase = passDisplay.value; 
    let save = true;

    passDisplay.select();
    passDisplay.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(passDisplay.value);
    alert(`Copied to clipboard: ${passDisplay.value}`);

    // Saving data to IndexedDB
    const items = await db.items.toArray();
    items.map(a => {
        if (a.passphrase == passphrase) {
            save = false;
        }
    });
    if (save) {
        await db.items.add( {passphrase} );
    }else {
        alert("You have already saved this password");
    }
});

// Auto load saved passwords
const savedPassWrapper = document.querySelector('.saved_pass_wrapper');

async function loadData2SavedPass() {
    const items = await db.items.toArray();
    items.map(a => {
        const p = document.createElement('p');
        p.innerText = a.passphrase;
        savedPassWrapper.appendChild(p);
    });
}

loadData2SavedPass();



