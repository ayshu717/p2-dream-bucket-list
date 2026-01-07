const goalInput = document.getElementById('goalInput');
const addBtn = document.getElementById('addBtn');
const goalList = document.getElementById('goalList');

let goals = JSON.parse(localStorage.getItem('goals')) || [];

function saveGoals() {
    localStorage.setItem('goals', JSON.stringify(goals));
}

function renderGoals() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${goal.completed ? 'checked' : ''} onchange="toggleGoal(${index})">
            <span>${goal.text}</span>
            <button class="delete-btn" onclick="deleteGoal(${index})"><i class="fas fa-trash"></i></button>
        `;
        goalList.appendChild(li);
    });
}

function addGoal() {
    const text = goalInput.value.trim();
    if (text) {
        goals.push({ text, completed: false });
        saveGoals();
        renderGoals();
        goalInput.value = '';
    }
}

function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;
    saveGoals();
    renderGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);
    saveGoals();
    renderGoals();
}

addBtn.addEventListener('click', addGoal);
goalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addGoal();
});

renderGoals();