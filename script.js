var previousLink;

function ChangeTab(link, elementToDisplay){
    if (previousLink === link) return;

    // let burgerMenu = document.getElementById("burger-menu");

    // console.log(burgerMenu)

    // if(burgerMenu.classList.contains("home-icon-link")){
    //     showOrHideMenu();
    // }

    previousLink = link;

    // menu links
    let linkClass = "active-link";

    let activeLink = document.getElementById("menu").getElementsByClassName(linkClass)[0];
    activeLink?.classList.remove(linkClass);
    link.classList.add(linkClass);
    //

    // content to display
    let itemClass = "item";
    let activeItemClass = "active-item";
    let flex = "flex";

    let activeItem = document.getElementById("content").getElementsByClassName(activeItemClass)[0];
    let item = document.getElementById(elementToDisplay);

    activeItem?.classList.replace(activeItemClass, itemClass);
    activeItem?.classList.remove(flex);

    item.classList.replace(itemClass, activeItemClass);
    item?.classList.add(flex);
    //
}

function showOrHideMenu(){
    let menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "" || menu.style.display === "")  ? "flex" : "";

    let icon = document.getElementById("burger-menu-icon");
    document.getElementById("burger-menu-icon").innerText = icon.innerText === "menu" ? "close" : "menu";
}