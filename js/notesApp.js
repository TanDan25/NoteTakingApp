window.addEventListener('load', function () {

  var body = document.getElementById("body");
  // console.log(body);  

  var wrappingDiv = document.createElement("div");
  wrappingDiv.setAttribute("id", "wrappingDiv");
  body.appendChild(wrappingDiv);

  var ribbon = document.createElement("div");
  ribbon.setAttribute("id", "ribbon");
  wrappingDiv.appendChild(ribbon);

  var container = document.createElement("div");
  container.innerHTML = "Here are your notes!";
  container.setAttribute("id", "container");
  wrappingDiv.appendChild(container);

  var textOptionsMenu = document.createElement("div");
  textOptionsMenu.setAttribute("id", "textOptionsMenu");
  ribbon.appendChild(textOptionsMenu);

  createTextOptions();

  var notePage = document.createElement("div");
  notePage.setAttribute("id", "noteDiv");
  container.appendChild(notePage);

  // var noteArea = document.createElement("div");
  // noteArea.setAttribute("id", "notes");
  // noteArea.setAttribute("contenteditable", "true");
  // noteArea.innerHTML = notes;
  // container.appendChild(noteArea);

  createDynamicNotes();


  // var saveButon = document.createElement("button");
  // saveButon.innerHTML = "<img src='photos/floppy-icon.png' alt='save button' id='saveButtonIcon'>";
  // saveButon.setAttribute("onclick", "save()");
  // textOptionsMenu.appendChild(saveButon);

  console.log(body);
});

function createDynamicNotes() {
  var notePage = document.getElementById("noteDiv");

  if (localStorage.getItem("notes") != null) {
    var localStorageObj = localStorage.getItem("notes");
    var newObj = JSON.parse(localStorageObj);
  } else {
    var newObj = {
      note0: { id: "noteBox0", idHead: "noteBox0dragBox", top: "0px", left: "0px", innerHTML: "<b>Hello</b><div><br></div><div><u>Welcome to notes with Tan and Dan(:</u></div><div><span style='background-color: yellow;''>Have fun!</span></div>" },
    }
    var myJSON = JSON.stringify(newObj);
    localStorage.setItem("notes", myJSON);
  }


  var i;
  for (i in newObj) {
    // console.log(i);
    // console.log(newObj[i]["id"]);

    if (document.getElementById(newObj[i]["id"]) == null) {
      var notesBox = document.createElement("div");
      notesBox.setAttribute("id", newObj[i]["id"]);
      notesBox.setAttribute("class", "noteBox");
      notesBox.setAttribute("style", "left: " + newObj[i]["left"] + "; top: " + newObj[i]["top"] + ";");
      notesBox.innerHTML = "<div id='" + newObj[i]["idHead"] + "' class='noteBoxHeader'>Click here to move</div><div style='cursor: pointer;' onclick=save('" + i + "')>Save</div><div style='cursor: pointer;' onclick=removeNote('" + i + "')>Delete</div><div class='theActualNotes' contenteditable='true'>" + newObj[i]["innerHTML"] + "</div>";
      notePage.appendChild(notesBox);

      dragElement(document.getElementById(newObj[i]["id"]));
    }
  }

}

function createTextOptions() {

  var boldButton = document.createElement("button");
  boldButton.innerHTML = "<b> B </b>";
  boldButton.setAttribute("onclick", "bold()");
  textOptionsMenu.appendChild(boldButton);

  var underlineButton = document.createElement("button");
  underlineButton.innerHTML = "<u> U </u>";
  underlineButton.setAttribute("onclick", "underline()");
  textOptionsMenu.appendChild(underlineButton);

  var italicButton = document.createElement("button");
  italicButton.innerHTML = "<i> I </i>";
  italicButton.setAttribute("onclick", "italic()");
  textOptionsMenu.appendChild(italicButton);

  var hiliteButton = document.createElement("button");
  hiliteButton.innerHTML = "<mark> Highlight yellow </mark>";
  hiliteButton.setAttribute("onclick", "hilite()");
  textOptionsMenu.appendChild(hiliteButton);

  var addNewNoteButton = document.createElement("button");
  addNewNoteButton.innerHTML = "+";
  addNewNoteButton.setAttribute("onclick", "addNewNote()");
  textOptionsMenu.appendChild(addNewNoteButton);
}

function save(divId) {
  // console.log(divId);

  var localStorageObj = localStorage.getItem("notes");
  var newObj = JSON.parse(localStorageObj);
  // console.log(newObj[divId].id);

  var x = document.getElementById(newObj[divId].id);
  // console.log(x);
  // console.log(x.getElementsByClassName("theActualNotes")[0].innerHTML);

  newObj[divId].innerHTML = x.getElementsByClassName("theActualNotes")[0].innerHTML;

  // console.log(newObj);

  var myJSON = JSON.stringify(newObj);
  localStorage.setItem("notes", myJSON);

}

