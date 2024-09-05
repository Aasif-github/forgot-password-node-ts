document.getElementById('resetPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    // Basic client-side validation
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Prepare data to send
    const data = {
        token,
        newPassword
    };

    console.log('front:',data);

    try {
        const response = await fetch('http://localhost:3000/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Password reset successful! You can now log in.');
            window.location.href = '/login';
        } else {
            const result = await response.json();
            errorMessage.textContent = result.message || 'An error occurred!';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred while resetting the password!';
        console.error(error);
    }
});
