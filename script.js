const form = document.querySelector('#form');
const mensagemErro = document.querySelector('.errorLogin');

form.addEventListener('submit', evento =>{

    evento.preventDefault();

    let usuarioEncontrado;
    const formValues = Object.fromEntries (new FormData(evento.target));

    for (let i = 0; i < array.length; i++) {
    
        if(formValues.username == array[i].username && formValues.password == array[i].password){
            usuarioEncontrado = true;
            break;
        }else{
            usuarioEncontrado = false;
        }
    }

    if(usuarioEncontrado == false){
        mensagemErro.style.display = 'block'
        mensagemErro.innerHTML = 'Verifique os dados informados.'
    }else{
        mensagemErro.style.display = 'none'
        mensagemErro.innerHTML = ''
        window.location.href = "page2.html"
    }
});

class Usuario{
    username = '';
    password = '';

    constructor(usuario,senha){
        this.username = usuario;
        this.password = senha;
    }
}

const user1 = new Usuario('Bruno', '123');
const user2 = new Usuario('Rafaela', '456');
const user3 = new Usuario('Jacobi', '789');
let array = [user1, user2, user3];