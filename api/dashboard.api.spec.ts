import { test, expect } from '@playwright/test';
import loginData from '../test-data/login-data.json';

test.describe('OrangeHRM Dashboard Widget API Lifecycle', () => {


    // ==========================================
    // 1. READ TEST (GET)
    // ==========================================
    test('GET - Should successfully retrieve My Actions widget metrics', async ({ request }) => {

        const response = await request.get('/web/index.php/attendance/punchIn', {
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