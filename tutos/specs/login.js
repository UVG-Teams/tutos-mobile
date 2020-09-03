export default function(spec) {
    
    spec.beforeEach(function() {
        // This will run before each test in this spec file.
    });
    
    spec.describe('Logging in', function() {
        
        // spec.it('Forgot password', async function() {
        //     await spec.exists('Login');
        //     await spec.press('LoginScreen.ButtonForgot');
        // });
        
        spec.it('Fail', async function() {
            await spec.exists('Login');
            // await spec.fillIn('LoginScreen.Username', 'Willi');
            // await spec.fillIn('LoginScreen.Password', 'Admin');
            await spec.press('LoginScreen.Button');
            await spec.exists('Login');
        });
        
        spec.it('Success', async function() {
            await spec.exists('Login');
            await spec.fillIn('LoginScreen.Username', 'Willi');
            // await spec.fillIn('LoginScreen.Password', 'Admin');
            await spec.press('LoginScreen.Button');
            await spec.exists('Login');
        });
    });
}