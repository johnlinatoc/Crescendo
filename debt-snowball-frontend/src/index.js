const URL = 'http://localhost:3000/users'
const billsURL = 'http://localhost:3000/bills'
const dataDiv = document.querySelector('#data')
const miniHeader = document.createElement('h3')
miniHeader.innerText = 'Overview'
const userWelcome = document.querySelector('#user-welcome')

// ========================= login

const loginBtn = document.querySelector('#login-user');

const loginForm = document.querySelector('#login')
const container = document.querySelector('.css-div');
const renderedChart = document.querySelector('#chart')
const logoremove = document.querySelector('.anychart-credits-text')

container.style.display = 'none';
data.style.display = 'none'
renderedChart.style.display = 'none'

loginBtn.addEventListener('click', (e) => userLogin(e));


let loggedIn = false;

function userLogin(e) {
    e.preventDefault(e);

     loggedIn = !loggedIn
     if (loggedIn) {
       loginForm.style.display = 'none'
       container.style.display = 'block'
       data.style.display = 'inline-block'
       renderedChart.style.display = 'inline-block'
     } else {
       loginForm.style.display = 'flex'
       container.style.display = 'none'
       data.style.display = 'none'
       renderedChart.style.display = 'none'

     }
}

// =================== render one user
function mainFetch() {
  fetch(URL)
  .then(resp => resp.json())
  .then(users => renderUser(users[3]));
}

let userExtraBalance = 0
let snowballStarterAmount = ''
console.log(snowballStarterAmount)

