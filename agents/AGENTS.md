# AGENTS.md - Directrices para Asistentes de IA

Este documento proporciona el contexto, reglas y convenciones de este proyecto. Como asistente de IA (Gemini, Copilot, Cursor, etc.), **debes leer y aplicar estas directrices en todas tus respuestas y código generado** para este repositorio.

## 1. Contexto del Proyecto y Arquitectura
- **Descripción:**[Breve descripción de lo que hace la app. Ej: Un e-commerce B2B de venta de repuestos automotrices].
- **Tech Stack Principal:**[Ej: TypeScript, Next.js (App Router), TailwindCSS, Prisma, PostgreSQL].
- **Patrón de Arquitectura:** [Ej: Arquitectura Limpia, MVVM, MVC, Microservicios].
- **Gestor de Paquetes:** [Ej: pnpm, npm, uv, cargo, maven].

### Estructura de Directorios
```text
[NOMBRE_DEL_PROYECTO]/
├── [src/ o app/]       # [Explicar qué va aquí. Ej: Código fuente principal, rutas de Next.js]
├── [components/]       # [Ej: Componentes de UI reutilizables]
├── [lib/ o utils/]     #[Ej: Funciones de utilidad pura y clientes de API]
├── [tests/]            #[Ej: Pruebas unitarias e integración]
└── [docs/]             # [Ej: Documentación del proyecto]
```

## 2. Reglas Estrictas y Seguridad (¡IMPORTANTE!)
Las siguientes reglas son **no negociables** y deben seguirse en todo momento:
- **No inventes dependencias:** Utiliza solo las librerías que ya están en el `package.json` / `pom.xml` / `requirements.txt`. Si necesitas una nueva, pide permiso explícito al usuario.
- **Seguridad y Privacidad:** NUNCA subas ni sugieras código que contenga credenciales hardcodeadas, tokens, o conjuntos de datos grandes/reales. Usa siempre variables de entorno.
- **[Ej: NUNCA uses `any` en TypeScript. Tipa absolutamente todo.]**
- **[Ej: NUNCA uses `npm run build` durante el desarrollo, usa siempre `pnpm dev`.]**
- **No modifiques las firmas de las funciones públicas (API)** sin avisar primero que es un *Breaking Change*. Revisa la compatibilidad con versiones anteriores.
- **No dejes código comentado:** Elimina el código muerto (dead code) o los `console.log` / `print` antes de proponer una solución.

## 3. Convenciones de Código y Estilo
- **Nomenclatura:** 
  - Archivos y Clases: `PascalCase` (ej: `UserProfile.tsx`).
  - Variables, métodos e instancias: `camelCase` (ej: `fetchUserData`).
  - Constantes globales: `UPPER_SNAKE_CASE` (ej: `MAX_RETRY_COUNT`).
- **Idiomas:** Escribe el código, las variables y los commits en **[Inglés]**. Escribe la documentación y respuestas del chat en **[Español]**.
- **Tamaño e Inmutabilidad:** Prioriza funciones pequeñas, valores inmutables (ej: constantes en lugar de variables reasignables) y el Principio de Responsabilidad Única.
- **Manejo de Errores:**[Ej: No uses `try/catch` vacíos. Lanza excepciones personalizadas y usa un logger centralizado en `src/lib/logger.ts`].

## 4. Comandos de Desarrollo
Usa esta tabla como referencia para ejecutar tareas o sugerir comandos al usuario:

| Acción | Comando | Notas |
| :--- | :--- | :--- |
| Iniciar dev server | `[pnpm dev]` |[Levanta el entorno con Hot-Reload] |
| Instalar dependencias | `[pnpm install]` |[Usar esto tras añadir librerías] |
| Ejecutar Linter | `[pnpm lint]` |[Asegúrate de que esto pase a verde antes de un commit] |
| Formatear código | `[pnpm format]` |[Ejecuta Prettier] |
| Correr Tests | `[pnpm test]` |[Ejecuta la suite completa de Vitest/Jest] |
| Reporte de Cobertura | `[pnpm test:coverage]` | [Asegura que las rutas críticas estén cubiertas] |

## 5. Directrices de Testing
- Toda nueva característica o corrección de error **debe** incluir pruebas en la misma carpeta o en `[ruta de tests]`.
- **Determinismo:** Mantén las pruebas deterministas. Si usas semillas (seeds) o datos aleatorios, fíjalos. Evita condiciones de carrera para no generar tests inestables (flaky tests).
- **Reutilización:** Usa los *fixtures* y *mocks* existentes en lugar de crear nuevos para cada prueba.
-[Ej: En pruebas numéricas o de IA, usa tolerancias numéricas en lugar de aserciones de igualdad estricta].

## 6. Convenciones de Git y Pull Requests (PRs)
- Usa **Conventional Commits**: `tipo(ámbito): descripción corta` (Ej: `feat(auth): add JWT validation`).
  - Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
  - Ejemplo: `feat(auth): add JWT token validation`.
- Las descripciones de los commits deben ser en minúsculas.
- **Contexto del PR:** Los PRs deben resumir los cambios de comportamiento y listar los comandos ejecutados localmente para validarlo (ej: *Ran `pnpm lint` and `pnpm test`*).
- **Evidencia Visual/API:** Proporciona siempre fragmentos de código con el "Antes y Después" si actualizas una API o cambias documentación. Si es un cambio visual orientado al usuario, sugiere añadir capturas de pantalla.
- Enlaza siempre los tickets/issues correspondientes (ej: `Closes #123`).

## 7. Documentación (Docstrings)
-[Ej: Usa el formato JSDoc / Google Docstrings para documentar todas las funciones públicas].
- Documenta el "Por qué" (la intención) y los casos límite, no el "Qué" obvio.
- Ejemplo de estilo esperado:
  ```[lenguaje]
  /**
   *[Descripción breve de lo que hace]
   * @param {string} userId - El ID único del usuario a buscar.
   * @returns {Promise<User>} Los datos del usuario limpiados.
   * @throws {NotFoundError} Si el usuario no existe en la base de datos.
   */
  ```