function removeNote(divId) {
  var localStorageObj = localStorage.getItem("notes");
  var newObj = JSON.parse(localStorageObj);
  
  var item = document.getElementById(newObj[divId].id);

  delete newObj[divId];
  
  var myJSON = JSON.stringify(newObj);
  localStorage.setItem("notes", myJSON); 
  
  item.remove(item);

  // createDynamicNotes();
}

function savePosition(left, top, element) {
  var i;
  // console.log(left, top, element.id);
  var localStorageObj = localStorage.getItem("notes");
  var newObj = JSON.parse(localStorageObj);

  for (i in newObj) {
    // console.log(newObj[i].id);
    // console.log(i);
    if (newObj[i].id === element.id) {
      var id = i;
    }
  }
  // console.log(id);

  var x = document.getElementById(newObj[id].id);

  newObj[id].innerHTML = x.getElementsByClassName("theActualNotes")[0].innerHTML;
  newObj[id].left = left;
  newObj[id].top = top;

  var myJSON = JSON.stringify(newObj);
  localStorage.setItem("notes", myJSON);
}

function addNewNote() {
  		var localStorageObj = localStorage.getItem("notes");
  		var newObj = JSON.parse(localStorageObj);
  		//console.log(newObj);
  		var arrayOfKeys = Object.keys(newObj);
  		// console.log(arrayOfKeys);
  
  if(arrayOfKeys != 0){
  		var lastNoteKey = arrayOfKeys[arrayOfKeys.length - 1];
  		//console.log("This is lastNoteKey " + lastNoteKey);
  		//console.log("this is lastNoteKey.Length" + lastNoteKey.length);

  		if (lastNoteKey.length === 5) {
    		var noteKeyNumber = parseInt(lastNoteKey.substring(lastNoteKey.length - 1));
    		//console.log("This is noteKeyNumber in if statement: " + noteKeyNumber);
    		var newKeyNumber = noteKeyNumber + 1;
    		var newNoteKey = lastNoteKey.replace(noteKeyNumber, newKeyNumber);
    		//console.log("this is newNoteKey" + newNoteKey);
    		newObj[newNoteKey] = { id: `noteBox${newKeyNumber}`, idHead: `noteBox${newKeyNumber}dragBox`, top: "0px", left: "0px", innerHTML: `This is ${newNoteKey}` };
    		//console.log(newObj);
    		var myJSON = JSON.stringify(newObj);
    		localStorage.setItem("notes", myJSON);
    		createDynamicNotes();
  	}
  		else {
    		var noteKeyNumber = parseInt(lastNoteKey.substring(lastNoteKey.length - 2));
    		//console.log(`This is noteKeyNumber in else statement: ${noteKeyNumber}`);
    		var newKeyNumber = noteKeyNumber + 1;
    		var newNoteKey = lastNoteKey.replace(noteKeyNumber, newKeyNumber);
    		//console.log("this is newNoteKey" + newNoteKey);
    		newObj[newNoteKey] = { id: `noteBox${newKeyNumber}`, idHead: `noteBox${newKeyNumber}dragBox`, top: "0px", left: "0px", innerHTML: `This is ${newNoteKey}` };
    		//console.log(newObj);
    		var myJSON = JSON.stringify(newObj);
    		localStorage.setItem("notes", myJSON);
    		createDynamicNotes();
  	}
  }
  else {
    		var newObj = {
          note0: { id: "noteBox0", idHead: "noteBox0dragBox", top: "0px", left: "0px", innerHTML: "<b>Hello</b><div><br></div><div><u>Welcome to notes with Tan and Dan(:</u></div><div><span style='background-color: yellow;''>Have fun!</span></div>" },
        }
    		//console.log(newObj);
    		var myJSON = JSON.stringify(newObj);
    		localStorage.setItem("notes", myJSON);
    		createDynamicNotes();
  }
  
}

function bold() {
  document.execCommand('bold');
}

function underline() {
  document.execCommand('underline');
}

function italic() {
  document.execCommand('italic');
}

function hilite() {
  document.execCommand('hiliteColor', true, 'yellow');
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "dragBox")) {
    /* if present, the dragBox is where you move the DIV from:*/
    document.getElementById(elmnt.id + "dragBox").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    // console.log(e.clientX, e.clientY)
    pos3 = e.clientX;
    pos4 = e.clientY;
    // console.log(pos3, pos4);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    if ((elmnt.offsetTop - pos2) < 0) {
      elmnt.style.top = "0px";
    } else {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    if ((elmnt.offsetLeft - pos2) < 0) {
      elmnt.style.left = "0px";
    } else {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    savePosition(elmnt.style.left, elmnt.style.top, elmnt);

    document.onmouseup = null;
    document.onmousemove = null;
  }
}
