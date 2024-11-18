let siteName = document.getElementById("nameInput");
let siteUrl = document.getElementById("urlInput");

let siteList = [];

(function () {
  let savedData = localStorage.getItem("siteList");
  if (savedData) {
    siteList = JSON.parse(savedData);
    addItem(siteList);
  }
})();

function checkValues() {
  if (siteName.value.length > 3 && isUrl(siteUrl.value)) {
    getValues(siteName.value, siteUrl.value);
  } else if (siteName.value.length <= 3) {
    if (isUrl(siteUrl.value)) {
      alert("Name must be at least 4 characters long");
    } else {
      alert("Invalid Name & URL");
    }
  } else {
    alert("Invalid URL");
  }
}

function isUrl(url) {
  let regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

function getValues(siteName, siteUrl) {
  let item = {
    name: siteName,
    url: siteUrl,
  };
  clearInputs();
  pushToArray(item);
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function pushToArray(item) {
  siteList.unshift(item);
  saveToLocal(siteList);
}

function saveToLocal(data) {
  localStorage.setItem("siteList", JSON.stringify(data));
  addItem(data);
}

function addItem(data) {
  let item = "";
  for (let i = 0; i < data.length; i++) {
    item += `
    <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>
            <a href="${data[i].url}" target="_blank">
                <button class="visit-btn btn text-white">
                <i class="fa-solid fa-eye me-1"></i>
                Visit
                </button>
            </a>
        </td>
        <td>
            <button  onclick=" deleteItem(${i})" class="delete-btn btn text-white">
            <i class="fa-solid fa-trash-can me-1"></i>
            Delete
            </button>            
        </td>
    </tr>
    `;
  }
  displayItems(item);
}

function displayItems(item) {
  document.getElementById("content").innerHTML = item;
}

function deleteItem(index) {
  siteList.splice(index, 1);
  saveToLocal(siteList);
}
