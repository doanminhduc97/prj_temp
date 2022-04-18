export default {
    /**
     * @param {Object} obj JSON Object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    // default language
    getBrowserLanguage() {
        return navigator.language === 'en-US' ? 'en-US' : navigator.language
    },

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
