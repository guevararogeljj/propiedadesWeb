export default () => {
    const userAgent = window.navigator.userAgent;
    const mobileKeywords = ['Mobi', 'Android', 'iPhone', 'iPad', 'Windows Phone', 'Blackberry','iPod'];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}