export const b64_encode = (s) => {      
    return btoa(unescape(encodeURIComponent(s)));
}
export const b64_decode = (s) => {      
    return decodeURIComponent(escape(atob(s)));
}