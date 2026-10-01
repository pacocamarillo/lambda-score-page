# Feature Specification: Sitio público LambdaScore

**Feature Branch**: `001-sitio-lambdascore`

**Created**: 2026-10-01

**Status**: Draft

**Input**: User description: "Generar la spec de https://lambdascore.com.mx/ con Next.js, SEO de Next.js y despliegue en Vercel." Actualizado con posicionamiento All-in-One y copy canónico.

**Copy canónico**: [content/copy.md](./content/copy.md)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender el diferenciador y pedir cotización (Priority: P1)

Un organizador llega desde un buscador o una recomendación, entiende en el primer pantallazo que LambdaScore es el socio All-in-One (meta, chip, kit e inscripción) —no solo un cronómetro— y envía una solicitud de cotización.

**Why this priority**: La cotización es la conversión principal. Sin un diferenciador claro, el sitio compite en precio genérico y pierde frente a marcas grandes de timing.

**Independent Test**: Con el inicio, Servicios y Quiero cotizar publicados según `content/copy.md`, un organizador completa el formulario en dos pasos y el equipo recibe la solicitud. No dependen del blog ni de resultados.

**Acceptance Scenarios**:

1. **Given** un visitante en el inicio, **When** ve el primer viewport, **Then** ve la marca LambdaScore como señal dominante, la promesa «Una sola empresa. Meta, chip, kit e inscripción.», una sola frase de apoyo y el CTA «Cotiza tu evento», sin disciplinas, eventos ni blog en ese viewport.
2. **Given** el visitante hace scroll justo debajo del hero, **When** lee la siguiente sección, **Then** ve las tres pruebas del diferenciador: chip que se queda con el corredor, infraestructura propia y «organizamos lo que cronometramos».
3. **Given** un visitante en Servicios, **When** recorre la página, **Then** el paquete integral aparece primero y después cronometraje RFID, kits, arco, vallas, inscripción y FAQ en lenguaje de organizador.
4. **Given** el formulario de cotización, **When** completa el paso 1 (contacto, si es su primera carrera, tipo de evento y servicios) y el paso 2 (dirección y detalle), **Then** la solicitud queda registrada, el equipo la recibe en `contacto@lambdascore.com.mx` y ve la confirmación «Recibimos tu solicitud. Te contactamos en menos de 24 horas.»
5. **Given** un formulario incompleto o con correos que no coinciden, **When** intenta enviar, **Then** el envío no ocurre y cada campo inválido muestra el error junto al campo.

---

### User Story 2 - Encontrar cada página al buscar o compartir (Priority: P1)

Una persona que busca cronometraje, renta de arco o resultados llega a la URL correcta, y al compartir el enlace ve título, descripción e imagen de esa página.

**Why this priority**: El sitio actual vive de búsqueda orgánica. Perder títulos, la URL canónica o la ficha al compartir es una regresión de negocio.

**Independent Test**: Cada ruta pública responde, declara título, descripción, URL canónica e imagen propia, y aparece en el mapa del sitio para buscadores. No hace falta enviar el formulario.

**Acceptance Scenarios**:

1. **Given** cualquier página pública indexable, **When** se lee su ficha, **Then** tiene título, descripción, URL canónica absoluta, imagen para compartir e idioma español de México.
2. **Given** el dominio de producción, **When** se consultan el mapa del sitio y las reglas para buscadores, **Then** el mapa lista solo URLs canónicas indexables y las reglas apuntan a ese mapa.
3. **Given** el inicio, **When** se revisa la estructura de títulos, **Then** existe un único `h1` (la promesa All-in-One) y la ficha de la organización (nombre, URL, logotipo, teléfono y correo).
4. **Given** un artículo, **When** se abre su URL, **Then** la ficha lo identifica como artículo y muestra la ruta de navegación.
5. **Given** Servicios, **When** se abre, **Then** las preguntas frecuentes forman parte de la ficha de la página.
6. **Given** la confirmación de cotización o de encuesta, **When** un buscador la evalúa, **Then** esa vista no se indexa.

