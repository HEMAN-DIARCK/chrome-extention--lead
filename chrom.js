const inputBtn = document.getElementById("input-btn");
let myLead = [];
const inputEl = document.getElementById("input-el");
let unordList = document.getElementById("ulEl");
const deleteBtn = document.getElementById("delete-btn");

const saveBtn = document.getElementById("save-tab");

const leadsFromlocalstorage = JSON.parse(localStorage.getItem("myLead"));

if (leadsFromlocalstorage) {
  myLead = leadsFromlocalstorage;
  renderlist(myLead);
}

inputBtn.addEventListener("click", function saveData() {
  myLead.push(inputEl.value);
  inputEl.value = "";

  localStorage.setItem("myLead", JSON.stringify(myLead));

  renderlist(myLead);
});

function renderlist(leads) {
  listItems = "";
  for (let i = 0; i < leads.length; i += 1) {
    listItems += `<li>
         
              <a  href= ${leads[i]} target= '_blank'>
                 ${leads[i]}
              </a>
        </li>`;

    //or
    // const li = document.createElement("li")
    // li.textContent = myLead[i]
    // unordList.append(li)
  }

  unordList.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  renderlist(myLead);
});

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));

    renderlist(myLead);
  });
});
