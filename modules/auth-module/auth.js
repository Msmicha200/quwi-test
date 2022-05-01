const cookie = require('cookie');

import Vue from 'vue';

export default class Auth {
    #ctx = {};
    #tokenProperty = 'auth_token';

    state = {};

    constructor(ctx) {
        this.#ctx = ctx;
        this.state.loggedIn = false;
        this.state.token = null;

        this.state = new Vue({
            data: this.state
        });

        this.init();
    }

    init() {
        const cookies = this.getCookies();
    
        for (const cookie_key in cookies) {
            if (cookie_key === this.#tokenProperty) {
                this.state.token = cookies[cookie_key];
                this.state.loggedIn = true;
                this.#ctx.app.$axios.defaults.headers.common['Authorization'] = cookies[cookie_key];
            }
        }
    }

    loginUser(token) {
        if (!token?.length) {
            return false;
        }

        this.state.token = token;
        this.state.loggedIn = true;
        this.setCookie(this.#tokenProperty, token);
        this.#ctx.app.$axios.defaults.headers.common['Authorization'] = token;
    }

    getCookies() {
        const cookie_str = process.client ? document.cookie : this.#ctx.req.headers.cookie

        return cookie.parse(cookie_str || '');
    }


    setCookie(key, value, options = {}) {
        if (value == false) {
            options.maxAge = -1;
        }

        const serialized_cookie = cookie.serialize(key, value, options);
        
        if (process.client) {
            document.cookie = serialized_cookie;
        }
        else if (process.server && this.#ctx.res) {
            const cookies = this.#ctx.res.getHeader('Set-Cookie') || [];

            cookies.unshift(serialized_cookie);

            this.#ctx.res.setHeader('Set-Cookie', serialized_cookie);
        }
        else {
            throw new Error('Can not set cookie');
        }
    }

    async logOut() {
        this.setCookie(this.#tokenProperty, false);
        this.state.loggedIn = false;
        this.state.token = null;
    }
}