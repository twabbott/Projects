let siteMap = {
    imagePathRoot: "./images/logos/",
    tabs: [],
    preferences: {
        activeTabId: undefined
    },

    createTab(name, isDefault=false) {
        const newTab = {
            name,
            id: name.replace(" ", "-").toLowerCase(),
            isDefault,
            sections: [],

            createSection(name) {
                const newSection = {
                    name,
                    items: [],
                    addItem(name, image, link) {
                        const newItem = {
                            name,
                            image,
                            link
                        };
                        this.items.push(newItem);
                        return this;
                    },
                    addItemWithMenu(name, image, alt, link) {
                        const newItem = {
                            name,
                            image,
                            alt,
                            link,
                            subLinks: [],
                            addMenuItem(name, link) {
                                this.subLinks.push({
                                    name,
                                    link
                                });
                                return this;
                            }
                        };
                        this.items.push(newItem);
                        return newItem;
                    }
                };
                this.sections.push(newSection);
                return newSection;
            }
        };
        this.tabs.push(newTab);
        return newTab;        
    },

    clickTab(id) {
        let menuItem;
        if (this.preferences.activeTabId) {
            document.getElementById(this.preferences.activeTabId).style.display = "none";
            menuItem = document.getElementById(this.preferences.activeTabId + "-menu");
            menuItem.classList.remove("side-menu-item-selected");
            menuItem.classList.add("side-menu-item");
        }        

        this.preferences.activeTabId = id;
        document.getElementById(this.preferences.activeTabId).style.display = "grid";
        menuItem = document.getElementById(this.preferences.activeTabId + "-menu");
        menuItem.classList.add("side-menu-item-selected");
        menuItem.classList.remove("side-menu-item");

        localStorage.setItem("launch-pad-preferences", JSON.stringify(siteMap.preferences))
    }
};

function pageInit(siteMap) {
    for (let tab of siteMap.tabs) {
        addTab(tab);
    }

    let prefs = localStorage.getItem("launch-pad-preferences");
    if (prefs) {
        siteMap.preferences = JSON.parse(prefs);
    }

    if (siteMap.preferences.activeTabId) {
        siteMap.clickTab(siteMap.preferences.activeTabId);
    } else {
        for (let tab of siteMap.tabs) {
            if (tab.isDefault)
                siteMap.clickTab(tab.id);
        }
    }

    setupClock();
    setupSearch();
}

function setupClock() {
    function datefunc() {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        let hour = d.getHours();
        let ampm = "am";
        if (hour >= 12) {
            hour -= 12;
            if (hour === 0) {
                hour = 12;
            }
            ampm = "pm";
        }
        document.getElementById("footer-date").innerText = `${weekdays[d.getDay()]}, ${months[d.getMonth()-1]} ${d.getDate()}, ${d.getFullYear()}`;
        document.getElementById("footer-time").innerText = `${hour}:${d.getMinutes()} ${ampm}`;
    };
    datefunc();
    setInterval(datefunc, 1000);
}

function setupSearch() {
    document.getElementById("search-icon").onclick = () => doSearch();
    const searchEdit = document.getElementById("search-edit");
    searchEdit.onkeydown = () => {
        if (event.keyCode == 13)
            doSearch();
    }
    searchEdit.focus();

    function doSearch() {
        const searchText = document.getElementById("search-edit").value;
        if (searchText) {
            window.open("https://www.google.com/search?q=" + searchText.replace(" ", "+"));
        }
        window.location = "https://www.google.com";
    }

    document.getElementById("map-icon").onclick = () => 
        window.location = "https://maps.google.com";
    document.getElementById("image-icon").onclick = () =>
        window.location = "https://www.google.com/imghp";
    document.getElementById("translate-icon").onclick = () =>
        window.location = "https://translate.google.com";
}

function addTab(tab) {
    const sideMenu = document.getElementById("side-menu");
    addMenuItem(sideMenu, tab);

    const contentArea = document.getElementById("content-area");
    let tabPage = appendDiv(contentArea, "grid-container");
    tabPage.id = tab.id;
    tabPage.style.display = "none";

    for (let section of tab.sections) {            
        addSection(tabPage, section);
    }
}

function addMenuItem(sideMenu, tab) {
    const newDiv = appendDiv(sideMenu, "side-menu-item", tab.name);
    newDiv.id = tab.id + "-menu";
    newDiv.onclick = function() {
        siteMap.clickTab(tab.id);
    }
}

function addSection(contentArea, section) {
    let sectionDiv = appendDiv(contentArea, "grid-header", section.name);

    for (let sectionItem of section.items) {
        if (sectionItem.subLinks) {
            addGridItemWithMenu(contentArea, sectionItem);
        } else {
            addGridItem(contentArea, sectionItem);
        }
    }
}

function appendDiv(parentElement, classList = "", innerText = "") {
    let newElement = document.createElement("div");
    appendClassList(newElement, classList);
    if (innerText) {
        newElement.innerText = innerText;
    }

    parentElement.appendChild(newElement);
    return newElement;
}

function appendClassList(element, classList) {
    if (classList) {
        for (let classItem of classList.split(' ')) {
            element.classList.add(classItem);
        }
    }
}

function appendHyperlink(parentElement, href, text) {
    let newElement = document.createElement("a");
    newElement.href = href;
    if (text) {
        newElement.innerText = text;
    }
    parentElement.appendChild(newElement);
    return newElement;
}

function appendImage(parentElement, src, alt, classList) {
    let newElement = document.createElement("img");
    newElement.src = siteMap.imagePathRoot + src;
    newElement.alt = alt;
    appendClassList(newElement, classList);
    parentElement.appendChild(newElement);
    return newElement;
}

function addGridItemWithMenu(parentElement, sectionItem) {
    let gridItem = appendDiv(parentElement, "grid-item");
    let thumbnail = appendDiv(gridItem, "item-icon-thumbnail");
    let link = appendHyperlink(thumbnail, sectionItem.link);
    appendImage(link, sectionItem.image, sectionItem.alt);

    let itemList = appendDiv(gridItem, "item-list");

    for (let menuItem of sectionItem.subLinks) {
        let menuDiv = appendDiv(itemList, "item-link");
        appendHyperlink(menuDiv, menuItem.link, menuItem.name);
    }
}

function addGridItem(parentElement, sectionItem) {
    let gridItem = appendDiv(parentElement, "grid-item");
    let link = appendHyperlink(gridItem, sectionItem.link);
    appendImage(link, sectionItem.image, sectionItem.name, "item-full-image")
}
