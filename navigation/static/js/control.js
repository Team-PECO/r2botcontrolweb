document.addEventListener('DOMContentLoaded', () => {
    const directionButtons = document.querySelectorAll('.direction-button');
    const robotStatus = document.getElementById('robot-status');
    const startMappingButton = document.getElementById('start-mapping');

    // Function to send movement commands
    const moveRobot = async (direction) => {
        try {
            await fetch(`/api/move/${direction}/`, { method: 'POST' });
            robotStatus.textContent = '이동중';
        } catch (error) {
            console.error('Error:', error);
            // We're not displaying the error in the status screen as per your request
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
            await fetch('/api/start-mapping/', { method: 'POST' });
            robotStatus.textContent = '매핑 시작됨';
        } catch (error) {
            console.error('Error:', error);
            // We're still setting the status to "매핑 완료" even if there's an error
            robotStatus.textContent = '매핑 시작됨';
        }
    });
});