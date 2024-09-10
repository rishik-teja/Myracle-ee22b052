document.getElementById('generateInstructions').addEventListener('click', async function() {
    const form = document.getElementById('testingForm');
    const formData = new FormData(form);

    try {
        const response = await fetch('/generate-instructions', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('output').innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        } else {
            document.getElementById('output').textContent = 'Error generating instructions. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'An error occurred. Please try again.';
    }
});
