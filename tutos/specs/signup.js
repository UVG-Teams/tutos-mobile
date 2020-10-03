import { goTo } from './helpers'

export default function(spec) {

    spec.beforeEach(function() {
        // This will run before each test in this spec file.
    });

    spec.describe('Signing up', function() {

        // spec.it('works', async function() {
        //     const navigation = await spec.findComponent('AppNavigation')
        //     // await spec.exists('Index');
        //     await goTo(navigation, 'signup');
        //     await spec.exists('SignUp');
        //     // await spec.fillIn('SignupScreen.Username', 'Cavy1');
        //     // await spec.fillIn('SignupScreen.FirstName', 'Cavy');
        //     // await spec.fillIn('SignupScreen.LastName', 'Test');
        //     // await spec.fillIn('SignupScreen.Email', 'cavy@test.com');
        //     // await spec.fillIn('SignupScreen.Password', 'Prueba');
        //     // await spec.fillIn('SignupScreen.PasswordConfirm', 'Prueba');
        //     // await spec.press('SignupScreen.Button');
        //     // await spec.exists('Home');
        // });
    });
}