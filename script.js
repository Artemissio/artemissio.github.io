var previousLink;
var previousMenu;
var previousSubMenu;
var previousParagraph;
var previousSection;
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

function GetPreviousMenu(){
    let result = document.getElementsByClassName(menuItemClass + ' ' + activeLinkClass)[0];

    if(result === undefined){
        result = document.getElementsByClassName(subMenuClass + ' ' + activeLinkClass)[0];
    }

    return result;
}

function ChangeContent(menu, sectionID, paragraphID = null){
    if(previousMenu === undefined){
        previousMenu = GetPreviousMenu();        
    }

    let burgerMenu = document.getElementById(burgerMenuClass).children[0];
    if(burgerMenu.innerText === closeClass){
        showOrHideMenu();
    }

    switch(menu.classList[0]){
        case menuItemClass:
            console.log(menuItemClass);

            if(menu === previousMenu) return;

            DisableActiveMenus();

            menu.classList.add(activeLinkClass);
            previousMenu.classList.remove(activeLinkClass);

            if(!previousMenu.classList.contains(noSubmenusClass)){
                previousMenu.childNodes[1].innerText = "add";
                HideSubMenus(previousMenu);
            }

            if(!menu.classList.contains(noSubmenusClass)){
                ShowOrHideMenus(menu)
                ChangeMenuIcon(menu);
            }
            else{
                let activeItem = document.getElementById(contentClass).getElementsByClassName(activeItemClass)[0];
                let item = document.getElementById(sectionID);

                activeItem?.classList.replace(activeItemClass, itemClass);
                activeItem?.classList.remove(flex);

                item.classList.replace(itemClass, activeItemClass);
                item?.classList.add(flex);
            }
            
            break;

        case subMenuClass:
            console.log(subMenuClass);

            let parent = menu.parentNode.children[0];

            if(previousMenu === parent){
                previousMenu = document.getElementsByClassName(subMenuClass + ' ' + visibleSubMenuClass + ' ' + activeLinkClass)[0];
            }

            if(menu === previousMenu) return;   
            
            console.log({previousMenu});
            
            menu.classList.add(activeLinkClass);
            previousMenu.classList.remove(activeLinkClass);

            if(!previousMenu.classList.contains(noSubmenusClass)){
                previousMenu.childNodes[1].innerText = "add";
                HideSubMenus(previousMenu);
                previousMenu.classList.remove(activeLinkClass);
            }
            else{

            }
            
            // HideSubMenus(previousMenu);
            // ShowOrHideMenus(menu);

            // if(paragraphID !== null && previousParagraph !== paragraphID){

            //     if(previousParagraph === undefined){
            //         previousParagraph = document.getElementsByClassName(activeParagraphClass)[0].id;
            //         console.log(previousParagraph);
            //     }

            //     let oldParagraph = document.getElementById(previousParagraph);
            //     let newParagraph = document.getElementById(paragraphID);
        
            //     oldParagraph.classList.remove(activeParagraphClass);
            //     newParagraph.classList.add(activeParagraphClass);
        
            //     previousParagraph = paragraphID;
            // }
            break;

        default: break;
    }

    previousMenu = menu;
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

        subMenuClasses.remove(visibleSubMenuClass);
    }
}

function ShowSubmenus(menu){
    ChangeMenuIcon(menu);

    if(previousMenu === undefined){
        previousMenu = document.getElementById(menuClass).getElementsByClassName(activeLinkClass)[0];
    }

    if(menu === previousMenu){
        ShowOrHideMenus(previousMenu);
    }
    else{
        HideSubMenus(previousMenu);
        ShowOrHideMenus(menu);

        previousMenu.classList.remove(activeLinkClass);
        menu.classList.add(activeLinkClass);
        
        previousMenu.childNodes[1].innerText = "add";
        previousMenu = menu;
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

function ShowSection(subMenu, sectionID, paragraphID){
    if(previousSubMenu === subMenu || previousParagraph === paragraphID) return;

    if(previousSubMenu === undefined){
        previousSubMenu = GetPreviousSubmenu();
    }

    if(previousSection === undefined){
        previousSection = GetPreviousSection().id;
    }

    if(previousParagraph === undefined){
        previousParagraph = GetPreviousParagraph().id;
    }

    previousSubMenu.classList.remove(activeLinkClass);

    previousSubMenu = subMenu;

    if(previousSection !== sectionID){
        let activeItem = document.getElementById(contentClass).getElementsByClassName(activeItemClass)[0];
        let item = document.getElementById(sectionID);
    
        activeItem?.classList.replace(activeItemClass, itemClass);
        activeItem?.classList.remove(flex);
    
        item.classList.replace(itemClass, activeItemClass);
        item?.classList.add(flex);

        previousSection = sectionID;
    }

    if(previousParagraph !== paragraphID){
        let oldParagraph = document.getElementById(previousParagraph);
        let newParagraph = document.getElementById(paragraphID);

        oldParagraph.classList.remove(activeParagraphClass);
        newParagraph.classList.add(activeParagraphClass);

        previousParagraph = paragraphID;
    }

    let burgerMenu = document.getElementById(burgerMenuClass).children[0];
    if(burgerMenu.innerText === closeClass){
        showOrHideMenu();
    }   

    if(!subMenu.classList.contains(activeLinkClass)){
        subMenu.classList.add(activeLinkClass);
    }
}

function GetPreviousSubmenu(){
    return document.getElementsByClassName(subMenuClass + ' ' + activeLinkClass)[0];
}

function GetPreviousSection(){
    return document.getElementsByClassName(activeItemClass)[0];
}

function GetPreviousParagraph(){
    return document.getElementsByClassName(activeParagraphClass)[0];
}

function ChangeTab(menu, sectionID){
    if (previousMenu === menu) return;
    
    previousMenu = menu;

    let burgerMenu = document.getElementById(burgerMenuClass).children[0];
    if(burgerMenu.innerText === closeClass){
        showOrHideMenu();
    }    

    let activeItem = document.getElementById(contentClass).getElementsByClassName(activeItemClass)[0];
    let item = document.getElementById(sectionID);

    activeItem?.classList.replace(activeItemClass, itemClass);
    activeItem?.classList.remove(flex);

    item.classList.replace(itemClass, activeItemClass);
    item?.classList.add(flex);

    let activeLinks = document.getElementsByClassName(activeLinkClass);

    for(let i = 0; i < activeLinks.length; i++){
        activeLinks[i].classList.remove(activeLinkClass);
    }

    menu.classList.add(activeLinkClass);
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