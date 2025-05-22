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
export function FOTO_POST() {
  return {
    url: API_URL + "/api/photo",
  };
}
export function FOTOS_GET({
  page,
  total,
  user,
}: {
  page: number;
  total: number;
  user: 0 | string;
}) {
  return {
    url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
  };
}
export function FOTO_GET(id: string) {
  return {
    url: API_URL + `/api/photo/${id}`,
  };
}
export function FOTO_DELETE(id: string) {
  return {
    url: API_URL + `/api/photo/${id}`,
  };
}
export function COMENTARIO_POST(id: string) {
  return {
    url: API_URL + `/api/comment/${id}`,
  };
}
export function ESTATISTICAS_GET() {
  return {
    url: API_URL + `/api/stats`,
  };
}
