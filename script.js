var previousParagraph;
var previousTable;

const flex = "flex";
const itemClass = "item";
const menuClass = "menu";
const closeClass = "close";
const activeClass = "active";
const contentClass = "content";
const subMenuClass = "sub-menu";
const expandLess = "expand_less";
const expandMore = "expand_more";
const menuItemClass = "menu-item";
const burgerMenuClass = "burger-menu";
const activeLinkClass = "active-link"; 
const activeItemClass = "active-item";
const noSubmenusClass = "no-submenus";
const openLabsList = "open-labs-list";
const burgerMenuIcon = "burger-menu-icon";
const labsListHidden = "labs-list-hidden";
const visibleTableClass = "table-visible";
const invisibleTableClass = "table-invisible";
const visibleSubMenuClass = "sub-menu-visible";
const activeParagraphClass = "active-paragraph";

function GetPreviousSubmenu(){
    return document.getElementById(menuClass).getElementsByClassName(subMenuClass + ' ' + activeLinkClass)[0];
}

function GetPreviousMenu(){
    return document.getElementById(menuClass).getElementsByClassName(menuItemClass + ' ' + activeLinkClass)[0];
}

function GetPreviousSubmenu(menu){
    return menu.parentNode.getElementsByClassName(subMenuClass + ' ' + activeLinkClass)[0];
}

function ChangeContent(menu, sectionID, paragraphID = null){
    let previousMenu = GetPreviousMenu();

    let hasPreviousSubmenus = !previousMenu.classList.contains(noSubmenusClass);
    
    let previousSubMenu;

    if(hasPreviousSubmenus){
        previousSubMenu = GetPreviousSubmenu(previousMenu);
    }
    else{
        previousSubMenu = undefined;
    }
    
    let hasSubmenus = !menu.classList.contains(noSubmenusClass);

    switch(menu.classList[0]){
        case menuItemClass:
            console.log(menuItemClass);

            if(menu === previousMenu){
                if(hasPreviousSubmenus){
                    ShowOrHideMenus(previousMenu);
                    ChangeMenuIcon(previousMenu);
                }
                return;
            }

            if(hasPreviousSubmenus){
                previousMenu.childNodes[1].innerText = "add";
                HideSubMenus(previousMenu);
            }

            DisableActiveMenus();
            menu.classList.add(activeLinkClass);
            previousMenu.classList.remove(activeLinkClass);

            if(hasSubmenus){
                ShowOrHideMenus(menu)
                ChangeMenuIcon(menu);
            }
            else{
                ChangeSection(sectionID);

                let burgerMenu = document.getElementById(burgerMenuClass).children[0];
                if(burgerMenu.innerText === closeClass){
                    showOrHideMenu();
                }
            }
            break;
    
        case subMenuClass:
            console.log(subMenuClass);

            if(menu === previousSubMenu) return;

            previousSubMenu?.classList.remove(activeLinkClass);
            menu.classList.add(activeLinkClass);

            ChangeSection(sectionID);

            if(previousParagraph !== paragraphID){
                let oldParagraph = document.getElementById(previousParagraph);

                if(oldParagraph === null){
                    oldParagraph = document.getElementById("content").getElementsByClassName(activeParagraphClass)[0];
                }

                let newParagraph = document.getElementById(paragraphID);
        
                oldParagraph.classList.remove(activeParagraphClass);
                newParagraph.classList.add(activeParagraphClass);
        
                previousParagraph = paragraphID;
            }

            let burgerMenu = document.getElementById(burgerMenuClass).children[0];
            if(burgerMenu.innerText === closeClass){
                showOrHideMenu();
            }
            break;

        default: 
            break;
    }
}

function ChangeSection(sectionID) {
    let activeItem = document.getElementById(contentClass).getElementsByClassName(activeItemClass)[0];
    let item = document.getElementById(sectionID);

    activeItem?.classList.replace(activeItemClass, itemClass);
    activeItem?.classList.remove(flex);

    item.classList.replace(itemClass, activeItemClass);
    item?.classList.add(flex);
}

function DisableActiveMenus(){
    let activeMenus = document.getElementById(menuClass).getElementsByClassName(activeLinkClass);

    for(let i = 0; i < activeMenus.length; i++){
        activeMenus[i].classList.remove(activeLinkClass);
    }
}

function HideSubMenus(menu){
    let parentDivChilds = menu.parentElement.getElementsByClassName(subMenuClass);    

    for(let i = 0; i < parentDivChilds.length; i++){
        let subMenuClasses = parentDivChilds[i].classList;

        subMenuClasses.remove(visibleSubMenuClass, activeLinkClass);
    }
}

function ChangeMenuIcon(menu){
    let icon = menu.childNodes[1].innerText;
    menu.childNodes[1].innerText = icon === "remove" ? "add" : "remove";
}

function ShowOrHideMenus(menu){
    let parentDivChilds = menu.parentElement.getElementsByClassName(subMenuClass);    

    for(let i = 0; i < parentDivChilds.length; i++){
        let subMenuClasses = parentDivChilds[i].classList;

        if(subMenuClasses.contains(visibleSubMenuClass)){
            subMenuClasses.remove(visibleSubMenuClass);
        }
        else{
            subMenuClasses.add(visibleSubMenuClass);
        }
    }
}

function showOrHideMenu(){
    let menu = document.getElementById(menuClass);

    if(menu.style.display === "" || menu.style.display === ""){
        menu.style.display = "block";
    }
    else{
        menu.style.display = "";
    }

    let icon = document.getElementById(burgerMenuIcon);
    document.getElementById(burgerMenuIcon).innerText = icon.innerText === menuClass ? closeClass : menuClass;
}

function arrowList(){
    let arrow = document.getElementById("expand");
    let hiddenList = document.getElementById(labsListHidden);
    let content = document.getElementById(contentClass);

    if(arrow.innerText === expandLess){
        arrow.innerText = expandMore;
        hiddenList.style.display = "none";
        hiddenList.classList.remove(openLabsList);

        content.style.opacity = 1;
        // content.style.backgroundColor = "";
    }
    else{
        arrow.innerText = expandLess;
        hiddenList.style.display = "";
        hiddenList.classList.add(openLabsList);

        content.style.opacity = 0;
        // content.style.backgroundColor = "#333333";
    }
}

function ChangeTable(button, tableID){
    if(tableID === previousTable) return;

    previousTable = tableID;

    let activeButton = document.getElementsByClassName('table-choice ' + activeClass)[0];

    if(activeButton !== undefined){
        activeButton.classList.remove(activeClass);
    }

    button.classList.add(activeClass);

    let activeTable = document.getElementsByClassName(visibleTableClass)[0];

    if(activeTable !== undefined){
        activeTable.classList.replace(visibleTableClass, invisibleTableClass);
    }

    let newTable = document.getElementById(tableID);
    newTable.classList.replace(invisibleTableClass, visibleTableClass);
}