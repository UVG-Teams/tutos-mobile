export default function(spec) {

    spec.beforeEach(function() {
        // This will run before each test in this spec file.
    });

    spec.describe('Logging in', function() {

        spec.it('Forgot password press button', async function() {
            await spec.exists('Index');
            await spec.press('IndexScreen.ButtonLogin');
            await spec.exists('Login');
            await spec.press('LoginScreen.ButtonForgot');
        });

        spec.it('Fail - without credentials', async function() {
            await spec.exists('Index');
            await spec.press('IndexScreen.ButtonLogin');
            await spec.exists('Login');
            await spec.press('LoginScreen.Button');
            await spec.exists('Login');
        });

        spec.it('Fail', async function() {
            await spec.exists('Index');
            await spec.press('IndexScreen.ButtonLogin');
            await spec.exists('Login');
            // await spec.fillIn('LoginScreen.Username', 'Willi');
            // await spec.fillIn('LoginScreen.Password', 'Admin');
            await spec.press('LoginScreen.Button');
            await spec.exists('Login');
        });

        spec.it('Success', async function() {
            await spec.exists('Index');
            await spec.press('IndexScreen.ButtonLogin');
            await spec.exists('Login');
            // await spec.fillIn('LoginScreen.Username', 'Willi');
            // await spec.fillIn('LoginScreen.Password', 'Admin');
            await spec.press('LoginScreen.Button');
        });
    });
}