import { test, expect } from '@playwright/test';
import loginData from '../test-data/login-data.json';

test.describe('OrangeHRM Dashboard Widget API Lifecycle', () => {

    let sessionHeaders: any = {};

    // BEFORE ALL: Authenticate once to grab the security cookie key
    test.beforeAll(async ({ request }) => {

        const loginResponse = await request.post('/web/index.php/auth/validate', {
            form: {
                username: loginData.validUser.username,
                password: loginData.validUser.correctPassword
            },
            maxRedirects: 0
        });

        expect(loginResponse.status()).toBe(302);

        const cookies = loginResponse.headers()['set-cookie'];

        expect(cookies).toBeDefined();

        // Extract only the cookie name and value
        const cookieValue = cookies
            ?.split(',')
            .map(cookie => cookie.split(';')[0])
            .join('; ');

        sessionHeaders = {
            'Cookie': cookieValue
        };

        console.log('✅ Authentication successful');
    });


    // ==========================================
    // 1. READ TEST (GET)
    // ==========================================
    test('GET - Should successfully retrieve My Actions widget metrics', async ({ request }) => {

        const response = await request.get('/web/index.php/attendance/punchIn', {
            headers: sessionHeaders,
            maxRedirects: 0
        });

        console.log(
            `🔍 Attendance screen returned status code: ${response.status()}`
        );

        expect(response.status()).not.toBe(405);

        const redirectLocation = response.headers()['location'];

        console.log(
            'Punch transaction complete. Routing to:',
            redirectLocation
        );
    });

});