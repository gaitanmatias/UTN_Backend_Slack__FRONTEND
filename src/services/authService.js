import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";
import ENVIRONMENT from "../config/environment";

export async function register(username, email, password) {
  const usuario = {
    email,
    username,
    password,
  };
  //QUE HACE FETCH()?
  //  L> Ordena al navegador hacer una consulta HTTP
  //  L> recibe 2 parametros: la URL de consulta y un objeto de configuracion de consulta
  //Queremos consumir nuesta API
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/auth/register`,
    {
      method: HTTP_METHODS.POST,
      headers: {
        //Como vamos a enviar JSON, configuro que mi consulta envia contenido tipo JSON
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
      },
      body: JSON.stringify(usuario),
    }
  );

  //Transformamos a objeto de JS el body de la respuesta
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message);
  }
  return response_data;
}

export async function login(email, password) {
  const usuario = {
    email,
    password,
  };

  const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
    method: HTTP_METHODS.POST,
    headers: {
      [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
    },
    body: JSON.stringify(usuario),
  });
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message);
  }
  return response_data;
}
