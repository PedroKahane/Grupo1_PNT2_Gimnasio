export function setCookie( value, name ="usuario", expirationDays = 7) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  const cookieString = `${name}=${JSON.stringify(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

export function getCookie(name="usuario") {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return  cookieValue;
    }
  }
  return null;
}

export function removeCookie( name ="usuario") {
    setCookie(null,name,-1000);
    location.reload();
  }