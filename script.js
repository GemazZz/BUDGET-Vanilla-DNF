const addNewtransactionBtn = document.querySelector(".btn1");
addNewtransactionBtn.addEventListener("click", () => {
   location.href = "2index.html";
});

function PrintData(x) {
   for (let i = 0; i < x.length; i++) {
      if (x[i].type === "Income") {
         const div = document.createElement("div");
         div.classList = "green";

         const p1 = document.createElement("p");
         p1.textContent = "Created at: " + x[i].date;

         const p2 = document.createElement("p");
         p2.textContent = "Category: " + x[i].category;

         const p3 = document.createElement("p");
         p3.textContent = "Amount: " + x[i].amount;

         const p4 = document.createElement("p");
         p4.textContent = x[i].type;
         p4.classList = "greenIncome";

         const dltBtn = document.createElement("button");
         const i1 = document.createElement("i");
         dltBtn.classList = "close";
         i1.classList = "fa-regular fa-circle-xmark fa-lg";
         dltBtn.addEventListener("click", () => {
            x.splice(i, 1);
            localStorage.setItem("data", JSON.stringify(x));
            location.reload();
         });

         const editBtn = document.createElement("button");
         const i2 = document.createElement("i");
         editBtn.classList = "edit";
         i2.classList = "fa-regular fa-pen-to-square fa-lg";

         div.appendChild(p1);
         div.appendChild(p2);
         div.appendChild(p3);
         div.appendChild(p4);
         div.appendChild(dltBtn);
         div.appendChild(editBtn);
         dltBtn.appendChild(i1);
         editBtn.appendChild(i2);
         content.appendChild(div);
      } else if (x[i].type === "Expence") {
         const div = document.createElement("div");
         div.classList = "red";
         const p1 = document.createElement("p");
         p1.textContent = "Created at: " + x[i].date;

         const p2 = document.createElement("p");
         p2.textContent = "Category: " + x[i].category;

         const p3 = document.createElement("p");
         p3.textContent = "Amount: " + x[i].amount;

         const p4 = document.createElement("p");
         p4.textContent = x[i].type;
         p4.classList = "redIncome";

         const dltBtn = document.createElement("button");
         const i1 = document.createElement("i");
         dltBtn.classList = "close";
         i1.classList = "fa-regular fa-circle-xmark fa-lg";
         dltBtn.addEventListener("click", () => {
            x.splice(i, 1);
            localStorage.setItem("data", JSON.stringify(x));
            location.reload();
         });

         const editBtn = document.createElement("button");
         const i2 = document.createElement("i");
         editBtn.classList = "edit";
         i2.classList = "fa-regular fa-pen-to-square fa-lg";

         div.appendChild(p1);
         div.appendChild(p2);
         div.appendChild(p3);
         div.appendChild(p4);
         div.appendChild(dltBtn);
         div.appendChild(editBtn);
         dltBtn.appendChild(i1);
         editBtn.appendChild(i2);
         content.appendChild(div);
      }
   }
}

const content = document.querySelector(".content");
const data = localStorage.getItem("data");
const parseData = JSON.parse(data);
PrintData(parseData);

const radioButtons = document.querySelectorAll('input[type="radio"]');
const select = document.querySelector("#category");
radioButtons.forEach((radio) => {
   radio.addEventListener("change", function () {
      const selectedValue = this.value;
      if (selectedValue === "income") {
         select.innerHTML = `
         <option value="empty" selected disabled>Select one</option>
         <option value="Salary">Salary</option>
         <option value="Check">Check</option>
         `;
      } else if (selectedValue === "expence") {
         select.innerHTML = `
         <option value="empty" selected disabled>Select one</option>
         <option value="Gym">Gym</option>
         <option value="Shopping">Shopping</option>
         <option value="Family">Family</option>
         <option value="Others">Others</option>
      `;
      }
   });
});

const filterBtn = document.querySelector(".filterBtn");
filterBtn.addEventListener("click", () => {
   const fltDate = document.querySelector("#date").value;
   const fltselect = document.querySelector("#category").value;
   const fltMin = parseInt(document.querySelector("#min").value);
   const fltMax = parseInt(document.querySelector("#max").value);
   if ((fltMax && !fltMin) || (!fltMax && fltMin)) {
      alert("Please fill out Min and Max values");
      return;
   }
   const NewFilteredDate = parseData.filter(
      (x) => x.date === fltDate || x.category === fltselect || (x.amount >= fltMin && x.amount <= fltMax)
   );
   console.log(NewFilteredDate);
   content.innerHTML = "";
   PrintData(NewFilteredDate);
});

const statsIncome = parseData
   .filter((x) => x.type === "Income")
   .reduce((sum, x) => {
      return sum + x.amount;
   }, 0);
const statsExpence = parseData
   .filter((x) => x.type === "Expence")
   .reduce((sum, x) => {
      return sum + x.amount;
   }, 0);
const sumIncome = document.querySelector("#sumIncome");
const sumExpence = document.querySelector("#sumExpence");
const sumDif = document.querySelector("#sumDif");
sumIncome.textContent = statsIncome;
sumExpence.textContent = statsExpence;
sumDif.textContent = statsIncome - statsExpence;

function sumCategory(arr, category) {
   return arr
      .filter((x) => x.category === category)
      .reduce((sum, x) => {
         return sum + x.amount;
      }, 0);
}

const salary = sumCategory(parseData, "Salary");
const check = sumCategory(parseData, "Check");
const gym = sumCategory(parseData, "Gym");
const shopping = sumCategory(parseData, "Shopping");
const family = sumCategory(parseData, "Family");
const others = sumCategory(parseData, "Others");
const topArr = [
   { category: "Salary", sum: salary },
   { category: "Check", sum: check },
   { category: "Gym", sum: gym },
   { category: "Shopping", sum: shopping },
   { category: "Family", sum: family },
   { category: "Others", sum: others },
];
topArr.sort((a, b) => b.sum - a.sum);

console.log(topArr);

const spanSalary = document.querySelector("#spanSalary");
const spanCheck = document.querySelector("#spanCheck");
const spanGym = document.querySelector("#spanGym");
const spanShopping = document.querySelector("#spanShopping");
const spanFamily = document.querySelector("#spanFamily");
const spanOthers = document.querySelector("#spanOthers");
spanSalary.textContent = salary;
spanCheck.textContent = check;
spanGym.textContent = gym;
spanShopping.textContent = shopping;
spanFamily.textContent = family;
spanOthers.textContent = others;

const spanTop1 = document.querySelector("#spanTop1");
const spanTop2 = document.querySelector("#spanTop2");
const spanTop3 = document.querySelector("#spanTop3");

if (topArr[0].sum !== 0) {
   spanTop1.textContent = topArr[0].category;
} else spanTop1.textContent = "";

if (topArr[1].sum !== 0) {
   spanTop2.textContent = topArr[1].category;
} else spanTop2.textContent = "";

if (topArr[2].sum !== 0) {
   spanTop3.textContent = topArr[2].category;
} else spanTop3.textContent = "";