---

### User Story 3 - Recorrer como organizador o como atleta (Priority: P1)

El visitante distingue caminos para organizadores y para atletas, usa el menú en todo el sitio y llega a Nosotros, Servicios, Renta, Cotizar, Eventos, Resultados y Blog.

**Why this priority**: Sin esta navegación el resto de historias no se puede alcanzar. Sin separar audiencias, el mensaje se diluye.

**Independent Test**: Desde cualquier página, cada ítem del menú y del pie abre su destino. Nosotros usa el copy de misión de `content/copy.md`.

**Acceptance Scenarios**:

1. **Given** cualquier página, **When** se usa el menú, **Then** los destinos son Inicio, Nosotros, Servicios, Renta de equipo, Quiero cotizar, Eventos, Resultados y Blog; la etiqueta es «Quiero cotizar»; y el encabezado agrupa Organizadores (Servicios, Renta, Cotizar) y Atletas (Eventos, Resultados, Blog).
2. **Given** una pantalla angosta, **When** el visitante abre el menú, **Then** los mismos destinos y grupos están disponibles y se pueden cerrar.
3. **Given** el pie, **When** el visitante busca contacto, **Then** ve el teléfono `52 244 144 2188`, marketing `52 244 104 5215`, `contacto@lambdascore.com.mx` y enlaces a Facebook, YouTube e Instagram.
4. **Given** Nosotros, **When** se lee la página, **Then** el `h1` es «Eliminamos el caos logístico de tu carrera.», se identifica a Lambdascore Multiservicios S.A.S. como All-in-One y no se usa «precisión quirúrgica» ni «S.A.S. certificada» como titular.
5. **Given** una ruta inexistente, **When** se abre, **Then** aparece una página de error con el menú y un regreso al inicio.

---

### User Story 4 - Consultar resultados de una carrera (Priority: P2)

Un atleta busca su tiempo por nombre o dorsal, filtra por año y distancia, abre vueltas, imprime su certificado o descarga la hoja.

**Why this priority**: Los resultados son la consulta recurrente de quien ya corrió. No bloquean la captación de organizadores.

**Independent Test**: Con un evento de prueba cargado, el atleta busca por nombre o dorsal, filtra y abre el certificado.

**Acceptance Scenarios**:

1. **Given** Resultados, **When** la página carga, **Then** el buscador por nombre o dorsal y el evento más reciente tienen prioridad visual sobre el archivo histórico.
2. **Given** Resultados, **When** el atleta elige un año entre 2021 y 2026, **Then** ve solo los eventos de ese año, con fecha y nombre.
3. **Given** un evento con varias distancias, **When** elige una distancia, **Then** ve lugar, dorsal, nombre, tiempo y diferencia respecto al primero.
4. **Given** un registro con vueltas, **When** pide el detalle, **Then** ve por vuelta el tiempo, el lugar de esa vuelta, el tiempo acumulado y el lugar acumulado.
5. **Given** un resultado, **When** pide el certificado, **Then** obtiene una vista imprimible con evento, atleta, distancia y tiempo, sin crear una cuenta.
6. **Given** un evento y una distancia, **When** pide descargar, **Then** recibe una hoja de cálculo con esos resultados.

---

### User Story 5 - Ver el próximo evento e inscribirse (Priority: P2)

Un atleta ve carreras próximas debajo del bloque de diferenciador en el inicio o en Eventos y sale al registro externo.

**Why this priority**: La inscripción ya ocurre en la plataforma externa. El sitio solo tiene que mostrarla y enlazarla.

**Independent Test**: Un evento con fecha futura muestra nombre, fecha, lugar y el enlace de inscripción.

**Acceptance Scenarios**:

1. **Given** el inicio, **When** hay eventos con fecha futura, **Then** muestra hasta tres debajo del bloque de diferenciador, cada uno con nombre, fecha, lugar y «Inscribirse».
2. **Given** un evento cuya fecha ya pasó, **When** se muestra el inicio, **Then** ese evento no aparece como próximo.
3. **Given** la acción Inscribirse, **When** el atleta la activa, **Then** abre la ficha externa del evento.
4. **Given** Eventos, **When** no hay eventos futuros, **Then** se muestra el estado vacío definido en `content/copy.md` y el acceso a resultados.