function renderUser(u) {
    const container = document.querySelector('#all-users');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const li = document.createElement('li');
    const username = document.createElement('h2');
    const user_snowball_starter = document.createElement('span');
    const logout = document.createElement('button')

    const billTable = document.createElement('table');
    const billHeaderRow = document.createElement('tr');
    const billRowHeader1 = document.createElement('th');
    const billRowHeader2 = document.createElement('th');
    const billRowHeader3 = document.createElement('th');
    // const billRowHeader4 = document.createElement('th');
    const billRowHeader5 = document.createElement('th');

    li.dataset.id = u.id
    userWelcome.innerText = `Welcome, ${u.name}`
    // user_snowball_starter.innerText = `Initial Added Amount: $${u.snowball_starter}`;
    snowballStarterAmount = u.snowball_starter
    userExtraBalance = u.snowball_starter
    billRowHeader1.innerText = 'Company'
    billRowHeader2.innerText = 'Remaining Balance'
    billRowHeader3.innerText = 'Bill APR'
    // billRowHeader4.innerText = 'Due Date'
    billRowHeader5.innerText = 'Min Payment'
    logout.innerText = 'Logout'
    // logout.className = 'button is-primary', "is-primary"

    billTable.id = 'bill-table'

    //css
    billTable.className='table'
    logout.style.marginLeft = '2rem'
    logout.className = 'button is-light is-medium'

    billHeaderRow.append(billRowHeader1, billRowHeader2, billRowHeader3, billRowHeader5)
    billTable.append(billHeaderRow)
    username.append(user_snowball_starter, logout)
    li.append(username, billTable)

    logout.addEventListener('click', (e) => userLogin(e))

    function compare(a, b) {
        if (a.u.bills.ba < b.last_nom) {
            return -1;
        }
        if (a.last_nom > b.last_nom) {
            return 1;
        }
        return 0;
    }
    // debugger

    const sortedBills = u.bills.sort((a, b) => (a.balance > b.balance) ? 1 : ((b.balance > a.balance) ? -1 : 0))

    let tempID = 1
    for (const bill of sortedBills) {
        const billRow = document.createElement('tr')
        const billName = document.createElement('td');
        const billBalance = document.createElement('td');
        const billAPR = document.createElement('td');
        // const billDueDate = document.createElement('td');
        const billMinPayment = document.createElement('td');

        billRow.dataset.id = bill.id
        billRow.dataset.mathId = tempID
        billName.innerText = bill.name
        billBalance.innerText = `$${bill.balance}`
        billAPR.innerText = `${round(((bill.APR)*100),2)}%`
        // billDueDate.innerText = bill.due_date
        billMinPayment.innerText = `$${bill.min_payment}`

        if (billBalance.innerText == '$0') {
            console.log('fix! should throw an error')
        }

        container.append(li)



        //==================EDIT BUTTON=======================


        const billEdit = document.createElement('td')
        const editBtn = document.createElement('button')
        editBtn.innerText = 'edit'
        editBtn.className = 'button is-info'
        billEdit.append(editBtn)

        editBtn.addEventListener('click', (e) => editBill(e))

        function editBill(e) {
            e.preventDefault();
            // 1. create listener for edit btn
            // 2. once click happens, we want to find parent tr node
            const tr = e.target.parentNode.parentNode
            // debugger
            // 3. capture what was originally in the td
            let currentNameNode = e.target.parentNode.parentNode.children[0]
            let currentBalanceNode = e.target.parentNode.parentNode.children[1]
            let currentAPRNode = e.target.parentNode.parentNode.children[2]
            let currentMinPaymentNode = e.target.parentNode.parentNode.children[3]
            let editBtnBeforeSubmit = e.target.parentNode.parentNode.children[4]
            let currentName = e.target.parentNode.parentNode.children[0].innerText
            let currentBalance = parseInt(e.target.parentNode.parentNode.children[1].innerText.substr(1))
            let currentAPR = parseInt(e.target.parentNode.parentNode.children[2].innerText.slice(0, -1))
            let currentMinPayment = parseInt(e.target.parentNode.parentNode.children[3].innerText.substr(1))
            // 4. use parent tr node and update each child td to an input whose values contain saved original data


            let i = 4;
            while (i > -1) {
                tr.children[i].remove()
                // debugger
                i--
            }
            // const newBillRow = document.createElement('tr')
            const billName = document.createElement('td');
            const billBalance = document.createElement('td');
            const billAPR = document.createElement('td');
            // const billDueDate = document.createElement('td');
            const billMinPayment = document.createElement('td');

            const billNameInput = document.createElement('input');
            const billBalanceInput = document.createElement('input');
            const billAPRInput = document.createElement('input');
            // const billDueDateInput = document.createElement('input');
            const billMinPaymentInput = document.createElement('input');

            // debugger
            billNameInput.value = currentName
            billBalanceInput.value = currentBalance
            billAPRInput.value = currentAPR
            // billDueDateInput.placeholder = 'Add Due Date'
            billMinPaymentInput.value = currentMinPayment

            billNameInput.className = 'input'
            billBalanceInput.className = 'input'
            billAPRInput.className = 'input'
            billMinPaymentInput.className = 'input'

            billName.append(billNameInput)
            billBalance.append(billBalanceInput)
            billAPR.append(billAPRInput)
            // billDueDate.append(billDueDateInput)
            billMinPayment.append(billMinPaymentInput)

            tr.append(billName)
            tr.append(billBalance)
            tr.append(billAPR)
            tr.append(billMinPayment)
            // newBillRow.append(billName, billBalance, billAPR, billMinPayment)


            // 5. create submit btn
            const submitEditBtn = document.createElement('button')
            const deleteBtn = document.createElement('button')
            submitEditBtn.innerText = 'Done'
            submitEditBtn.className = 'button is-success'
            deleteBtn.innerText = 'Delete'
            deleteBtn.className = 'button is-danger'
            tr.append(submitEditBtn)
            tr.append(deleteBtn)


            submitEditBtn.addEventListener('click', (e) => submitEdit(e))
            deleteBtn.addEventListener('click', (e) => deleteBill(e))

            // 6. send patch req...
            function submitEdit(e) {
                e.preventDefault();
                if (
                    (currentName == billNameInput.value) &&
                    (currentBalance == billBalanceInput.value) &&
                    (currentAPR == billAPRInput.value) &&
                    (currentMinPayment == billMinPaymentInput.value)
                ) {
                    let i = 5;
                    while (i > -1) {
                        tr.children[i].remove()
                        i--
                    }
                    tr.append(currentNameNode, currentBalanceNode, currentAPRNode, currentMinPaymentNode, editBtnBeforeSubmit)
                } else {
                    let i = 5;
                    while (i > -1) {
                        tr.children[i].remove()
                        i--
                    }
                    const billName = document.createElement('td');
                    const billBalance = document.createElement('td');
                    const billAPR = document.createElement('td');
                    const billMinPayment = document.createElement('td');
                    const billEdit = document.createElement('td')
                    const editBtn = document.createElement('button')

                    billRow.dataset.id = bill.id
                    billName.innerText = billNameInput.value
                    billBalance.innerText = `$${billBalanceInput.value}`
                    billAPR.innerText = `${round(billAPRInput.value,2)}%`
                    billMinPayment.innerText = `$${billMinPaymentInput.value}`
                    editBtn.innerText = 'edit'

                    const url = `http://localhost:3000/bills/${bill.id}`;
                    // debugger
                    const reqObj = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: billNameInput.value,
                            balance: billBalanceInput.value,
                            APR: billAPRInput.value / 100,
                            min_payment: billMinPaymentInput.value,
                        })
                    }

                    fetch(url, reqObj)
                    .then(mainFetch())

                    billEdit.append(editBtn)
                    editBtn.addEventListener('click', (e) => editBill(e))
                    tr.append(billName, billBalance, billAPR, billMinPayment, billEdit)
                }
            }
        } //end of edit button

        billRow.append(billName, billBalance, billAPR, billMinPayment, billEdit)
        billTable.append(billRow)
    } //end of bill render



    // ================= adding new bill
    const addButton = document.createElement('button')
    addButton.addEventListener('click', (e) => addBill(e))
    addButton.innerText = 'Add New Bill'
    addButton.id = 'add-button'
    addButton.className = 'button is-primary'
    const newBillFormSpot = document.querySelector('#bill-table')
    newBillFormSpot.append(addButton)


    function addBill(e) {
        e.preventDefault();
        // const addButton = document.querySelector('#add-button')
        e.target.remove()
        const newBillRow = document.createElement('tr')
        const billName = document.createElement('td');
        const billBalance = document.createElement('td');
        const billAPR = document.createElement('td');
        const billMinPayment = document.createElement('td');
        const submitNewButton = document.createElement('button')
        const cancelButton = document.createElement('button')

        const billNameInput = document.createElement('input');
        const billBalanceInput = document.createElement('input');
        const billAPRInput = document.createElement('input');
        const billMinPaymentInput = document.createElement('input');

        billNameInput.innerText = 'Company Name'
        billNameInput.placeholder = 'Add Company'
        billBalanceInput.placeholder = 'Add Balance'
        billAPRInput.placeholder = 'Add APR'
        // billDueDateInput.placeholder = 'Add Due Date'
        billMinPaymentInput.placeholder = 'Add Monthly Payment'
        submitNewButton.innerText = 'Submit'
        cancelButton.innerText = 'Cancel'

        billNameInput.className = 'input'
        billBalanceInput.className = 'input'
        billAPRInput.className = 'input'
        // billDueDateInput.placeholder = 'Add Due Date'
        billMinPaymentInput.className = 'input'
        submitNewButton.className = 'button is-success'
        cancelButton.className = 'button is-warning'



        billName.append(billNameInput)
        billBalance.append(billBalanceInput)
        billAPR.append(billAPRInput)
        // billDueDate.append(billDueDateInput)
        billMinPayment.append(billMinPaymentInput)

        newBillRow.append(billName, billBalance, billAPR, billMinPayment, submitNewButton, cancelButton)
        newBillFormSpot.append(newBillRow)
        cancelButton.addEventListener('click', (e) => cancelAdd(e))

        submitNewButton.addEventListener('click', (e) => sendBill(e))



        function sendBill(e) {
            e.preventDefault();
            // debugger
            const newBillInput = billNameInput.value
            const newBillBalanceInput = billBalanceInput.value
            const newBillAPRInput = billAPRInput.value
            // const newBillDueDateInput = billDueDateInput.value
            const newBillMinPaymentInput = billMinPaymentInput.value
            const targetId = parseInt(e.target.parentNode.parentNode.parentNode.dataset.id)
            const url = billsURL
            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newBillInput,
                    balance: newBillBalanceInput,
                    APR: newBillAPRInput / 100,
                    // due_date: newBillDueDateInput,
                    min_payment: newBillMinPaymentInput,
                    user_id: targetId
                })
            }

            fetch(url, reqObj)
                .then(resp => resp.json())
                .then(data => appendNewBill(data, e))

            function appendNewBill(data, e) {

                const billTable = e.target.parentElement.parentElement
                const billRow = document.createElement('tr')
                const billName = document.createElement('td');
                const billBalance = document.createElement('td');
                const billAPR = document.createElement('td');
                const billMinPayment = document.createElement('td');

                billName.innerText = data.name
                billBalance.innerText = `$${data.balance}`
                billAPR.innerText = `${round(((data.APR)*100),2)}%`
                billMinPayment.innerText = `$${data.min_payment}`

                const billEdit = document.createElement('td')
                const editBtn = document.createElement('button')
                editBtn.innerText = 'edit'
                billEdit.append(editBtn)

                editBtn.addEventListener('click', (e) => editBill(e))
                // e.target.previousSibling.remove()
                // e.srcElement.remove()
                // debugger

                e.target.parentNode.remove()
                billRow.append(billName, billBalance, billAPR, billMinPayment, billEdit)
                billTable.append(billRow)
                container.append(addButton)
                // mainCalculation()
                // mainFetch()
                // debugger
                while (dataDiv.firstChild) {
                  dataDiv.removeChild(dataDiv.firstChild);
                }
                while (renderedChart.firstChild) {
                  renderedChart.removeChild(renderedChart.firstChild);
                }
                // document.querySelector('#data').children[0].remove()
                // renderedChart.remove(renderedChart.children[0])
                // mainCalculation()
                // debugger
                // function createChart() {
                //   // create data
                //   let data = mainData
                //
                //   // set the chart type
                //   const chart = anychart.area();
                //
                //   chart.background().fill("#e2ebf0");
                //
                //   // set the series type and data
                //   series = chart.area(data);
                //
                //   // set the chart title
                //   chart.title(`Debt Snowball - Initial Added Amount: $${snowballStarterAmount}`);
                //
                //   // set the container id
                //   chart.container("chart");
                //
                //   // initiate drawing the chart
                //   chart.draw();
                // }
                // createChart()
                mainFetch()
                mainCalculation()

            }
        }


    }

    function deleteBill(e) {
        e.preventDefault()
        // debugger
        const tr = e.target.parentNode
        const targetId = parseInt(tr.dataset.id)
        // debugger
        const url = `http://localhost:3000/bills/${targetId}`
        const reqObj = {
            method: 'DELETE'
        }
        fetch(url, reqObj)
        tr.remove()
        // deleteAll()
        // mainCalculation()
        // mainFetch()
    }

    function cancelAdd(e) {
        e.preventDefault()
        const table = e.target.parentNode.parentNode
        const tr = e.target.parentNode
        const billTable = e.target.parentElement.parentElement
        tr.remove()
        const addButton = document.createElement('button')
        addButton.innerText = 'Add New Bill'
        addButton.className = 'button is-primary'
        table.append(addButton)
        addButton.addEventListener('click', (e) => addBill(e))
    }
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//============================================================//
//============================================================//
//============================================================//
//==================== CALCULATIONS ==========================//
//============================================================//
//============================================================//
//============================================================//
//============================================================//


