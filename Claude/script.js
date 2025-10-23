// State Management
let state = {
    theme: 'light',
    messages: [],
    steps: [],
    todos: [],
    nextStepId: 4,
    nextTodoId: 4,
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeEventListeners();
    applyTheme();
});

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('mentorAppState');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            state = { ...state, ...parsed };

            // Render loaded data
            renderSteps();
            renderTodos();

            // Load messages if any
            if (state.messages.length > 0) {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.innerHTML = '';
                state.messages.forEach(msg => {
                    appendMessage(msg.text, msg.isUser, false);
                });
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
    } else {
        // Initialize with default data
        state.steps = [
            { id: 1, text: 'Review the fundamentals' },
            { id: 2, text: 'Practice with examples' },
            { id: 3, text: 'Build a small project' },
        ];
        state.todos = [
            { id: 1, text: 'Set up development environment', completed: false },
            { id: 2, text: 'Complete tutorial exercises', completed: false },
            { id: 3, text: 'Read documentation', completed: true },
        ];
        state.messages = [{
            text: "Hello! I'm your Mentor. I'm here to help guide you on your learning journey. How can I assist you today?",
            isUser: false
        }];
        saveState();
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('mentorAppState', JSON.stringify(state));
    } catch (e) {
        console.error('Error saving state:', e);
    }
}

// Theme Management
function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveState();
}

// Event Listeners
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    });

    // Clear chat
    document.getElementById('clearChat').addEventListener('click', clearChat);

    // Next Steps
    document.getElementById('addStep').addEventListener('click', () => showAddModal('step'));

    // To-Do List
    document.getElementById('addTodo').addEventListener('click', () => showAddModal('todo'));
}

// Chat Functions
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    appendMessage(message, true);
    state.messages.push({ text: message, isUser: true });

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();

    // Simulate mentor response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateMentorResponse(message);
        appendMessage(response, false);
        state.messages.push({ text: response, isUser: false });
        saveState();
    }, 1000 + Math.random() * 1000);

    saveState();
}

function appendMessage(text, isUser, shouldSave = true) {
    const chatMessages = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'mentor-message'}`;

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </div>
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.className = 'message mentor-message typing-indicator-message';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        state.messages = [{
            text: "Hello! I'm your Mentor. I'm here to help guide you on your learning journey. How can I assist you today?",
            isUser: false
        }];
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        appendMessage(state.messages[0].text, false);
        saveState();
    }
}

function generateMentorResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Simple response logic
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I help you with your learning today?";
    } else if (lowerMessage.includes('help')) {
        return "I'm here to guide you! You can ask me about programming concepts, get advice on your learning path, or discuss any challenges you're facing. What would you like to explore?";
    } else if (lowerMessage.includes('project')) {
        return "Building projects is a great way to learn! Start with something simple that interests you, and gradually add complexity. What kind of project are you thinking about?";
    } else if (lowerMessage.includes('learn')) {
        return "Learning effectively requires consistency and practice. Break down complex topics into smaller chunks, practice regularly, and don't hesitate to build things along the way. What are you currently learning?";
    } else if (lowerMessage.includes('stuck') || lowerMessage.includes('confused')) {
        return "It's normal to feel stuck sometimes. Try breaking the problem into smaller parts, or explain it to someone (even a rubber duck!). Can you tell me more about what's confusing you?";
    } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
        return "You're welcome! Keep up the great work. Remember, consistent progress is more important than perfection.";
    } else if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated')) {
        return "Remember why you started! Celebrate small wins, track your progress, and connect with others on the same journey. Every expert was once a beginner. You've got this!";
    } else if (lowerMessage.includes('next') || lowerMessage.includes('what should')) {
        return "Based on your current progress, I'd suggest focusing on practical application. Check out the 'Next Steps' panel for some guidance. What area would you like to focus on?";
    } else {
        const responses = [
            "That's an interesting question! Can you tell me more about what you're working on?",
            "I understand. Let's break this down together. What specific aspect would you like to explore?",
            "Great question! The key is to approach it step by step. What have you tried so far?",
            "I see where you're coming from. Have you checked the fundamentals related to this topic?",
            "That's a common challenge. Practice and experimentation will help you master it. What's your next step?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Next Steps Functions
function renderSteps() {
    const stepsList = document.getElementById('stepsList');
    stepsList.innerHTML = '';

    state.steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step-item';
        stepElement.setAttribute('data-step-id', step.id);
        stepElement.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <p class="step-text">${escapeHtml(step.text)}</p>
            </div>
            <button class="step-delete" title="Delete step">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        `;

        stepElement.querySelector('.step-delete').addEventListener('click', () => {
            deleteStep(step.id);
        });

        stepsList.appendChild(stepElement);
    });
}

function addStep(text) {
    state.steps.push({
        id: state.nextStepId++,
        text: text
    });
    renderSteps();
    saveState();
}

function deleteStep(stepId) {
    state.steps = state.steps.filter(step => step.id !== stepId);
    renderSteps();
    saveState();
}

// To-Do Functions
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    state.todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.className = 'todo-item';
        todoElement.setAttribute('data-todo-id', todo.id);
        todoElement.innerHTML = `
            <input type="checkbox" id="todo-${todo.id}" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <label for="todo-${todo.id}" class="todo-text">${escapeHtml(todo.text)}</label>
            <button class="todo-delete" title="Delete task">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        `;

        todoElement.querySelector('.todo-checkbox').addEventListener('change', (e) => {
            toggleTodo(todo.id, e.target.checked);
        });

        todoElement.querySelector('.todo-delete').addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        todoList.appendChild(todoElement);
    });
}

function addTodo(text) {
    state.todos.push({
        id: state.nextTodoId++,
        text: text,
        completed: false
    });
    renderTodos();
    saveState();
}

function toggleTodo(todoId, completed) {
    const todo = state.todos.find(t => t.id === todoId);
    if (todo) {
        todo.completed = completed;
        saveState();
    }
}

function deleteTodo(todoId) {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    renderTodos();
    saveState();
}

// Modal Functions
function showAddModal(type) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const title = type === 'step' ? 'Add Next Step' : 'Add To-Do';
    const placeholder = type === 'step' ? 'Enter next step...' : 'Enter task...';

    modal.innerHTML = `
        <h3>${title}</h3>
        <input type="text" class="modal-input" placeholder="${placeholder}" id="modalInput" autofocus>
        <div class="modal-actions">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="modalAdd">Add</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const input = document.getElementById('modalInput');
    const cancelBtn = document.getElementById('modalCancel');
    const addBtn = document.getElementById('modalAdd');

    // Focus input
    setTimeout(() => input.focus(), 100);

    // Event listeners
    const closeModal = () => {
        overlay.remove();
    };

    const handleAdd = () => {
        const text = input.value.trim();
        if (text) {
            if (type === 'step') {
                addStep(text);
            } else {
                addTodo(text);
            }
            closeModal();
        }
    };

    cancelBtn.addEventListener('click', closeModal);
    addBtn.addEventListener('click', handleAdd);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-save periodically
setInterval(() => {
    saveState();
}, 30000); // Save every 30 seconds
