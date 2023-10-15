const display = document.querySelector(".screen")
const num_operatorBtn = document.querySelectorAll(".num_operator")
const clearBtn = document.querySelector(".clear")
const resultBtn = document.querySelector(".equal")
const crossBtn = document.querySelector(".back-btn")

const operators = ["+", "-", "*", "/"]
let displayArray = []

function calc() {
    try {
        display.value = eval(display.value)
        displayArray = []
    } catch(error) {
        display.value = "Invalid entries"
    }
}

function updateDisplay(value) {
    let decimalCount = 0
    let operatorCount = 0

    if(value === ".") {

        for (let i = 0; i < displayArray.length; i++) {
            if (displayArray[i] === ".") {
                decimalCount++
            } else if (operators.includes(displayArray[i])) {
                operatorCount++
            }
        }

        if (decimalCount <= operatorCount) {
            displayArray.push(value)
        }

    } else if (operators.includes(value)) {
        if(operators.includes(displayArray[displayArray.length - 1])) {
            if (value === "+" && displayArray[displayArray.length - 1] !== "+" && (displayArray[displayArray.length - 2] === "*" || displayArray[displayArray.length - 2] === "/")) {
                displayArray.pop()
                displayArray[displayArray.length - 1] = "+"
            } else if (value === "+" && displayArray[displayArray.length - 1] !== "+") {
                displayArray[displayArray.length - 1] = "+"
            } else if (value === "-") {
                if (displayArray[displayArray.length - 1] === "*" || displayArray[displayArray.length - 1] === "/") {
                    displayArray.push(value)
                } else if (displayArray[displayArray.length - 1] === "+") {
                    displayArray[displayArray.length - 1] = "-"
                }
            } else if ( value === "*") {
                if (displayArray[displayArray.length - 1] === "-") {
                    if (displayArray[displayArray.length - 2] === "/") {
                        displayArray.pop()
                        displayArray[displayArray.length - 1] = "*"
                    } else if (displayArray[displayArray.length - 2] === "*") {
                        displayArray.pop()
                    } else {
                        displayArray[displayArray.length - 1] = value
                    }
                } else {
                    displayArray[displayArray.length - 1] = value
                }
            } else if ( value === "/") {
                if (displayArray[displayArray.length - 1] === "-") {
                    if (displayArray[displayArray.length - 2] === "*") {
                        displayArray.pop()
                        displayArray[displayArray.length - 1] = "/"
                    } else if (displayArray[displayArray.length - 2] === "/") {
                        displayArray.pop()
                    } else {
                        displayArray[displayArray.length - 1] = value
                    }
                } else {
                    displayArray[displayArray.length - 1] = value
                }
            }
        } else {
            displayArray.push(value)
        }
    } else {
        displayArray.push(value)
    }

    display.value = displayArray.join("")
    display.scrollLeft = display.scrollWidth
}

function clearDisplay() {
    displayArray = []
    display.value = displayArray
}

function deleteLastEntry() {
    displayArray.pop()
    display.value = displayArray.join("")
}

num_operatorBtn.forEach( (button)=> {
    button.addEventListener('click', (e) => {
        updateDisplay(e.target.dataset.num)
    })
})

clearBtn.addEventListener('click', () => {
    clearDisplay()
})

crossBtn.addEventListener('click', () => {
    deleteLastEntry()
})

resultBtn.addEventListener('click', () => {
    calc()
})