---

### User Story 6 - Consultar renta, Trifecta y el blog (Priority: P2)

El visitante consulta precios de renta, el serial Trifecta como prueba de que LambdaScore organiza lo que cronometra, y los artículos en las URLs ya publicadas.

**Why this priority**: Conserva el contenido que ya posiciona y refuerza el diferenciador con evidencia real.

**Independent Test**: Renta de equipo, Trifecta y un artículo publicado se leen sin enviar formularios.

**Acceptance Scenarios**:

1. **Given** Renta de equipo, **When** se abre, **Then** lista las fichas de vallas y arco meta agrupadas por escenario de uso (meta, control de flujo, premiación) cuando aplica, y enlaza a cada ficha.
2. **Given** la ficha de arco meta, **When** se lee, **Then** muestra los conceptos y el precio «desde»: arco inflable 6 m ($1,800), túnel 9 m ($2,500), truss de meta ($2,500), truss de línea de meta ($4,500), truss de escenario ($5,500), podio ($1,000), cronómetro ($1,500) y audio con unifilas ($2,000).
3. **Given** Trifecta, **When** se abre su ruta, **Then** el `h1` presenta el serial como prueba de organización propia, lista las tres fechas y categorías, enlaza inscripción y resultados, y no publica CLABE ni números de tarjeta.
4. **Given** el blog, **When** se abre, **Then** lista artículos con título legible en tarjeta, fecha, extracto y enlace, del más reciente al más antiguo.
5. **Given** un artículo ya publicado, **When** se abre su dirección actual, **Then** responde en esa misma ruta y muestra un CTA a cotizar al final del cuerpo.

---

### User Story 7 - El organizador evalúa el evento (Priority: P3)

Después de una carrera, el organizador califica el servicio.

**Why this priority**: Mejora el servicio y no es necesaria para publicar el sitio ni captar cotizaciones.

**Independent Test**: La encuesta se envía y confirma sin pasar por cotización ni resultados.

**Acceptance Scenarios**:

1. **Given** la encuesta, **When** el organizador indica evento y fecha y responde las diez preguntas, **Then** puede enviarla.
2. **Given** un envío válido, **When** termina, **Then** ve el agradecimiento y recargar esa confirmación no crea otra respuesta.
3. **Given** la escala, **When** se muestra, **Then** las opciones son muy insatisfecho, insatisfecho, neutral, satisfecho y muy satisfecho.

---

### Edge Cases

