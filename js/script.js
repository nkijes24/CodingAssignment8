/*
    Dungeon Loot Splitter script.
/*
    Required array:
    lootItems is declared at the top of the file so it persists across button clicks.
    Each added loot item becomes an object with name and value properties.
*/
let lootItems = [];

/*
    Required DOM access method:
    Every element is accessed using getElementById(), as required by the assignment.
*/
let partySizeInput = document.getElementById('partySize');
let lootNameInput = document.getElementById('lootName');
let lootValueInput = document.getElementById('lootValue');
let addLootButton = document.getElementById('addLootButton');
let splitLootButton = document.getElementById('splitLootButton');
let lootList = document.getElementById('lootList');
let runningTotal = document.getElementById('runningTotal');
let finalTotal = document.getElementById('finalTotal');
let lootPerMember = document.getElementById('lootPerMember');
let addMessage = document.getElementById('addMessage');
let splitMessage = document.getElementById('splitMessage');

/*
    Required total calculation loop:
    This function uses a traditional for loop to calculate the total value
    from every object stored in the lootItems array.
*/
function calculateTotalLoot() {
    let total = 0;

    for (let i = 0; i < lootItems.length; i++) {
        total += lootItems[i].value;
    }

    return total;
}

/*
    Required addLoot function:
    This function validates input before pushing a new object into the array.
    All validation feedback appears inside the page interface.
*/
function addLoot() {
    let lootName = lootNameInput.value.trim();
    let lootValue = Number(lootValueInput.value);

    addMessage.textContent = '';
    splitMessage.textContent = '';

    if (lootName === '') {
        addMessage.textContent = 'Please enter a loot name.';
        return;
    }

    if (lootValueInput.value === '') {
        addMessage.textContent = 'Please enter a loot value.';
        return;
    }

    if (Number.isNaN(lootValue)) {
        addMessage.textContent = 'Loot value must be a valid number.';
        return;
    }

    if (lootValue < 0) {
        addMessage.textContent = 'Loot value cannot be negative.';
        return;
    }

    lootItems.push({
        name: lootName,
        value: lootValue
    });

    lootNameInput.value = '';
    lootValueInput.value = '';

    renderLoot();
}

/*
    Required render loop:
    This function uses a traditional for loop to rebuild the visible loot list
    every time the stored array changes.
*/
function renderLoot() {
    let total = calculateTotalLoot();
    let listOutput = '';

    if (lootItems.length === 0) {
        lootList.innerHTML = '<li>No loot entered yet.</li>';
        runningTotal.textContent = total.toFixed(2);
        return;
    }

    for (let i = 0; i < lootItems.length; i++) {
        listOutput += '<li>' + lootItems[i].name + ' - $' + lootItems[i].value.toFixed(2) + '</li>';
    }

    lootList.innerHTML = listOutput;
    runningTotal.textContent = total.toFixed(2);
}

/*
    Required splitLoot function:
    This function validates the party size and no-loot edge case before calculating
    the final split amount. Values are formatted with toFixed(2).
*/
function splitLoot() {
    let partySize = Number(partySizeInput.value);
    let total = calculateTotalLoot();

    splitMessage.textContent = '';
    addMessage.textContent = '';

    if (lootItems.length === 0) {
        splitMessage.textContent = 'Please add at least one loot item before splitting loot.';
        finalTotal.textContent = '0.00';
        lootPerMember.textContent = '0.00';
        return;
    }

    if (partySizeInput.value === '') {
        splitMessage.textContent = 'Please enter the number of party members.';
        return;
    }

    if (Number.isNaN(partySize) || partySize < 1) {
        splitMessage.textContent = 'Party size must be 1 or greater.';
        return;
    }

    finalTotal.textContent = total.toFixed(2);
    lootPerMember.textContent = (total / partySize).toFixed(2);
}

/*
    Required event listeners:
    Button clicks trigger functions instead of using prompts, alerts, or document.write.
*/
addLootButton.addEventListener('click', addLoot);
splitLootButton.addEventListener('click', splitLoot);

/* Initial render gives the page a clear starting state. */
renderLoot();
