# Routes: Sitio público LambdaScore

Contrato de rutas. La forma canónica no lleva barra final. La forma con barra responde 308 hacia la canónica.

| Método | Ruta | Indexable | Historia |
| --- | --- | --- | --- |
| GET | `/` | sí | US1, US5, US6 |
| GET | `/nosotros` | sí | US3 |
| GET | `/servicios` | sí | US1 |
| GET | `/renta-de-equipo` | sí | US6 |
| GET | `/renta-de-arco-meta-para-carreras` | sí | US6 |
| GET | `/renta-de-vallas-metalicas-en-puebla-seguridad-y-control-para-eventos-masivos` | sí | US6 |
| GET | `/quiero-cotizar` | sí | US1 |
| GET | `/events` | sí | US5 |
| GET | `/event/carrera-de-mtb-zoker-2500-amozoc` | sí | US5 |
| GET | `/resultados-eventos-lambdascore` | sí | US4 |
| GET | `/blog` | sí | US6 |
| GET | `/trifecta` | sí | US6 |
| GET | `/encuesta-lambdascore` | sí | US7 |
| GET | `/{postSlug}` | sí | US6 |
| GET | cualquier otra | no | US3, página 404 |

Artículos que MUST responder en la raíz:

- `/cronometraje-deportivo-pequenas-carreras-tonanitla-edomex`
- `/kits-personalizados-para-organizadores-de-carreras-running-y-mtb-lambdascore`
- `/como-organizar-una-carrera-de-running-o-ciclismo`
- `/922-2`
- `/xonacayucan-mejor-carrera-mtb-puebla-19-abril-trifecta-valle`
- `/ciclistas-conquistan-tochimilco-cronoescalda-2026`
- `/resultados_cronoescalda_2026`

`/pane-de-envios` no se implementa.

La confirmación de cotización y la de encuesta son estados de la misma URL (`/quiero-cotizar` y `/encuesta-lambdascore`) con `noindex`. No crean una ruta indexable nueva.
