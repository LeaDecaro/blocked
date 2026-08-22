/* ============================================================
   COMPLEJO NEUQUÉN — JAVASCRIPT
   Controla menú móvil, galería, lightbox,
   animaciones y elementos interactivos.
   ============================================================ */


/* ============================================================
   ELEMENTOS PRINCIPALES
   ============================================================ */

const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".main-nav a");

const year = document.getElementById("year");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

const galleryItems = document.querySelectorAll(".gallery-item");


/* ============================================================
   AÑO AUTOMÁTICO DEL FOOTER
   ============================================================ */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ============================================================
   HEADER — CAMBIA AL HACER SCROLL
   ============================================================ */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* ============================================================
   MENÚ MÓVIL
   ============================================================ */

function setMenu(open) {

    if (!header || !menuToggle) return;

    header.classList.toggle("menu-open", open);

    document.body.classList.toggle("menu-open", open);

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuToggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
    );
}


/* Abrir / cerrar menú */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            header.classList.contains("menu-open");

        setMenu(!isOpen);

    });

}


/* Cerrar menú al tocar un enlace */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        setMenu(false);

    });

});


/* ============================================================
   TECLA ESCAPE
   ============================================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        setMenu(false);

        closeLightbox();

    }

});


/* ============================================================
   LIGHTBOX — GALERÍA DE FOTOS
   ============================================================ */

function openLightbox(src, alt) {

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;

    lightboxImage.alt =
        alt || "Imagen de Complejo Neuquén";

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "lightbox-open"
    );

    if (lightboxClose) {
        lightboxClose.focus();
    }
}


/* Cerrar lightbox */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lightbox-open"
    );

    window.setTimeout(() => {

        if (
            !lightbox.classList.contains("open") &&
            lightboxImage
        ) {

            lightboxImage.src = "";

        }

    }, 250);

}


/* ============================================================
   ACTIVAR LIGHTBOX EN LAS FOTOS
   ============================================================ */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        const image =
            item.dataset.image;

        const alt =
            item.dataset.alt;

        if (image) {

            openLightbox(
                image,
                alt
            );

        }

    });

});


/* ============================================================
   BOTÓN CERRAR LIGHTBOX
   ============================================================ */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* ============================================================
   CERRAR LIGHTBOX TOCANDO FUERA DE LA FOTO
   ============================================================ */

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* ============================================================
   ANIMACIONES AL HACER SCROLL
   ============================================================ */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        obs.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });


} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* ============================================================
   CERRAR MENÚ SI PASAMOS A PC
   ============================================================ */

window.addEventListener("resize", () => {

    if (window.innerWidth >= 1000) {

        setMenu(false);

    }

});


/* ============================================================
   EVITAR SCROLL DEL BODY CUANDO EL MENÚ ESTÁ ABIERTO
   ============================================================ */

function updateBodyScroll() {

    if (
        document.body.classList.contains(
            "menu-open"
        )
    ) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "";

    }

}


/* Observar cambios del menú */

if (header) {

    const menuObserver =
        new MutationObserver(() => {

            updateBodyScroll();

        });

    menuObserver.observe(
        header,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

}


/* ============================================================
   SMOOTH SCROLL PARA ENLACES INTERNOS
   ============================================================ */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }

            const target =
                document.querySelector(
                    targetId
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* ============================================================
   FIN DEL SCRIPT
   ============================================================ */

