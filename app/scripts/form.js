const formulario = document.getElementById('form');
const input = formulario.querySelector('input');
const butao = formulario.querySelector('button');
let lista = JSON.parse(localStorage.getItem('listaRepo')) || [];
const listaContainer = document.getElementById('listaDeRepositorios');

// função que está aguardando uma resposta do servidor a qual a requisação está sendo feita,
//onde utilza do async para ter a possibilidade de parar o codigo para aguardar a resposta, 
//juntamente com o await que realmente faz com que a determinda função pare e aguarde.
const buscaDadosdoRepo = async repositorio => {
    try{
        const response = await fetch(`https://api.github.com/repos/${repositorio}`);
        const {full_name, owner:{avatar_url}} = await response.json();
        adicionaRepositorio({full_name, avatar_url})
    }catch(error)
    {
        alert(error)
    }

}

// Função para escutar o evento de submit do form e chamar as outras funções
formulario.addEventListener('submit', async (e)=> {
    e.preventDefault();
    if(!input.value) return;

    butao.disabled = true
    await buscaDadosdoRepo(input.value);
    butao.disabled = false

    carregaLista();
})

const adicionaRepositorio = item => {
    lista = [...lista, item]
    localStorage.setItem('listaRepo', JSON.stringify(lista));
}

const carregaLista = () => {
    listaContainer.innerHTML = ''
    if(lista.length > 0){
        lista.forEach(item => {
            listaContainer.innerHTML += `<li class='border border-gray-700 rounded-md p-3 flex gap-2 justify-start items-center'>
                                            <img class='w-[40px] rounded-full' src=${item.avatar_url}>
                                            <p>
                                                <a href='repositorio.html?repositorio=${item.full_name}'>${item.full_name}</a>
                                            </p>
                                         </li>`
        });
    }
}

carregaLista();



// https://api.github.com/repos/$%7BrepoName[0]%7D/$%7BrepoName[1]%7D
