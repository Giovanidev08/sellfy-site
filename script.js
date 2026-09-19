/* =====================================================

   HEADER

===================================================== */

const header = document.getElementById("header");

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");



window.addEventListener("scroll", () => {

  header?.classList.toggle(

    "scrolled",

    window.scrollY > 16

  );

});



/* =====================================================

   MENU MOBILE

===================================================== */

menuButton?.addEventListener("click", () => {

  const open =

    navMenu?.classList.toggle("open") ?? false;

  menuButton.setAttribute(

    "aria-expanded",

    String(open)

  );

});



navMenu?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

    menuButton?.setAttribute(

      "aria-expanded",

      "false"

    );

  });

});



/* =====================================================

   ANIMAÇÕES AO ENTRAR NA TELA

===================================================== */

const revealObserver =

  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(

            "visible"

          );

          revealObserver.unobserve(

            entry.target

          );

        }

      });

    },

    {

      threshold:0.12

    }

  );



document

  .querySelectorAll(".reveal")

  .forEach(element => {

    revealObserver.observe(element);

  });



/* =====================================================

   HERO INTERATIVO

===================================================== */

const heroCommand =

  document.getElementById(

    "heroCommand"

  );


const routeStops =

  document.querySelectorAll(

    ".route-stop"

  );


if (heroCommand) {

  heroCommand.addEventListener(

    "mousemove",

    event => {

      if (window.innerWidth <= 700) {

        return;

      }


      const rect =

        heroCommand.getBoundingClientRect();


      const x =

        (event.clientX - rect.left) /

        rect.width -

        0.5;


      const y =

        (event.clientY - rect.top) /

        rect.height -

        0.5;


      heroCommand.style.setProperty(

        "--mx",

        x

      );


      heroCommand.style.setProperty(

        "--my",

        y

      );

    }

  );


  heroCommand.addEventListener(

    "mouseleave",

    () => {

      heroCommand.style.setProperty(

        "--mx",

        "0"

      );


      heroCommand.style.setProperty(

        "--my",

        "0"

      );

    }

  );


  let currentRoute = 0;


  function animateRoute() {

    routeStops.forEach(

      (stop, index) => {

        stop.classList.toggle(

          "active",

          index === currentRoute

        );

      }

    );


    currentRoute =

      (

        currentRoute + 1

      ) %

      routeStops.length;

  }


  if (routeStops.length) {

    setInterval(

      animateRoute,

      1800

    );

  }

}


/* =====================================================

   LOGOS DAS EMPRESAS

===================================================== */

const logoMarquee =

  document.getElementById(

    "logoMarquee"

  );


logoMarquee?.addEventListener(

  "mouseenter",

  () => {

    logoMarquee

      .querySelector(".logo-track")

      ?.style.setProperty(

        "animation-play-state",

        "paused"

      );

  }

);


logoMarquee?.addEventListener(

  "mouseleave",

  () => {

    logoMarquee

      .querySelector(".logo-track")

      ?.style.setProperty(

        "animation-play-state",

        "running"

      );

  }

);


/* =====================================================

   TILT DOS COFUNDADORES

===================================================== */

document

  .querySelectorAll(".tilt-card")

  .forEach(card => {

    card.addEventListener(

      "mousemove",

      event => {

        if (window.innerWidth <= 900) {

          return;

        }


        const rect =

          card.getBoundingClientRect();


        const x =

          (event.clientX - rect.left) /

          rect.width -

          0.5;


        const y =

          (event.clientY - rect.top) /

          rect.height -

          0.5;


        card.style.transform =

          `

          perspective(1100px)

          rotateY(${x * 4}deg)

          rotateX(${y * -3}deg)

          translateY(-5px)

          `;

      }

    );


    card.addEventListener(

      "mouseleave",

      () => {

        card.style.transform = "";

      }

    );

  });


/* =====================================================

   FORMULÁRIO

===================================================== */


/*

  Neste momento o formulário é somente um protótipo.

  Ele valida os dados no navegador,

  mas ainda NÃO salva os leads.

  Para produção será necessário conectar

  a um backend, banco de dados, CRM ou

  serviço de formulários.

*/