function mainCalculation() {

  dataDiv.append(miniHeader)
  while (renderedChart.firstChild) {
    renderedChart.removeChild(renderedChart.firstChild);
  }

  fetch(URL)
      .then(resp => resp.json())
      .then(data => renderBills(data[3].bills));
}


let totalMonths = 0;
let leftover = 0
let previousMin = 0
let mainData = []
console.log('first chart', mainData)

//render chart lives in here
function renderBills(bills) {
  // debugger
  const sortedBills = bills.sort((a, b) => (a.balance > b.balance) ? 1 : ((b.balance > a.balance) ? -1 : 0))

    for (let i = 0; i < sortedBills.length; i++) {
        if (totalMonths == 0) {
            const firstBill = new BillCalculator(sortedBills[i])
            const firstOutput = firstBill.remainingMonths()
            totalMonths = firstOutput[0]
            leftover = firstOutput[1]
            previousMin = firstOutput[2]
        } else {
            const nextBill = new newBillCalculator(sortedBills[i])
            const newOutput = nextBill.remainingMonths()
            totalMonths = newOutput[0]
            leftover = newOutput[1]
            previousMin += newOutput[2]
        }
    }

    const finalTotal = document.createElement('p');
    finalTotal.innerText = `You will finish in ${totalMonths} months! Keep going!`;
    dataDiv.append(finalTotal)
    // debugger


    /////////////////////////////////////// CHART
    function createChart() {
      // create data
      let data = mainData

      // set the chart type
      const chart = anychart.area();

      chart.background().fill("#e2ebf0");

      // set the series type and data
      series = chart.column(data);

      // set the chart title
      chart.title(`Debt Snowball - Initial Added Amount: $${snowballStarterAmount}`);

      // set the container id
      chart.container("chart");

      chart.xAxis().title('Months Until Completion');
      chart.yAxis().title('Balance ($)');

      // chart.crosshair(true);

      // initiate drawing the chart
      chart.draw();
    }
    createChart()
}

