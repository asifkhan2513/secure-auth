// Simple test script to verify API endpoints
const testEndpoints = async () => {
    const baseUrl = 'http://localhost:8080/api/v1/auth';

    console.log('Testing API endpoints...\n');

    // Test 1: Send OTP
    try {
        const otpResponse = await fetch(`${baseUrl}/sendotp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com'
            })
        });

        const otpData = await otpResponse.json();
        console.log('1. Send OTP Test:', otpResponse.status, otpData);
    } catch (error) {
        console.log('1. Send OTP Test Error:', error.message);
    }

    // Test 2: Signup
    try {
        const signupResponse = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            })
        });

        const signupData = await signupResponse.json();
        console.log('2. Signup Test:', signupResponse.status, signupData);
    } catch (error) {
        console.log('2. Signup Test Error:', error.message);
    }

    // Test 3: Login
    try {
        const loginResponse = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'testuser@example.com',
                password: 'password123'
            })
        });

        const loginData = await loginResponse.json();
        console.log('3. Login Test:', loginResponse.status, loginData);
    } catch (error) {
        console.log('3. Login Test Error:', error.message);
    }
};

// Run tests
testEndpoints();