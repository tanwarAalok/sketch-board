let optionCont = document.querySelector('.options-cont');
let toolsCont = document.querySelector('.tools-cont');
let pencilIcon = document.querySelector('.fa-pen');
let erasorIcon = document.querySelector('.fa-eraser');
let stickyNoteIcon = document.querySelector('.fa-note-sticky');
let uploadIcon = document.querySelector('.fa-upload');

let optionFlag = true;
let pencilFlag = false;
let eraserFlag = false;

pencilIcon.addEventListener('click', (e) => {
    pencilFlag = !pencilFlag;

    if(pencilFlag){
        openPencilCont();
        closeErasorCont();
    }
    else closePencilCont()
})

erasorIcon.addEventListener('click', (e) => {
    eraserFlag = !eraserFlag;

    if(eraserFlag){
        openErasorCont();
        closePencilCont();
    }
    else closeErasorCont()
})

stickyNoteIcon.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    socket.emit("createSticky", stickyTemplateHTML);

    // createSticky(stickyTemplateHTML);
})

uploadIcon.addEventListener("click", (e) => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;

        createSticky(stickyTemplateHTML);
    })
})


optionCont.addEventListener('click', (e) => {
    optionFlag = !optionFlag;
    optionFlag ? openTools() : closeTools();
})

function openTools(){
    let iconElement = optionCont.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolsCont.style.display = "flex";
}

function closeTools(){
    let iconElement = optionCont.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolsCont.style.display = "none";
}

function openPencilCont(){
    let pencilToolCont = document.querySelector('.pencil-tool-cont');
    pencilToolCont.style.display = "block";
}

function closePencilCont(){
    let pencilToolCont = document.querySelector('.pencil-tool-cont');
    pencilToolCont.style.display = "none";
}
function openErasorCont(){
    let pencilToolCont = document.querySelector('.eraser-tool-cont');
    pencilToolCont.style.display = "flex";
}

function closeErasorCont(){
    let pencilToolCont = document.querySelector('.eraser-tool-cont');
    pencilToolCont.style.display = "none";
}

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}