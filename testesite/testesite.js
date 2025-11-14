const menu = document.getElementById("menu");
const links = document.getElementById("linksMenuu");
const pagLivros = document.getElementById('livros')
const aLivros = document.getElementById('aLivros')
const noticias = document.getElementById('noticias')
const aNoticias = document.getElementById('aNoticias')

menu.addEventListener ("click", ()=>{

    if (links.style.display === "none"){
        links.style.display = "block"
    }
    else{
        links.style.display = "none"
    }
})

pagLivros.addEventListener ("click", ()=>{

    aLivros.click()
})

noticias.addEventListener ("click", ()=>{

    aNoticias.click()
})

    