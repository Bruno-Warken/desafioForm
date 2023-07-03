const form = document.querySelector('#formPagina2');
let isvalidForm;

form.addEventListener('submit', evento => {

    evento.preventDefault();

    formValues = Object.fromEntries(new FormData(evento.target));

    validateForm();

    if(isvalidForm == true){

        const formPagina2 = document.querySelector('#formPagina2');
        const outputForm = document.querySelector('#outputForm');
        const fotoPerfilOutput = document.querySelector('#fotoPerfilOutput');
        const fotoPerfilForm = document.querySelector("#fotoPerfil");

        fotoPerfilOutput.src = fotoPerfilForm.src;

        formPagina2.style.display = 'none';
        outputForm.style.display = 'block';

        document.querySelector('#nomeOutput').innerText = `Nome completo: ${formValues.nome} ${formValues.sobrenome}`;
        document.querySelector('#cpfOutput').innerText = `CPF: ${formValues.cpf}`;
        document.querySelector('#emailOutput').innerText = `Email: ${formValues.email}`;
        document.querySelector('#cepOutput').innerText = `Cep: ${formValues.cep}`;
        document.querySelector('#enderecoOutput').innerText = `Endereço: ${formValues.endereco}`;
        document.querySelector('#dataNascimentoOutput').innerText = `Data de Nascimento: ${formValues.dataNascimento}`;
        document.querySelector('#filhosOutput').innerText = `Número de Filhos: ${formValues.filhos}`;
        document.querySelector('#jogoFavoritoOutput').innerText = `Jogo Favorito: ${formValues.jogoFavorito}`;
        document.querySelector('#corFavoritaOutput').innerText = `Cor Favorita: ${formValues.corFavorita}`;

        function voltar(){
            formPagina2.style.display = 'block';
            outputForm.style.display = 'none';
        }
    }
        
})

function validateForm(){
    if (formValues.nome.trim() === '') {
        setError(nome, 'Nome é requerido');
        isvalidForm = false;
    } else {
        setSuccess(nome);
        isvalidForm = true;
    }

    if (formValues.sobrenome.trim() === '') {
        setError(sobrenome, 'Sobrenome é requerido');
        isvalidForm = false;
    } else {
        setSuccess(sobrenome);
        isvalidForm = true;
    }

    if (formValues.cpf.trim() === '') {
        setError(cpf, 'CPF é requerido');
        isvalidForm = false;
    } else if (!isValidCpf(formValues.cpf)) {
        setError(cpf, 'Por gentileza, informe um CPF válido');
        isvalidForm = false;
    } else {
        setSuccess(cpf);
        isvalidForm = true;
    }

    if (formValues.email.trim() === '') {
        setError(email, 'Email é requerido');
        isvalidForm = false;
    } else if (!isValidEmail(formValues.email)) {
        setError(email, 'Por gentileza, informe um email válido');
        isvalidForm = false;
    } else {
        setSuccess(email);
        isvalidForm = true;
    }

    if (formValues.cep.trim() === '') {
        setError(cep, 'Cep é requerido');
        isvalidForm = false;
    } else if (!isValidCep(formValues.cep)) {
        setError(cep, 'Por gentileza, informe um cep válido');
        isvalidForm = false;
    } else {
        setSuccess(cep);
        isvalidForm = true;
    }

    if (formValues.endereco.trim() === '') {
        setError(endereco, 'Endereço é requerido');
        isvalidForm = false;
    } else {
        setSuccess(endereco);
        isvalidForm = true;
    }

    if (formValues.dataNascimento.trim() === '') {
        setError(dataNascimento, 'Endereço é requerido');
        isvalidForm = false;
    } else {
        setSuccess(dataNascimento);
        isvalidForm = true;
    }

    if (formValues.jogoFavorito.trim() === '') {
        setError(jogoFavorito, 'Jogo favorito é requerido');
        isvalidForm = false;
    } else {
        setSuccess(jogoFavorito);
        isvalidForm = true;
    }
}

function previewFile(){
    const preview = document.querySelector("#fotoPerfil");
    const file = document.querySelector("input[type=file]").files[0];
    const fotoPerfilDisplay = document.querySelector('.displayFotoPerfil');
    const reader = new FileReader();
  
    reader.addEventListener("load",() => {
        fotoPerfilDisplay.style.display = 'block';
        preview.src = reader.result;
    },false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

// Muda a cor do botão de acordo com a cor selecionada pelo usuário

corFavorita.addEventListener('input', () => {
    const corFavorita = document.querySelector('#corFavorita').value;
    const corFavoritaHsl = hexToHSL(corFavorita);
    document.documentElement.style.setProperty('--themeColor', corFavorita);

    if(corFavoritaHsl.lightness*100 <= 50){
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

    errorDisplay.innerText = '';
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