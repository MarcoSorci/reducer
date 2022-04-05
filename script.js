let counter = 0;

window.addEventListener("state-update", (e) => updateCounter(e.detail));

const manager = new StateManager(counter);

function plusOne() {
    // manager.addOne()
    // updateCounter()
    dispatchEvent(new CustomEvent("plus-one"));
}

function minusOne() {
    // manager.removeOne()
    // updateCounter()
    dispatchEvent(new CustomEvent("minus-one"));
}

function undo() {
    // manager.undo()
    // updateCounter()
    dispatchEvent(new CustomEvent("undo-action"));
}

function redo() {
    // manager.undo()
    // updateCounter()
    dispatchEvent(new CustomEvent("redo-action"));
}

function reset() {
    manager.reset();
    updateCounter();
}

function updateCounter(state) {
    const counterLabel = document.getElementById('counter');
    counterLabel.innerHTML = state;
}

// let counterHistory = [0];

// let historyIndex = 0;

// function plusOne() {
//     counter++;
//     counterHistory = counterHistory.slice(0, historyIndex + 1);
//     counterHistory.push(counter);
//     historyIndex++;
//     updateCounter();
// }

// function minusOne() {
//     counter--;
//     counterHistory = counterHistory.slice(0, historyIndex + 1);
//     counterHistory.push(counter);
//     historyIndex++;
//     updateCounter();
// }

// function updateCounter() {
//     const counterLabel = document.getElementById('counter');
//     counterLabel.innerHTML = counter;
// }


// function undo() {
//     if (historyIndex > 0) {
//         historyIndex--;
//         counter = counterHistory[historyIndex];
//         updateCounter();
//     }

// }
// function redo() {
//     if (historyIndex < counterHistory.length - 1) {
//         historyIndex++;
//         counter = counterHistory[historyIndex];
//         updateCounter();
//     }
// }