function newBillCalculator(bill) {
    this.extraCash = userExtraBalance
    this.remainingMonths = function () {
        // debugger
        let i = 0;
        let bal = bill.balance

        let nonSnowballPay = bill.min_payment
        let firstSnowballPay = bill.min_payment + leftover
        let snowballPay = bill.min_payment + this.extraCash + previousMin
        let apr = (1 + (bill.APR / 12))
        let snowballStartMonth = 1 * totalMonths
        let newleftover = 0
        let aprTotal = 0

        while (bal > 0) {
            // debugger
            if (i == 0) {
                bal = (bal - nonSnowballPay)
            } else if (snowballPay > bal) {
                newleftover = (snowballPay - bal)
                bal -= bal
            } else if (i < snowballStartMonth - 1) {
                bal = (bal - nonSnowballPay) * apr
                // aprTotal += apr
            } else if (i == snowballStartMonth - 1) {
                bal = (bal - firstSnowballPay) * apr
                // aprTotal += apr
            } else {
                bal = (bal - snowballPay) * apr
                // aprTotal += apr
            }
            i++
            mainData.push([`Month ${i}`, bal])
        }

        const months = i
        const output = [months, newleftover, nonSnowballPay]

        const totalMonthOutput = document.createElement('p')
        totalMonthOutput.innerText = `Only ${months} months left to pay off ${bill.name}!`
        dataDiv.append(totalMonthOutput)

        return output
    }
}

