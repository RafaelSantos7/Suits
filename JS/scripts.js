// Seleção de elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
//declarado dessa forma abaixo faz com que os links sejam colocados todos dentro de uma lista só
const allLinks = [...desktopLinks, ...mobileLinks];

const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
let slideIndex = 0;

// Funções
//função para scroll suave
function smoothScroll(e) {
  //faz com que ao clicar no menu, não apareça na url, deixando a url menos poluida
  e.preventDefault();
  
  //pegando o href e mostrando onde eu clique e o que deve aparecer
  const href = this.getAttribute("href");
  //offsetTop faz com que saiba onde começa a seção da pagina no html e ao clicar no menu, va exatamente ao local determinado
  const offsetTop = document.querySelector(href).offsetTop;

  //Fazendo o scroll levar exatamente ao inicio do elemento selecionado
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });

   //setTimeOut faz com que na parte mobile, ao clicar no elemento desejado, feche o menu automaticamente depois de 0.5 segundos
  setTimeout(() => {
    //if criado para saber se o menu esta aberto ou fechado (mobile)
    if (menu.classList.contains("menu-active")) {
      menu.classList.remove("menu-active");
    }
  }, 500);//0.5 segundos
}

function showSlides() {
  //for criado para fazer um loop e sempre que um slide for removido o proximo ja apareça, assim mostra todos os slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  //iniciando na posição zero e acrescentando mais um, ou seja o proximo slide
  slideIndex++;

  //verificação criada para que sempre que os slides acabem, para que volte ao primeiro slide
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

   //fazendo com que o slide volte sempre para o primeiro ao chegar no ultimo slide
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  //vai ficar auto se invocando e trocando o slide a cada 3 segundos
  setTimeout(showSlides, 3000);
}

// Eventos
//declarando as variaveis em um array->(lista). O método forEach é usado para percorrer arrays.
[menuBtn, closeMenuBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    menu.classList.toggle("menu-active");//toogle faz com que se a classe estiver ele retira e senão ele coloca
  });
});

//Eventos para os links
allLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

// Inicialização
showSlides();