- No hay eventos futuros: el inicio muestra el estado vacío del copy, sin tarjetas en blanco.
- No hay artículos: el listado del blog muestra un estado vacío.
- Un resultado no tiene vueltas: la fila no ofrece ver vueltas.
- Dos envíos distintos del mismo formulario: cada uno queda registrado. Recargar la confirmación no reenvía.
- El envío no puede entregarse: el visitante ve el microcopy de error y los datos permanecen en el formulario.
- Una imagen de contenido no carga: se conserva el espacio y el texto alternativo.
- La misma ruta se pide con y sin barra final: ambas llegan a una sola URL canónica.
- Números de prueba social sin validar por el negocio: no se inventan; se omiten hasta confirmarse.
- El panel de envíos existente no forma parte de esta entrega.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST ofrecer las rutas públicas listadas en Key Entities como páginas indexables, salvo las vistas de confirmación.
- **FR-002**: El encabezado y el pie MUST repetirse en todas las páginas. El logotipo MUST enlazar al inicio y MUST tener el texto alternativo «LambdaScore». El menú MUST usar la etiqueta «Quiero cotizar» y MUST agrupar destinos de organizadores y de atletas según `content/copy.md`.
- **FR-003**: Los teléfonos del pie MUST abrir el marcador y el correo MUST abrir el cliente de correo.
- **FR-004**: El contacto por WhatsApp MUST usar el número 244 144 2188.
- **FR-005**: Las redes oficiales MUST enlazar a Facebook (`https://www.facebook.com/lambdascore`), Instagram (`https://www.instagram.com/lambdascore/`) y al canal de YouTube de la marca. Los enlaces externos de inscripción, redes y WhatsApp MUST abrir en una pestaña nueva.
- **FR-006**: El primer viewport del inicio MUST contener solo marca, promesa All-in-One, una frase de apoyo, el grupo de CTA e imagen full-bleed. Debajo MUST aparecer el bloque de tres pruebas del diferenciador. Después, en este orden: prueba social (si hay datos validados), próximos eventos, bloque de terreno, últimas del blog y los tres videos. El texto MUST seguir `content/copy.md`.
- **FR-007**: Servicios MUST abrir con el paquete integral y MUST documentar cronometraje con chip RFID en el dorsal sin devolución, kits, arco meta, vallas, plataforma de inscripción y disciplinas; las FAQ MUST usar el lenguaje de organizador de `content/copy.md`.
- **FR-008**: Servicios MUST incluir las cinco preguntas frecuentes del copy canónico y marcarlas para buscadores como FAQ.
- **FR-009**: La cotización MUST declarar cobertura en CDMX, Estado de México, Puebla, Tlaxcala, Morelos, Hidalgo, Querétaro, Veracruz y Oaxaca, y respuesta en menos de 24 horas.
- **FR-010**: El formulario de cotización MUST ser de dos pasos: paso 1 con nombre, apellidos, teléfono, correo, confirmación de correo, si es la primera carrera del organizador (Sí/No), tipo de evento y servicios; paso 2 con calle, ciudad, estado, código postal y mensaje (fecha tentativa y número de participantes opcionales).
- **FR-011**: El sistema MUST exigir los campos obligatorios del copy, MUST rechazar un correo inválido o una confirmación distinta, y MUST exigir al menos un servicio.
- **FR-012**: Los servicios seleccionables MUST ser asesoría para organizar una carrera, cronometraje deportivo, renta de arco meta inflable, renta de vallas metálicas y marketing.
- **FR-013**: Cada ficha de renta MUST tener su propia URL, precios «desde» cuando existan, y un llamado a cotizar. La ficha de vallas MUST abrir el formulario con «Renta de vallas metálicas» preseleccionada.
- **FR-014**: Un evento MUST tener nombre, fecha, lugar, imagen, URL de inscripción y un estado derivado de la fecha (próximo o pasado).
- **FR-015**: Trifecta MUST conservar su ruta, MUST presentarse como prueba de que LambdaScore organiza lo que cronometra, MUST listar las categorías Juvenil varonil, Master 20–60, Femenil avanzada y Femenil libre, y MUST enlazar inscripción y resultados por fecha.
- **FR-016**: Las instrucciones de pago por transferencia MUST explicar el flujo por WhatsApp. Los datos de cobro MUST permanecer fuera del HTML público versionado.
- **FR-017**: Un resultado MUST pertenecer a un evento, un año, una distancia y un competidor, y MUST guardar lugar, dorsal, nombre, tiempo oficial y diferencia. Las vueltas, cuando existan, MUST guardar tiempo de vuelta, lugar de la vuelta, tiempo acumulado y lugar acumulado.
- **FR-018**: Resultados MUST ofrecer buscador por nombre o dorsal, los años 2021–2026 y prioridad visual al evento más reciente.
- **FR-019**: Un artículo MUST tener título, slug, fecha de publicación, extracto, cuerpo, imagen destacada y descripción para buscadores. Las rutas ya indexadas MUST conservarse. El cuerpo MUST terminar con un CTA a cotizar.
- **FR-020**: La encuesta MUST identificar organizador, evento y fecha, y MUST preguntar, en este orden: experiencia general; claridad de cotización y contratación; comunicación previa; puntualidad y montaje; desempeño del cronometraje RFID; precisión de resultados; rapidez de resultados y certificados; trato del personal; relación calidad-precio; soporte ante imprevistos. El comentario abierto es opcional.
- **FR-021**: Cada solicitud de cotización y cada encuesta MUST quedar registrada con la fecha de envío.
- **FR-022**: El inicio MUST usar el title y la description de `content/copy.md` (promesa All-in-One y zona de servicio).
- **FR-023**: El editor MUST poder actualizar eventos, artículos, precios de renta, resultados y textos de marketing en Sanity sin modificar la estructura de navegación ni redesplegar por un cambio de contenido.
- **FR-024**: Nosotros, Servicios y Quiero cotizar MUST usar el copy canónico de `content/copy.md` (titulares, leads y CTAs).
- **FR-025**: El diseño del inicio MUST tratar el primer viewport como una sola composición: marca dominante, sin tarjetas en el hero, imagen full-bleed y tipografía distinta de la pila del sistema.

