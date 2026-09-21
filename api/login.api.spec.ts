import { test, expect } from '@playwright/test';
import loginData from '../test-data/login-data.json';

test.describe('OrangeHrm Login API Boundaries', () => {
    
    // ✨ CRITICAL TDD ISOLATION FIX
    // Tells Playwright to explicitly clear out the global storage state for this file.
    // This ensures your unhappy paths actually test raw credential validation without session cookies!
    test.use({ storageState: { cookies: [], origins: [] } });

    // ==========================================
    // 1. HAPPY PATH (POSITIVE TESTING)
    // ==========================================
    test('API test should pass with valid login credentials(Happy Path or Positive testing)', async ({ request }) => {
        
        // 1. Send the login request using the 'form' property
        const response = await request.post('/web/index.php/auth/validate', {
            form: {
                username: loginData.validUser.username,
                password: loginData.validUser.correctPassword, 
            },
            // Tell the backend runner not to follow redirects automatically 
            // so we can capture the raw redirection destination header securely
            maxRedirects: 0 
        });

        // 2. Validate the status code
        // A successful login redirect is traditionally a 302 Found or 200 OK depending on configuration blocks
        expect([200, 302]).toContain(response.status());

        // 3. Extract and Verify the Cookie directly from the headers! 🌟
        // This is the absolute industry norm for verifying API logic
        const responseHeaders = response.headers();
        const setCookieHeader = responseHeaders['set-cookie'];
        
        console.log('Captured Session Cookie Data:', setCookieHeader);
        expect(setCookieHeader).toBeDefined();

        // 4. Validate that the cookie contains the active session token flag
        expect(setCookieHeader).toContain('orangehrm');
    });

    // ==========================================
    // 2. UNHAPPY PATHS (NEGATIVE TESTING)
    // ==========================================

    test('API Test should fail when using wrong password', async ({ request }) => {
        const response = await request.post('/web/index.php/auth/validate', {
            form: {
                username: loginData.invalidUser.username,
                password: loginData.invalidUser.password // wrongpassword
            },
            maxRedirects: 0
        });

        // The server still responds with a redirect/found status code
        expect([200, 302]).toContain(response.status());

        // Verify it kicks the request back to the login screen landing page
        const redirectLocation = response.headers()['location'];
        expect(redirectLocation).toContain('auth/login');
        console.log('Incorrect Password Redirected to:', redirectLocation);
        
        // Re-verify back to login confirmation match
        expect(redirectLocation).toContain('auth/login');
    });

    test('API test should fail when username field is completely empty', async ({ request }) => {
        const response = await request.post('/web/index.php/auth/validate', {
            form: {
                // Reading from empty username object mapping
                username: loginData.emptyUsername.username,
                password: loginData.emptyUsername.password
            },
            maxRedirects: 0
        });

        expect([200, 302]).toContain(response.status());
        const redirectLocation = response.headers()['location'];
        expect(redirectLocation).toContain('auth/login');
    });

    test('API Test should fail when fake username is entered', async ({ request }) => {
        const response = await request.post('/web/index.php/auth/validate', {
            form: {
                // Reading from the fake username
                username: loginData.fakeUser.username,
                password: loginData.fakeUser.password
            },
            maxRedirects: 0
        });

        expect([200, 302]).toContain(response.status());
        const redirectLocation = response.headers()['location'];
        expect(redirectLocation).toContain('auth/login');
    });
});