function BillCalculator(bill) {
    this.extraCash = userExtraBalance;
    this.remainingMonths = function () {
        let i = 0;
        let bal = bill.balance
        let pay = bill.min_payment + this.extraCash
        let apr = (1 + (bill.APR / 12))
        let billAPR = (bal * apr)
        let aprTotal = 0
        let leftover = 0
        while (bal > 0) {
          // debugger
            if (i == 0) {
                bal = bal - pay
            } else if (pay > bal) {
                leftover += (pay - bal)
                bal -= bal
            } else {
                bal = (bal - pay) * apr
                aprTotal += apr
            }
            i++
            mainData.push([`Month ${i}`, bal])
        }
        let months = i
        let output = [months, leftover, bill.min_payment]

        const totalMonthOutput = document.createElement('p')
        totalMonthOutput.innerText = `${months} months left to pay off ${bill.name}! You're almost there!`
        dataDiv.append(totalMonthOutput)

        return output;
    }
}

mainFetch()
mainCalculation()

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////



// function preCalculation() {
// fetch(URL)
//     .then(resp => resp.json())
//     .then(data => renderOldBills(data[5].bills));
// }

// const dataDiv = document.querySelector('#data')
// let totalMonths = 0;
// let leftover = 0
// let previousMin = 0
// let mainData = []