### Key Entities *(include if feature involves data)*

- **Página**: ruta, título, descripción, si se indexa, bloques de contenido. Rutas públicas: `/`, `/nosotros`, `/servicios`, `/renta-de-equipo`, `/renta-de-arco-meta-para-carreras`, `/renta-de-vallas-metalicas-en-puebla-seguridad-y-control-para-eventos-masivos`, `/quiero-cotizar`, `/events`, `/event/carrera-de-mtb-zoker-2500-amozoc`, `/resultados-eventos-lambdascore`, `/blog`, `/trifecta`, `/encuesta-lambdascore` y el slug de cada artículo.
- **Servicio**: nombre, resumen, orden en la página de servicios y si aparece en el formulario.
- **Concepto de renta**: nombre, precio desde, escenario (meta / control de flujo / premiación) y ficha.
- **Evento**: nombre, fecha, lugar, imagen, URL de inscripción y extracto. Su estado se deriva de la fecha.
- **Resultado**: evento, año, distancia, lugar, dorsal, nombre, tiempo, diferencia y vueltas opcionales.
- **Artículo**: título, slug, fecha, extracto, cuerpo, imagen, descripción para buscadores y CTA final.
- **Solicitud de cotización**: contacto, primera carrera (sí/no), tipo de evento, dirección, servicios y mensaje.
- **Respuesta de encuesta**: organizador, evento, fecha del evento, diez calificaciones, comentario y fecha de envío.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un organizador completa la cotización en menos de tres minutos desde el inicio, sin salir del sitio.
- **SC-002**: Las ocho secciones del menú muestran su contenido principal en menos de 2.5 segundos de carga útil en un móvil de referencia.
- **SC-003**: El 100 % de las rutas indexables tienen título, descripción, URL canónica e imagen para compartir propios.
- **SC-004**: Un buscador puede leer el mapa del sitio con todas las rutas indexables y ninguna URL marcada para no indexarse.
- **SC-005**: Un atleta localiza un resultado conocido (nombre o dorsal) en menos de cuatro interacciones desde Resultados.
- **SC-006**: Las rutas públicas vigentes del sitio actual responden en el sitio nuevo o redirigen a su URL canónica.
- **SC-007**: Inicio, Servicios, cotización, Resultados y una nota del blog se recorren sin errores visibles de la consola.
- **SC-008**: En una prueba con cinco organizadores nuevos, al menos cuatro identifican espontáneamente el mensaje All-in-One (meta + chip + kit + inscripción) después de ver solo el primer viewport.

## Assumptions

- El copy canónico de `content/copy.md` define el posicionamiento; en producción se edita vía Sanity (documentos sembrados desde ese copy). El blog histórico se migra a Sanity; no se reescribe entero en esta entrega.
- La inscripción de eventos sigue en la plataforma externa ya enlazada.
- Los resultados históricos se tratan como documentos Sanity por año, evento, distancia, fila y vuelta.
- La identidad visual conserva el verde y negro de la marca; tipografía y composición se renuevan según FR-025.
- Citas y métricas de prueba social solo se publican cuando el negocio las confirma.
- Fuera de alcance: reemplazar la plataforma de inscripción, operar el cronometraje RFID y migrar el panel de envíos.
