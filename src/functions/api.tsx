export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST() {
  return {
    url: API_URL + "/jwt-auth/v1/token",
  };
}
export function CRIAR_POST() {
  return {
    url: API_URL + "/api/user",
  };
}
export function PERDEU_POST() {
  return {
    url: API_URL + "/api/password/lost",
  };
}
export function RESETAR_POST() {
  return {
    url: API_URL + "/api/password/reset",
  };
}
export function USUARIO_GET() {
  return {
    url: API_URL + "/api/user",
  };
}
