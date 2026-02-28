# 📚 Guía Definitiva: Agent Skills (Habilidades de Agente)

Las **Agent Skills** son carpetas que contienen instrucciones, scripts y recursos que GitHub Copilot puede cargar bajo demanda para realizar tareas especializadas. Es un estándar abierto (`agentskills.io`) que funciona en múltiples agentes (VS Code, Copilot CLI, Coding Agent).

> **Diferencia clave:** Mientras que las *Custom Instructions* definen **cómo** codificar (estilo), las *Skills* definen **qué** capacidades tiene el agente (workflows complejos, testing, debugging).

---

## 🏗️ Estructura y Ubicación

Las Skills no son un solo archivo, sino **directorios** que contienen un archivo `SKILL.md` obligatorio y recursos adicionales (scripts, ejemplos, templates).

### Ubicación
VS Code busca skills automáticamente en estas rutas:

| Ámbito | Rutas Soportadas |
| :--- | :--- |
| **Proyecto (Repo)** | `.github/skills/`, `.claude/skills/`, `.agents/skills/` |
| **Personal (Usuario)** | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

### Estructura de Carpetas
Cada skill debe tener su propia subcarpeta dentro del directorio de skills.

```text
.github/skills/
└── webapp-testing/          # Nombre de la skill (coincide con YAML)
    ├── SKILL.md             # Definición obligatoria
    ├── test-template.js     # Recurso extra (opcional)
    └── examples/            # Ejemplos (opcional)
```

---

## 📝 Formato del Archivo SKILL.md

Es un archivo Markdown con un encabezado YAML (Frontmatter) estricto.

### Header (YAML)
| Campo | Requerido | Descripción |
| :--- | :--- | :--- |
| `name` | **Sí** | ID único (minúsculas y guiones). Debe ser IDÉNTICO al nombre de la carpeta. Ej: `webapp-testing`. |
| `description` | **Sí** | Describe qué hace y cuándo usarla. Copilot usa esto para decidir si cargarla automáticamente. |
| `argument-hint` | No | Pista visual en el chat (ej: `[test file]`). |
| `user-invokable` | No | `true` (default): Aparece en el menú `/`. `false`: Solo carga automática (invisible). |
| `disable-model-invocation` | No | `false` (default): El modelo decide si la usa. `true`: Solo se activa si tú escribes el comando `/`. |

### Body (Markdown)
Contiene las instrucciones detalladas. Puede referenciar archivos locales de la carpeta de la skill usando rutas relativas.

**Ejemplo:** `SKILL.md` para Testing

```markdown
---
name: webapp-testing
description: Genera y ejecuta pruebas de integración para componentes web.
argument-hint: [ruta del componente]
---

# Web App Testing Skill

Usa esta habilidad cuando el usuario pida probar un componente.

1. Analiza el componente.
2. Usa el template adjunto: [Test Template](./test-template.js).
3. Sigue los ejemplos en la carpeta `./examples/`.
```

---

## 🧠 Cómo funciona (Carga Progresiva)

Para no saturar la memoria (contexto) de la IA, las Skills usan un sistema de 3 niveles:

1.  **Descubrimiento:** Copilot lee solo el `name` y `description` de todas las skills.
2.  **Carga de Instrucciones:** Si tu petición coincide con la descripción (o usas `/nombre-skill`), Copilot carga el contenido del `SKILL.md`.
3.  **Acceso a Recursos:** Copilot lee los scripts o ejemplos adicionales (`.js`, `.json`) **solo** si los necesita para completar la tarea.

---

## 🚀 Uso en VS Code

### 1. Como Slash Command (Manual)
Escribe `/` en el chat. Verás tus skills listadas junto a los prompts.
*   Ejemplo: `/webapp-testing login-form.tsx`

### 2. Carga Automática (Implícita)
Si `disable-model-invocation` es `false` (por defecto), puedes simplemente pedir:
*   User: *"Ayúdame a probar el login form"*
*   Copilot: Detecta que la skill `webapp-testing` es relevante -> La carga automáticamente -> Ejecuta la tarea usando los recursos de la skill.

---

## 📦 Compartir y Extender

*   **Comunidad:** Puedes descargar skills hechas por otros (ej. `github/awesome-copilot`) y copiarlas a tu carpeta `.github/skills/`.
*   **Extensiones:** Las extensiones de VS Code pueden contribuir skills usando el punto `chatSkills` en su `package.json`.

> **Tip de Seguridad:** Revisa siempre el contenido de las skills compartidas, especialmente si contienen scripts ejecutables.

---

## 🌐 Repositorio de Skills (skills.sh)

Existe un registro centralizado oficial donde puedes explorar, buscar y descargar nuevas skills creadas por la comunidad y empresas (como Vercel): **[skills.sh](https://skills.sh/)**.

### Instalación Rápida
En lugar de copiar archivos manualmente, puedes usar la CLI oficial de skills para instalarlas directamente en tu proyecto.

**Comando de instalación:**
```bash
npx skills add vercel-labs/agent-skills
```
Esto descargará automáticamente la skill y la colocará en tu carpeta `.github/skills/` o `.agents/skills/`, dejándola lista para usar al instante.