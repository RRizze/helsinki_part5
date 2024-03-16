const USER_LOCAL_KEY = 'loggedUser';

export function saveUser(user) {
  localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_LOCAL_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser() {
  localStorage.removeItem(USER_LOCAL_KEY);
}
