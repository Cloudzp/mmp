const KEY_PREFIX = 'com.frm.';

export default {
    KEYS: {
        USER_NAME: `${KEY_PREFIX}name`,
        ROLE: `${KEY_PREFIX}role`,
        NAMESPACES: `${KEY_PREFIX}namespaces`,
        TOKEN: `${KEY_PREFIX}token`,
        USER_ID: `${KEY_PREFIX}user_id`,
        VERSION: `${KEY_PREFIX}version`,
    },

    ADMIN_ROLE: "admin",

    get: function(key, isSession) {
        if (!this.isLocalStorage()) {
            return undefined;
        }
        let value = this.getStorage(isSession).getItem(key);
        if (value) return JSON.parse(value);
        return undefined;
    },

    set: function(key, value, isSession) {
        if (!this.isLocalStorage()) {
            return undefined;
        }
        value = JSON.stringify(value);
        this.getStorage(isSession).setItem(key, value);
    },

    remove: function(key, isSession) {
        if (!this.isLocalStorage()) return undefined;
        this.getStorage(isSession).removeItem(key);
    },

    removeAll: function(keys = []) {
        Array.from(keys.concat(['TOKEN'])).forEach(item =>
            this.remove(this.KEYS[item])
        );
    },

    getStorage: function(isSession) {
        return isSession ? sessionStorage : localStorage;
    },

    isLocalStorage: function() {
        try {
            if (!window.localStorage) {
                console.warn('不支持本地存储');
                return false;
            }
            return true;
        } catch (e) {
            console.warn('本地存储已关闭');
            return false;
        }
    },
};
