# Mentor Chat Web App

A modern, sleek web application for interactive learning with your AI Mentor. This app provides an intuitive chat interface along with productivity features to track your learning journey.

## Features

### Chat with Mentor
- Clean, modern chat interface
- Real-time conversation with your AI mentor
- Smart response system that provides guidance and support
- Auto-scrolling chat messages
- Clear chat history option

### Next Steps Panel
- Visual learning roadmap
- Add, view, and remove learning steps
- Sequential numbering for clarity
- Track your progress through your learning journey

### To-Do List
- Task management integrated into your learning flow
- Check off completed tasks
- Add and remove tasks as needed
- Visual completion tracking

### Additional Features
- **Dark/Light Theme Toggle**: Switch between themes for comfortable viewing
- **Persistent Storage**: All your data is saved locally in your browser
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Gradient accents, smooth animations, and clean typography

## Usage

### Getting Started
1. Open `index.html` in your web browser
2. Start chatting with your mentor in the main chat panel
3. Add your learning steps in the "Next Steps" panel
4. Track tasks in the "To-Do List" panel

### Chat Commands
Simply type your questions or thoughts in the chat box and press Enter or click the send button. The mentor will respond with helpful guidance on:
- Programming concepts
- Learning strategies
- Project ideas
- Motivation and encouragement
- Problem-solving advice

### Managing Next Steps
1. Click the "+" button in the Next Steps panel header
2. Enter your step text
3. Click "Add" or press Enter
4. Hover over a step to reveal the delete button

### Managing To-Dos
1. Click the "+" button in the To-Do List panel header
2. Enter your task text
3. Click "Add" or press Enter
4. Check the checkbox to mark tasks as complete
5. Hover over a task to reveal the delete button

### Theme Toggle
Click the sun/moon icon in the header to switch between light and dark themes.

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No dependencies, pure JS implementation
- **LocalStorage API**: Client-side data persistence

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### File Structure
```
mentor-chat/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and themes
├── script.js       # Application logic and interactivity
└── README.md       # Documentation
```

## Features Breakdown

### Responsive Layout
- Desktop: Side-by-side chat and sidebar panels
- Tablet: Adjusted panel widths
- Mobile: Stacked layout for optimal mobile experience

### Data Persistence
All data is automatically saved to browser localStorage:
- Chat messages
- Next steps
- To-do items
- Theme preference
- Auto-save every 30 seconds

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- ARIA-compliant form controls
- High contrast color schemes
- Focus indicators

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #667eea;
    --primary-dark: #5a67d8;
    /* ... more variables ... */
}
```

### Modifying Mentor Responses
Edit the `generateMentorResponse()` function in `script.js` to customize how the mentor responds to different keywords and questions.

## Future Enhancements

Potential features for future versions:
- Integration with real AI/LLM APIs
- Export chat history
- Multiple mentor personalities
- Progress statistics and analytics
- Calendar integration
- Note-taking functionality
- File attachments in chat

## License

This project is open source and available for personal and educational use.

## Credits

Built with modern web technologies and a focus on user experience.
