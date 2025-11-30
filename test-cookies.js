// Test script to verify secure cookie authentication
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:8080/api/auth';

async function testSecureCookies() {
    console.log('🧪 Testing Secure Cookie Authentication\n');

    try {
        // Test 1: Signup with cookies
        console.log('1. Testing Signup...');
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
        const signupCookies = signupResponse.headers.get('set-cookie');

        console.log('✅ Signup Status:', signupResponse.status);
        console.log('📝 Signup Response:', signupData);
        console.log('🍪 Signup Cookies:', signupCookies);
        console.log('');

        // Test 2: Login with cookies
        console.log('2. Testing Login...');
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
        const loginCookies = loginResponse.headers.get('set-cookie');

        console.log('✅ Login Status:', loginResponse.status);
        console.log('📝 Login Response:', loginData);
        console.log('🍪 Login Cookies:', loginCookies);
        console.log('');

        // Extract cookies for next request
        let cookieHeader = '';
        if (loginCookies) {
            const cookies = loginCookies.split(',').map(cookie => cookie.split(';')[0]).join('; ');
            cookieHeader = cookies;
        }

        // Test 3: Access protected route with cookies
        console.log('3. Testing Protected Route...');
        const profileResponse = await fetch(`${baseUrl}/profile`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader
            }
        });

        const profileData = await profileResponse.json();

        console.log('✅ Profile Status:', profileResponse.status);
        console.log('📝 Profile Response:', profileData);
        console.log('');

        // Test 4: Logout
        console.log('4. Testing Logout...');
        const logoutResponse = await fetch(`${baseUrl}/logout`, {
            method: 'POST',
            headers: {
                'Cookie': cookieHeader
            }
        });

        const logoutData = await logoutResponse.json();
        const logoutCookies = logoutResponse.headers.get('set-cookie');

        console.log('✅ Logout Status:', logoutResponse.status);
        console.log('📝 Logout Response:', logoutData);
        console.log('🍪 Logout Cookies (should clear):', logoutCookies);
        console.log('');

        // Test 5: Try to access protected route after logout
        console.log('5. Testing Protected Route After Logout...');
        const afterLogoutResponse = await fetch(`${baseUrl}/profile`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader
            }
        });

        const afterLogoutData = await afterLogoutResponse.json();

        console.log('❌ After Logout Status:', afterLogoutResponse.status);
        console.log('📝 After Logout Response:', afterLogoutData);

    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

// Run tests
testSecureCookies();