// function renderOldBills(bills) {
//     while (dataDiv.firstChild) {
//       dataDiv.removeChild(dataDiv.firstChild);
//     }
//     const sortedBills = bills.sort((a, b) => (a.balance > b.balance) ? 1 : ((b.balance > a.balance) ? -1 : 0))
//
//     for (let i = 0; i < sortedBills.length; i++) {
//         if (totalMonths == 0) {
//             const firstBill = new BillCalculator(sortedBills[i])
//             const firstOutput = firstBill.remainingMonths()
//             totalMonths = firstOutput[0]
//             leftover = firstOutput[1]
//             previousMin = firstOutput[2]
//         } else {
//             const nextBill = new newBillCalculator(sortedBills[i])
//             const newOutput = nextBill.remainingMonths()
//             totalMonths = newOutput[0]
//             leftover = newOutput[1]
//             previousMin += newOutput[2]
//         }
//     }
//
//     const finalTotal = document.createElement('p');
//     finalTotal.innerText = `You will finish in ${totalMonths} months! Keep going!`;
//     dataDiv.append(finalTotal)
//
//     function createChart() {
//       // create data
//       let data = mainData
//
//       // set the chart type
//       const chart = anychart.area();
//
//       // set the series type and data
//       series = chart.area(data);
//
//       // set the chart title
//       chart.title("Debt Snowball");
//
//       // set the container id
//       chart.container("chart");
//
//       // initiate drawing the chart
//       chart.draw();
//     }
//     createChart()
// }
//
//
// function newBillCalculator(bill) {
//     this.extraCash = userExtraBalance
//     this.remainingMonths = function () {
//         // debugger
//         let i = 0;
//         let bal = bill.balance
//
//         let nonSnowballPay = bill.min_payment
//         let firstSnowballPay = bill.min_payment + leftover
//         let snowballPay = bill.min_payment + this.extraCash + previousMin
//         let apr = (1 + (bill.APR / 12))
//         let snowballStartMonth = 1 * totalMonths
//         let newleftover = 0
//         let aprTotal = 0
//
//         while (bal > 0) {
//             // debugger
//             if (i == 0) {
//                 bal = (bal - nonSnowballPay)
//             } else if (snowballPay > bal) {
//                 newleftover = (snowballPay - bal)
//                 bal -= bal
//             } else if (i < snowballStartMonth - 1) {
//                 bal = (bal - nonSnowballPay) * apr
//                 // aprTotal += apr
//             } else if (i == snowballStartMonth - 1) {
//                 bal = (bal - firstSnowballPay) * apr
//                 // aprTotal += apr
//             } else {
//                 bal = (bal - snowballPay) * apr
//                 // aprTotal += apr
//             }
//             mainData.push([`Month ${i}`, bal])
//             i++
//         }
//
//         const months = i
//         const output = [months, newleftover, nonSnowballPay]
//         const totalMonthOutput = document.createElement('p')
//         totalMonthOutput.innerText = `Only ${months} months left to pay off ${bill.name}!`
//         dataDiv.append(totalMonthOutput)
//         return output
//     }
// }
//
// function BillCalculator(bill) {
//     this.extraCash = userExtraBalance;
//     this.remainingMonths = function () {
//         let i = 0;
//         let bal = bill.balance
//         let pay = bill.min_payment + this.extraCash
//         let apr = (1 + (bill.APR / 12))
//         let billAPR = (bal * apr)
//         let aprTotal = 0
//         let leftover = 0
//         while (bal > 0) {
//             if (i == 0) {
//                 bal = bal - pay
//             } else if (pay > bal) {
//                 leftover += (pay - bal)
//                 bal -= bal
//             } else {
//                 bal = (bal - pay) * apr
//                 aprTotal += apr
//             }
//             i++
//         }
//         let months = i
//         let output = [months, leftover, bill.min_payment]
//
//         const totalMonthOutput = document.createElement('p')
//         totalMonthOutput.innerText = `${months} months left to pay off ${bill.name}! You're almost there!`
//         dataDiv.append(totalMonthOutput)
//         return output;
//         mainData.push([`Month ${i}`, bal])
//     }
// }

// preCalculation()
// mainFetch()


//end
