// control.js
document.addEventListener('DOMContentLoaded', () => {
    const directionButtons = document.querySelectorAll('.direction-button');
    const robotStatus = document.getElementById('robot-status');
    const startMappingButton = document.getElementById('start-mapping');

    // Function to send movement commands
    const moveRobot = async (direction) => {
        try {
            const response = await fetch(`/api/move/${direction}/`, { method: 'POST' });
            const data = await response.json();
            robotStatus.textContent = `로봇 이동: ${direction}`;
        } catch (error) {
            console.error('이동중');
            robotStatus.textContent = '이동중';
        }
    };

    // Add click event listeners to direction buttons
    directionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.id;
            moveRobot(direction);
        });
    });

    // Start mapping functionality
    startMappingButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/start-mapping/', { method: 'POST' });
            const data = await response.json();
            robotStatus.textContent = '매핑 시작됨';
        } catch (error) {
            console.error('Error:', error);
            robotStatus.textContent = '매핑 시작됨';
        }
    });
});
