let empty = "../img/empty.png"

let i, j

// calculating moves
let moveCounter = 0;

// unordered matrix
let rand_img, mat_after = [];

//  ordered matrix for comparison
let mat = [["../img/מיקי/16_2.jpg", "../img/מיקי/15_2.jpg", "../img/מיקי/14_2.jpg", "../img/מיקי/13_2.jpg"],
["../img/מיקי/12_2.jpg", "../img/מיקי/11_2.jpg", "../img/מיקי/10_2.jpg", "../img/מיקי/9_3.jpg"],
["../img/מיקי/8_3.jpg", "../img/מיקי/7_3.jpg", "../img/מיקי/6_3.jpg", "../img/מיקי/5_3.jpg"],
["../img/מיקי/4_3.jpg", "../img/מיקי/3_3.jpg", "../img/מיקי/2_3.jpg", empty]]


// unordered matrix
function create_mat() {
  let keep_img_arr_orginal = [];
  // שמירת המטריצה במערך לצורך אתחול המשחק שוב 
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      keep_img_arr_orginal.push(mat[i][j]);
    }
  }
  for (i = 0; i < mat.length; i++) {
    mat_after[i] = []
    for (j = 0; j < mat[i].length; j++) {
      if (i == mat.length - 1 && j == mat[i].length - 1)
        break;
      var num_random = Math.round(Math.random() * ((keep_img_arr_orginal.length) - 2))
      rand_img = document.createElement("img")
      rand_img.src = keep_img_arr_orginal[num_random];
      mat_after[i][j] = rand_img;
      keep_img_arr_orginal.splice(num_random, 1)
    }
  }

  rand_img = document.createElement("img")
  rand_img.src = empty;
  mat_after[i - 1][j] = rand_img;
  create();
}


// create table in html
function create() {
  var tbl = document.createElement("table")
  tbl.setAttribute("id", "tbl")
  for (i = 0; i < mat_after.length; i++) {
    var tr = document.createElement("tr")
    for (j = 0; j < mat_after.length; j++) {
      var td = document.createElement("td")
      td.setAttribute("id", i + "_" + j)
      var img = document.createElement("img");
      img.style.height = "9em"
      img.src = mat_after[i][j].src;
      td.appendChild(img)
      tr.appendChild(td)
    }
    tbl.appendChild(tr)
    tbl.classList.add("tbl")
  }
  document.getElementById("board").appendChild(tbl);
  move();
}


function move() {
  let trArr = tbl.getElementsByTagName('tr');
  let td;
  for (let i = 0; i < trArr.length; i++) {
    td = trArr[i].getElementsByTagName('td');
    for (let j = 0; j < td.length; j++) {
      td[j].addEventListener("dragstart", dragstart)
      td[j].addEventListener("dragover", dragover)
      td[j].addEventListener("dragenter", dragenter)
      td[j].addEventListener("dragleave", dragleave)
      td[j].addEventListener("drop", dragdrop)
      td[j].addEventListener("dragend", dragend)
    }
  }
}

let currtd;
let othertd;
function dragstart() {
  currtd = this;
}
function dragover(e) {
  e.preventDefault();
  othertd = this;

}
function dragenter(e) {
  e.preventDefault();
}

function dragleave() {

}

function dragdrop() {
  othertd = this;
}


// current=the image you want to replace  // othertd=empty
function dragend(e) {
  let tr = e.currentTarget.id.split('_')[0]
  let td = e.currentTarget.id.split('_')[1]
  let arr = othertd.getElementsByTagName('img')[0].src.split('.png')[0].split('/');
  let img = arr[arr.length - 1];
  if ((othertd.id.split('_')[0] == tr && ((parseInt(othertd.id.split('_')[1])) + 1 == td
    || (parseInt(othertd.id.split('_')[1])) - 1 == td) && img == "empty") ||
    (othertd.id.split('_')[1] == td && (parseInt(othertd.id.split('_')[0]) + 1 == tr || parseInt(othertd.id.split('_')[0]) - 1 == tr)
      && img == "empty")) {
    let currimg = currtd.getElementsByTagName('img')[0].src
    let otherimg = othertd.getElementsByTagName('img')[0].src
    currtd.getElementsByTagName('img')[0].src = otherimg
    othertd.getElementsByTagName('img')[0].src = currimg


    // calculting moves
    moveCounter += 1;
    document.getElementById("moves").innerHTML = "Moves: " + moveCounter

    // the comparison code
    let check_tbl = tbl
    let flag = 0
    console.log(check_tbl)
    let check_tr = tbl.getElementsByTagName("tr")
    for (i = 0; i < check_tr.length; i++) {
      let check_td = check_tr[i].getElementsByTagName("td")
      console.log(check_td)
      for (j = 0; j < check_td.length; j++) {
        let arr = check_td[j].getElementsByTagName("img")[0].src.split('/')
        let img = arr[arr.length - 1]
        arr = mat[i][j].split('/')
        let img2 = arr[arr.length - 1]
        if (img != img2) {
          flag = 1
          break;
        }
      }
      if (flag == 1) {
        break;
      }
    }
    if (flag == 0) {
      openModal();
    }

  }

}


// reset- איתחול המשחק בעת לחיצת הכפתור
function reset() {
  document.getElementById("board").innerHTML = "";
  moveCounter = 0;
  document.getElementById("moves").innerHTML = "Moves: 0"
  create_mat();
}

// game instructions window
function openModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("sound").play()
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}