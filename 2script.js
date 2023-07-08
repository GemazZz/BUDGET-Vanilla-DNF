const submit = document.querySelector(".submit");
const Close = document.querySelector(".close");
if (!localStorage.getItem("data")) {
   localStorage.setItem("data", JSON.stringify([]));
}
const radioButtons = document.querySelectorAll('input[type="radio"]');
console.log(radioButtons);
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

submit.addEventListener("click", () => {
   const income = document.querySelector("#Income");
   const expence = document.querySelector("#Expence");
   const category = document.querySelector("#category").value;
   const date = document.querySelector("#date").value;
   const amount = parseInt(document.querySelector("#amount").value);
   console.log(category, date, amount);
   if (category === "empty" || !date || !amount) {
      alert("Please fill out the form completely");
      return;
   }
   if (income.checked) {
      const newItem = {
         id: new Date().getTime(),
         type: "Income",
         category: category,
         date: date,
         amount: amount,
      };
      const data = localStorage.getItem("data");
      const parseData = JSON.parse(data);
      const newData = [newItem, ...parseData];
      localStorage.setItem("data", JSON.stringify(newData));
   } else if (expence.checked) {
      const newItem = {
         id: new Date().getTime(),
         type: "Expence",
         category: category,
         date: date,
         amount: amount,
      };
      const data = localStorage.getItem("data");
      const parseData = JSON.parse(data);
      const newData = [newItem, ...parseData];
      localStorage.setItem("data", JSON.stringify(newData));
   }
   location.href = "index.html";
});
Close.addEventListener("click", () => {
   location.href = "index.html";
});
