document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");
    let isOpen = false;

    if (!menuBtn || !dropdownMenu) return; // segurança

    menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        menuBtn.innerHTML = isOpen ? "&times;" : "&#9776;";

        if (isOpen) {
            dropdownMenu.style.display = "flex";
            document.body.classList.add("menu-open");
            requestAnimationFrame(() => {
                dropdownMenu.classList.add("show");
            });
        } else {
            dropdownMenu.classList.remove("show");
            document.body.classList.remove("menu-open");
            setTimeout(() => {
                dropdownMenu.style.display = "none";
            }, 400);
        }
    });
});
