export const loggedInSelector = (state) => state.Auth.get('loggedIn');
export const errorSelector = (state) => state.Auth.get('signInError');
export const registerFormSelector = (state) => state.form.RegisterForm;
export const recoveryFormSelector = (state) => state.form.RecoveryForm;
export const passResetFormSelector = (state) => state.form.PassResetForm;
