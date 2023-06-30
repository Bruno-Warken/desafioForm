const form = document.querySelector('#formPagina2');

form.addEventListener('submit', evento => {

    evento.preventDefault();

    formValues = Object.fromEntries(new FormData(evento.target));

    if (formValues.nome.trim() === '') {
        setError(nome, 'Nome é requerido');
    } else {
        setSuccess(nome);
    }

    if (formValues.sobrenome.trim() === '') {
        setError(sobrenome, 'Sobrenome é requerido');
    } else {
        setSuccess(sobrenome);
    }

    if (formValues.cpf.trim() === '') {
        setError(cpf, 'CPF é requerido');
    } else if (!isValidCpf(formValues.cpf)) {
        setError(cpf, 'Por gentileza, informe um CPF válido');
    } else {
        setSuccess(cpf);
    }

    if (formValues.email.trim() === '') {
        setError(email, 'Email é requerido');
    } else if (!isValidEmail(formValues.email)) {
        setError(email, 'Por gentileza, informe um email válido');
    } else {
        setSuccess(email);
    }

    if (formValues.cep.trim() === '') {
        setError(cep, 'Cep é requerido');
    } else if (!isValidCep(formValues.cep)) {
        setError(cep, 'Por gentileza, informe um cep válido');
    } else {
        setSuccess(cep);
    }

    if (formValues.endereco.trim() === '') {
        setError(endereco, 'Endereço é requerido');
    } else {
        setSuccess(endereco);
    }

    if (formValues.dataNascimento.trim() === '') {
        setError(dataNascimento, 'Endereço é requerido');
    } else {
        setSuccess(dataNascimento);
    }

    if (formValues.jogoFavorito.trim() === '') {
        setError(jogoFavorito, 'Jogo favorito é requerido')
    } else {
        setSuccess(jogoFavorito);
    }

    console.log(formValues);
})

// Muda a cor do botão de acordo com a cor selecionada pelo usuário

corFavorita.addEventListener('input', () => {
    const corFavorita = document.querySelector('#corFavorita').value;
    const corFavoritaHsl = hexToHSL(corFavorita);
    document.documentElement.style.setProperty('--themeColor', corFavorita);

    if(corFavoritaHsl.lightness*100 < 50){
        document.documentElement.style.setProperty('--botaoTextColor', '#fff');
    }else{
        document.documentElement.style.setProperty('--botaoTextColor', '#000');
    }
})

// Funções

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorValidation');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorValidation');

    errorDisplay["imagem" + i] = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

// Função que verifica se o email digitado é válido
function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

// Função que verifica se o CEP digitado é válido
function isValidCep(cep) {
    const regex = /^([0-9]){5}(-){1}([0-9]){3}$/;
    return regex.test(String(cep));
}

// Função que verifica se o CPF digitado é válido
function isValidCpf(cpf) {
    const regex = /^([0-9]){3}(\.){1}([0-9]){3}(\.){1}([0-9]){3}(-){1}([0-9]){2}$/;
    return regex.test(String(cpf));
}

// Função que converte hexadecimal para hsl
function hexToHSL(hex) {

    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h
    let s
    let l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;

        if (l > 0.5) {
            s = d / (2 - max - min);
        } else {
            s = d / (max + min);
        }

        switch (max) {

            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    let HSL = {
        hue: h,
        saturation: s,
        lightness: l
    };
    return HSL;
}