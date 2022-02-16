const today = new Date();

function addZero(number) {
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}
class User {
    constructor(name, surname, date, nickname, password) {
        this.name = name;
        this.surname = surname;
        this.date = date;
        this.nickname = nickname;
        this.password = password;
        this.age = this.myAge();
    }
    myAge() {
        const birthDate = new Date(this.date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDifferece = today.getMonth() - birthDate.getMonth();
        if (monthDifferece < 0 || (monthDifferece === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
const allUsersArray = [];

function labelGenerator(forId, innerText) {
    const label = document.createElement('label');
    label.setAttribute('for', forId);
    label.innerText = innerText;
    return label;
}

function inputGenerator(id, type) {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    return input;
}

function buttonGenerator(type, innerHTML) {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.innerHTML = innerHTML;
    return button;
}

function formGenerator(...elements) {
    document.getElementById('container').style.display = "none";
    const form = document.createElement('form');
    elements.forEach(item => {
        form.append(item);
    });
    document.querySelector('main').append(form);
    return form;
}
document.getElementById('register').addEventListener('click', () => {
    const nameLabel = labelGenerator("name", "Name :");
    const nameInput = inputGenerator('name', 'text');
    const surnameLabel = labelGenerator('surname', 'Surname :');
    const surnameInput = inputGenerator('surname', 'text');
    const dateLabel = labelGenerator('date', 'Date of Birth :');
    const dateInput = inputGenerator('date', 'date');
    const nickNameLabel = labelGenerator('nickname', 'Nickname :');
    const nickNameInput = inputGenerator('nickname', 'text');
    const passwordLabel = labelGenerator('password', 'Password :');
    const passwordInput = inputGenerator('password', 'password');
    const button = buttonGenerator('submit', 'Register');
    dateInput.setAttribute('max', `${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())}`);
    const form = formGenerator(nameLabel, nameInput, surnameLabel, surnameInput, dateLabel, dateInput, nickNameLabel, nickNameInput, passwordLabel, passwordInput, button);
    form.addEventListener('submit', (event) => {
        let check = false;
        event.preventDefault();
        [nameInput.value, surnameInput.value, dateInput.value, nickNameInput.value, passwordInput.value].forEach(item => {
            if (item.length === 0) {
                alert("Fill all the data");
                check = true;
                return;
            }
        });
        allUsersArray.forEach(item => {
            if (item.nickname == nickNameInput.value) {
                alert('Nickname already used');
                check = true;
                return;
            }
        });
        if (!check) {
            const newUserJson = new User(nameInput.value, surnameInput.value, dateInput.value, nickNameInput.value, passwordInput.value);
            allUsersArray.push(newUserJson);
            form.remove();
            const confirmation = document.createElement('h1');
            const refresh = buttonGenerator('button', 'Return to Homepage');
            confirmation.innerText = "Registration Successfull!";
            confirmation.style.textAlign = "center";
            document.querySelector('main').append(confirmation);
            document.querySelector('main').append(refresh);
            refresh.addEventListener('click', () => {
                confirmation.remove();
                refresh.remove();
                document.getElementById('container').style.display = "flex";
            });
        } else {
            return;
        }
    });
});
document.getElementById('login').addEventListener('click', () => {
    const nickNameLabel = labelGenerator('nickname', 'Nickname :');
    const nickNameInput = inputGenerator('nickname', 'text');
    const passwordLabel = labelGenerator('password', 'Password :');
    const passwordInput = inputGenerator('password', 'password');
    const button = buttonGenerator('submit', 'Log In');
    const form = formGenerator(nickNameLabel, nickNameInput, passwordLabel, passwordInput, button);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let currentUser;
        allUsersArray.forEach(item => {
            if (item.nickname == nickNameInput.value && item.password == passwordInput.value) {
                currentUser = JSON.parse(JSON.stringify(item));
            }
        });
        if (!currentUser) {
            alert('Wrong data or User not found');
            return;
        } else {
            form.remove();
            const result = document.createElement('h1');
            result.innerHTML = `Login Successfull<br />
            Name: ${currentUser.name}<br />
            Surname: ${currentUser.surname}<br />
            Age: ${currentUser.age}`;
            result.style.textAlign = 'center';
            const refresh = buttonGenerator('button', 'Return to Homepage');
            document.querySelector('main').append(result);
            document.querySelector('main').append(refresh);
            refresh.addEventListener('click', () => {
                result.remove();
                refresh.remove();
                document.getElementById('container').style.display = "flex";
            });
        }
    });
});