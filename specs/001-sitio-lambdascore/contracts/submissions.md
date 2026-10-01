# Submissions: Sitio público LambdaScore

## POST /api/cotizacion

Cuerpo JSON según `QuoteRequest` en `data-model.md`, sin `submittedAt`. Incluye `firstRace`, `eventType`, y opcionales `tentativeDate` y `estimatedParticipants`.

Respuestas:

| Estado | Cuándo |
| --- | --- |
| 200 | El correo quedó enviado. Cuerpo: `{ "ok": true }`. |
| 400 | Falta un obligatorio, el correo es inválido, la confirmación no coincide, `firstRace` no fue elegido, `eventType` falta o `services` está vacío. Cuerpo: `{ "ok": false, "fields": { "<campo>": "<mensaje>" } }`. |
| 502 | El proveedor de correo rechazó el envío. Cuerpo: `{ "ok": false, "error": "unavailable" }`. |

El mensaje de correo MUST incluir todos los campos y la fecha de envío, y MUST ir al destinatario configurado en `QUOTE_TO_EMAIL`. Si `firstRace` es true, el asunto o el cuerpo MUST marcarlo para que el equipo priorice asesoría.

## POST /api/encuesta

Cuerpo JSON según `SurveyResponse`, sin `submittedAt`. `scores` es un arreglo de diez enteros del 1 al 5, en el orden de FR-020.

Respuestas:

| Estado | Cuándo |
| --- | --- |
| 200 | El correo quedó enviado. Cuerpo: `{ "ok": true }`. |
| 400 | Falta organizador, evento o fecha, o alguna calificación no es un entero de 1 a 5. |
| 502 | El proveedor de correo rechazó el envío. |

El cliente MUST tratar la confirmación como estado de la página y MUST impedir un segundo envío al recargar (POST-Redirect-GET o estado que no reenvía). El servidor no deduplica dos envíos conscientes.

## Variables

| Nombre | Uso |
| --- | --- |
| `RESEND_API_KEY` | Credencial del proveedor. No se commitea. |
| `QUOTE_TO_EMAIL` | Destino. Valor de producción: `contacto@lambdascore.com.mx`. |
| `PAYMENT_INSTRUCTIONS` | Texto privado de datos de cobro para Trifecta, si se publica. Vacío oculta los datos y deja solo el flujo. |
