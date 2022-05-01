import Auth from '../modules/auth-module/Auth';

export default function(ctx, inject) {
    const opt = <%= JSON.stringify(options) %>
    const auth = new Auth(ctx, opt);
    
    inject('auth', auth);
}
