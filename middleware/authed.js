export default function(ctx) {
    if (ctx.$auth.state.loggedIn === false) {
        return ctx.redirect('/');
    }
}