const form =

  document.getElementById(

    "leadForm"

  );


const feedback =

  document.getElementById(

    "formFeedback"

  );


form?.addEventListener(

  "submit",

  event => {

    event.preventDefault();


    const data =

      new FormData(form);


    const nome =

      String(

        data.get("nome") || ""

      ).trim();


    const empresa =

      String(

        data.get("empresa") || ""

      ).trim();


    const whatsapp =

      String(

        data.get("whatsapp") || ""

      ).replace(

        /\D/g,

        ""

      );


    /* VALIDAÇÃO */

    if (

      nome.length < 2 ||

      empresa.length < 2 ||

      whatsapp.length < 10

    ) {

      feedback.textContent =

        "Confira nome, empresa e WhatsApp.";

      feedback.style.color =

        "#c63d17";

      return;

    }


    /* SUCESSO DO PROTÓTIPO */

    feedback.textContent =

      `Tudo certo, ${nome.split(" ")[0]}! O protótipo validou o cadastro.`;


    feedback.style.color =

      "#9a3d20";


    form.reset();

  }

);


/* =====================================================

   FEEDBACKS DA SELLFY

===================================================== */

const feedbackSources = [

  "https://sellfygroup.com/wp-content/uploads/2026/06/depoimento-print-1.png",

  "https://sellfygroup.com/wp-content/uploads/2026/06/depoimneto-print-2.png",

  "https://sellfygroup.com/wp-content/uploads/2026/06/depoimento-print-3.png",

  "https://sellfygroup.com/wp-content/uploads/2026/06/depoimento-print-4.png",

  "https://sellfygroup.com/wp-content/uploads/2026/06/depoimento-print-5.png"

];



const modal =

  document.getElementById(

    "feedbackModal"

  );


const modalImage =

  document.getElementById(

    "modalImage"

  );


const modalCounter =

  document.getElementById(

    "modalCounter"

  );


const modalClose =

  document.getElementById(

    "modalClose"

  );


const modalPrev =

  document.getElementById(

    "modalPrev"

  );


const modalNext =

  document.getElementById(

    "modalNext"

  );


let currentFeedback = 0;



/* Abre o feedback */

function showFeedback(index) {

  currentFeedback =

    (

      index +

      feedbackSources.length

    ) %

    feedbackSources.length;


  modalImage.src =

    feedbackSources[

      currentFeedback

    ];


  modalCounter.textContent =

    `${currentFeedback + 1} / ${feedbackSources.length}`;


  modal?.classList.add("open");


  modal?.setAttribute(

    "aria-hidden",

    "false"

  );


  document.body.style.overflow =

    "hidden";

}


/* Fecha */

function closeFeedback() {

  modal?.classList.remove(

    "open"

  );


  modal?.setAttribute(

    "aria-hidden",

    "true"

  );


  document.body.style.overflow =

    "";

}


/* Clique nos cards */

document

  .querySelectorAll(".feedback-card")

  .forEach(card => {

    card.addEventListener(

      "click",

      () => {

        showFeedback(

          Number(

            card.dataset.feedback

          )

        );

      }

    );

  });


/* Botões */

modalClose?.addEventListener(

  "click",

  closeFeedback

);


modalPrev?.addEventListener(

  "click",

  () => {

    showFeedback(

      currentFeedback - 1

    );

  }

);


modalNext?.addEventListener(

  "click",

  () => {

    showFeedback(

      currentFeedback + 1

    );

  }

);


/* Fecha clicando no fundo */

modal?.addEventListener(

  "click",

  event => {

    if (

      event.target === modal

    ) {

      closeFeedback();

    }

  }

);


/* Teclado */

document.addEventListener(

  "keydown",

  event => {

    if (

      !modal?.classList.contains(

        "open"

      )

    ) {

      return;

    }


    if (

      event.key === "Escape"

    ) {

      closeFeedback();

    }


    if (

      event.key === "ArrowLeft"

    ) {

      showFeedback(

        currentFeedback - 1

      );

    }


    if (

      event.key === "ArrowRight"

    ) {

      showFeedback(

        currentFeedback + 1

      );

    }

  }

);