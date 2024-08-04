const btnHeader = document.getElementById('btn-header');
const iconeTema = document.getElementById("img-tema");


const aplicaTema = tema => {
    if (tema == 'dark'){
        document.body.classList.remove('bg-white');
        document.body.classList.add('bg-slate-900', 'text-zinc-400');
        btnHeader.classList.add('bg-zinc-400');

    }else{
        btnHeader.classList.remove('bg-zinc-400');

        document.body.classList.remove('bg-slate-900', 'text-zinc-400');
        document.body.classList.add('bg-white');

    }
}

const trocaTema = () => {
    let temaAtual = localStorage.getItem('tema') || 'light';
    let novoTema = temaAtual == 'light' ? 'dark': 'light'
    localStorage.setItem('tema', novoTema)

    trocaIcone(novoTema)
    aplicaTema(novoTema)
}

const trocaIcone = tema => {
    iconeTema.src = tema == 'light' ? 'app/img/moon.png': 'app/img/sun.png';
}

const inicializarTema = () => {
    let tema = localStorage.getItem('tema') || 'light';
    trocaIcone(tema);
    aplicaTema(tema);
}

inicializarTema();

btnHeader.addEventListener('click', trocaTema)
