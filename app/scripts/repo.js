const avatarImg = document.getElementById('avatar-img');
const tituloRepo = document.getElementById('titulo-repo');
const descricao = document.getElementById('descricao');
const linguagem = document.getElementById('linguagem');

const buscaDados = async () => {
    try{
        const {searchParams} = new URL(window.location.href)
        const repositorio = searchParams.get('repositorio')

        if(repositorio){
            const response = await fetch(`https://api.github.com/repos/${repositorio}`);
            const {name, description, language, owner:{avatar_url}} = await response.json();
            return {name, description, language, avatar_url}
        }else{
            window.location.href = '/'
        }
    } catch(error)
    {
        window.location.href = '/'
    }
}

const renderizaPag = async () => {
    const data = await buscaDados();

    if(!data) return;

    avatarImg.src = data.avatar_url
    descricao.innerText = data.description
    linguagem.innerText = data.language
    tituloRepo.innerText = data.name


    switch (data.language) {
        case 'JavaScript': 
            linguagem.style.backgroundColor = 'yellow';
            break;
        case 'CSS': 
            linguagem.style.backgroundColor = 'orange';
            break;
        case 'Python': 
            linguagem.style.backgroundColor = 'purple';
            break;
        case 'HTML': 
            linguagem.style.backgroundColor = "blue";
            break;
        default: 
            linguagem.style.backgroundColor = "green";
    }

}

renderizaPag()