#!/bin/sh
# Genera /usr/share/nginx/html/config.js desde variables de entorno al arrancar el contenedor.
# Lo ejecuta /docker-entrypoint.sh de la imagen nginx antes de iniciar Nginx.
set -eu

CONFIG_FILE=/usr/share/nginx/html/config.js

missing=""
for name in API_URL KEYCLOAK_URL KEYCLOAK_REALM KEYCLOAK_CLIENT_ID; do
  eval "value=\${$name:-}"
  if [ -z "$value" ]; then
    missing="$missing $name"
  fi
done

if [ -n "$missing" ]; then
  echo "ERROR: faltan variables de entorno obligatorias:$missing" >&2
  echo "Defina API_URL, KEYCLOAK_URL, KEYCLOAK_REALM y KEYCLOAK_CLIENT_ID (ej. docker run -e API_URL=...)." >&2
  exit 1
fi

# Escapa \ y " para que el valor quede como literal de cadena JavaScript válido.
js_string() {
  printf '"%s"' "$(printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')"
}

cat > "$CONFIG_FILE" <<EOF
window.__APP_CONFIG__ = {
  apiUrl: $(js_string "$API_URL"),
  keycloakUrl: $(js_string "$KEYCLOAK_URL"),
  keycloakRealm: $(js_string "$KEYCLOAK_REALM"),
  keycloakClientId: $(js_string "$KEYCLOAK_CLIENT_ID"),
};
EOF

echo "config.js generado (API_URL=$API_URL, KEYCLOAK_URL=$KEYCLOAK_URL, realm=$KEYCLOAK_REALM, client=$KEYCLOAK_CLIENT_ID)"
