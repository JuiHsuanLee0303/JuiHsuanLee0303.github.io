<template>
  <div class="h-full bg-black text-terminal-green font-mono overflow-hidden flex flex-col relative">
    <!-- 損毀動畫 -->
    <CrashAnimation 
      v-if="showCrashAnimation"
      :on-complete="handleCrashComplete"
    />
    
    <div class="flex-1 container mx-auto px-4 py-4 md:py-6 flex flex-col min-h-0">
      <!-- 終端機標題 -->
      <div class="flex-shrink-0 mb-4 flex flex-col gap-3 rounded-3xl border border-terminal-green/20 bg-black/45 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:flex-row md:items-center md:justify-between">
        <div>
          <div class="text-terminal-green/70 text-sm">Terminal - Interactive Shell</div>
          <div class="mt-1 text-xs text-terminal-green/45">使用上下方向鍵瀏覽歷史，或點擊下方快捷指令快速探索。</div>
        </div>
        <div class="flex flex-wrap gap-2 text-xs">
          <span class="rounded-full border border-terminal-green/20 px-3 py-1.5 text-terminal-green/60">cwd {{ currentDirectory }}</span>
          <span class="rounded-full border border-terminal-green/20 px-3 py-1.5 text-terminal-green/60">history {{ commandHistory.length }}</span>
          <button
            @click="runShortcut('clear')"
            class="rounded-full border border-terminal-green/20 px-3 py-1.5 text-terminal-green/70 hover:border-terminal-green/50 hover:text-terminal-green"
          >
            clear
          </button>
        </div>
      </div>

      <div class="flex-shrink-0 mb-4 flex flex-wrap gap-2">
        <button
          v-for="shortcut in quickCommands"
          :key="shortcut.command"
          @click="runShortcut(shortcut.command)"
          class="rounded-full border border-terminal-green/20 bg-terminal-green/5 px-3 py-2 text-xs text-terminal-green/70 hover:border-terminal-green/55 hover:bg-terminal-green/10 hover:text-terminal-green"
        >
          {{ shortcut.label }}
        </button>
      </div>

      <!-- 終端機輸出區域 -->
      <div
        class="flex-1 mb-4 rounded-3xl border border-terminal-green/18 bg-black/45 shadow-[0_12px_30px_rgba(0,0,0,0.25)] min-h-0 flex flex-col overflow-hidden"
        @click="focusInput"
      >
        <div class="terminal-window-bar border-b border-terminal-green/12 bg-black/55 px-4 py-3 md:px-5">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="window-dot window-dot-red"></span>
                <span class="window-dot window-dot-amber"></span>
                <span class="window-dot window-dot-green"></span>
              </div>
              <div class="text-xs text-terminal-green/55">shell://juihsuan@portfolio{{ currentDirectory }}</div>
            </div>
            <div class="flex flex-wrap gap-2 text-[11px] text-terminal-green/45">
              <span class="rounded-full border border-terminal-green/15 px-2 py-1">click terminal to focus</span>
              <span class="rounded-full border border-terminal-green/15 px-2 py-1">enter to run</span>
              <span class="rounded-full border border-terminal-green/15 px-2 py-1">tab to complete</span>
              <span class="rounded-full border border-terminal-green/15 px-2 py-1">ctrl+l to clear</span>
            </div>
          </div>
        </div>
        <div 
          ref="outputContainer"
          class="flex-1 overflow-y-auto p-4 md:p-5 space-y-2 terminal-output min-h-0"
        >
          <div
            v-for="(output, index) in outputHistory"
            :key="index"
            class="output-item rounded-2xl border border-transparent px-2 py-2 hover:border-terminal-green/10"
          >
            <!-- 命令提示符和輸入 -->
            <div class="mb-1 flex items-start gap-2">
              <span class="output-timestamp">{{ formatTimestamp(output.timestamp) }}</span>
              <span class="prompt-symbol mr-1">{{ formatPrompt(output.directory) }}</span>
              <span :class="getCommandClass(output)">{{ output.command }}</span>
            </div>
            <!-- 命令輸出 -->
            <div 
              v-if="output.result"
              :class="['ml-[5.15rem] whitespace-pre-wrap', getResultClass(output)]"
            >{{ output.result }}</div>
            <!-- 錯誤訊息 -->
            <div 
              v-if="output.error"
              class="ml-[5.15rem] terminal-error whitespace-pre-wrap"
            >
              {{ output.error }}
            </div>
          </div>
        </div>

        <div
          v-if="vimState.active"
          class="vim-overlay border-t border-terminal-green/15 bg-black/90 backdrop-blur-sm"
          @click.stop
        >
          <div class="vim-toolbar">
            <div class="vim-title">"{{ vimState.filename }}" [{{ vimState.mode.toUpperCase() }}]</div>
            <div class="vim-meta">{{ vimStatusText }}</div>
          </div>
          <textarea
            ref="vimTextareaRef"
            v-model="vimState.content"
            :readonly="vimState.mode !== 'insert'"
            @keydown="handleVimKeydown"
            class="vim-editor"
            spellcheck="false"
          />
          <div class="vim-statusline">
            <span>{{ vimModeLabel }}</span>
            <span v-if="vimState.mode === 'command'">:{{ vimState.commandBuffer }}</span>
            <span v-else>{{ vimState.statusMessage }}</span>
          </div>
        </div>

        <div class="border-t border-terminal-green/15 bg-black/55 px-4 py-3 md:px-5 md:py-4">
          <div class="flex items-center">
            <span class="prompt-symbol mr-2">{{ activePrompt }}</span>
            <input
              ref="inputRef"
              v-model="currentInput"
              @keydown="handleKeyDown"
              @keyup.enter="executeCommand"
              type="text"
              :disabled="vimState.active"
              class="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono"
              :placeholder="inputPlaceholder"
              autofocus
            />
            <span class="cursor-blink ml-1">_</span>
          </div>
          <div v-if="commandSuggestions.length > 0" class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="suggestion in commandSuggestions"
              :key="suggestion.label"
              @click="applySuggestion(suggestion.value)"
              class="suggestion-chip rounded-full border border-terminal-green/18 px-3 py-1.5 text-xs text-terminal-green/65 hover:border-terminal-green/50 hover:text-terminal-green"
            >
              <span class="suggestion-label">{{ suggestion.label }}</span>
              <span v-if="suggestion.meta" class="ml-2 text-terminal-green/35">{{ suggestion.meta }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, inject, computed } from 'vue'
import { 
  skills, 
  conferences, 
  publications, 
  experiences,
  terminalWelcomeMessages,
  terminalHelpCommand,
  terminalCommandOutputs,
  terminalFileContents,
  terminalLsOutputs,
  terminalErrorMessages,
  personalInfo,
  quickLinks
} from '../data'
import CrashAnimation from '../components/CrashAnimation.vue'

const shutdown = inject('shutdown')
const inputRef = ref(null)
const outputContainer = ref(null)
const vimTextareaRef = ref(null)
const currentInput = ref('')
const outputHistory = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)
const currentDirectory = ref('/')
const previousDirectory = ref('/')
const showCrashAnimation = ref(false)
const pyodide = ref(null)
const pyodideLoading = ref(false)
const pyodideReady = ref(false)
const pythonMode = ref(false)
const virtualFiles = ref({
  'notes.txt': 'Welcome to browser vim.\n\nPress i to enter insert mode.\nPress Esc to return to normal mode.\nUse :w to save, :q to quit, :wq to save and quit.\n'
})
const vimState = ref({
  active: false,
  filename: 'notes.txt',
  content: '',
  mode: 'normal',
  commandBuffer: '',
  statusMessage: 'READY'
})
const shellUser = 'juihsuan'
const shellHost = 'portfolio'
const validDirectories = ['/', '/skills', '/conferences', '/publications', '/experiences']
const rootFiles = ['about.txt', 'research.txt', 'experience.txt', 'README.txt', 'quick_links.sh']
const availableCommands = [
  'pwd',
  'cd',
  'ls',
  'cat',
  'whoami',
  'history',
  'date',
  'uname',
  'echo',
  './quick_links.sh',
  'shutdown',
  'poweroff',
  'halt',
  'clear',
  'help',
  'coffee',
  'paper',
  'rag',
  'llm',
  'tanet',
  'research',
  'easter-egg',
  'egg',
  'howdoyouturnthison'
]

availableCommands.push('python', 'python3', 'vim', 'vi', 'exit', 'quit')

const quickCommands = [
  { label: 'help', command: 'help' },
  { label: 'whoami', command: 'whoami' },
  { label: 'python', command: 'python' },
  { label: 'vim notes.txt', command: 'vim notes.txt' },
  { label: 'research', command: 'research' },
  { label: 'paper', command: 'paper' },
  { label: 'ls /', command: 'ls /' }
]

const activePrompt = computed(() => {
  if (pythonMode.value) return '>>>'
  return formatPrompt(currentDirectory.value)
})

const inputPlaceholder = computed(() => {
  if (vimState.value.active) return 'vim mode active'
  if (pythonMode.value) return 'Python REPL ready'
  return 'Try: help, python, vim notes.txt, research'
})

const vimModeLabel = computed(() => {
  if (vimState.value.mode === 'insert') return '-- INSERT --'
  if (vimState.value.mode === 'command') return '-- COMMAND --'
  return '-- NORMAL --'
})

const vimStatusText = computed(() => {
  const lineCount = vimState.value.content.split('\n').length
  const charCount = vimState.value.content.length
  return `${lineCount} lines, ${charCount} chars`
})

const commandSuggestions = computed(() => {
  if (pythonMode.value || vimState.value.active) {
    return []
  }

  const input = currentInput.value
  const { parts, hasTrailingSpace } = splitCommandInput(input)

  if (!input.trim()) {
    return quickCommands.slice(0, 4).map((item) => ({
      label: item.command,
      value: item.command,
      meta: 'quick'
    }))
  }

  if (parts.length <= 1 && !hasTrailingSpace) {
    return availableCommands
      .filter((command) => command.startsWith(parts[0] || ''))
      .slice(0, 5)
      .map((command) => ({
        label: command,
        value: command,
        meta: 'command'
      }))
  }

  const baseCommand = parts[0]
  if (!['cd', 'ls', 'cat'].includes(baseCommand)) {
    return []
  }

  const rawValue = hasTrailingSpace ? '' : input.slice(input.indexOf(baseCommand) + baseCommand.length).trimStart()
  const normalizedValue = normalizeInputPath(rawValue)
  const lastSlashIndex = normalizedValue.lastIndexOf('/')
  const typedDirectory = lastSlashIndex >= 0 ? normalizedValue.slice(0, lastSlashIndex + 1) : ''
  const typedName = lastSlashIndex >= 0 ? normalizedValue.slice(lastSlashIndex + 1) : normalizedValue
  const directoryPath = normalizePath(resolvePath(typedDirectory || '.'))

  return getDirectoryEntries(directoryPath)
    .filter((entry) => entry.startsWith(typedName))
    .slice(0, 5)
    .map((entry) => {
      const normalizedEntry = baseCommand === 'cd' ? entry.replace(/\/$/, '') : entry
      return {
        label: `${baseCommand} ${typedDirectory}${normalizedEntry}`.trim(),
        value: `${baseCommand} ${typedDirectory}${normalizedEntry}`.trim(),
        meta: directoryPath
      }
    })
})

// 自動滾動到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (outputContainer.value) {
      outputContainer.value.scrollTop = outputContainer.value.scrollHeight
    }
  })
}

const focusInput = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const runShortcut = (command) => {
  currentInput.value = command
  executeCommand()
  focusInput()
}

const applySuggestion = (value) => {
  currentInput.value = value
  focusInput()
}

const formatPrompt = (directory) => `${shellUser}@${shellHost}:${directory}$`
const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString('zh-TW', {
  hour: '2-digit',
  minute: '2-digit'
})

const getCommandClass = (output) => {
  if (output.command === 'motd') return 'terminal-command terminal-command-system'
  if (output.command === 'tab') return 'terminal-command terminal-command-hint'
  return 'terminal-command'
}

const getResultClass = (output) => {
  if (output.command === 'motd') return 'terminal-result terminal-result-system'
  if (output.command === 'tab') return 'terminal-result terminal-result-hint'
  return 'terminal-result'
}

const normalizeInputPath = (value) => value.replace(/^["']|["']$/g, '')

const getDirectoryEntries = (directory) => {
  switch (directory) {
    case '/':
      return [
        ...rootFiles,
        ...validDirectories.filter((path) => path !== '/').map((path) => `${path.split('/').pop()}/`)
      ]
    case '/skills':
      return skills.map((skill) => skill.title)
    case '/conferences':
      return conferences.map((conference) => conference.title)
    case '/publications':
      return publications.map((publication) => publication.title)
    case '/experiences':
      return experiences.map((experience) => `${experience.position}@${experience.company}`)
    default:
      return []
  }
}

const getCommonPrefix = (values) => {
  if (!values.length) return ''

  let prefix = values[0]

  for (let i = 1; i < values.length; i += 1) {
    while (!values[i].startsWith(prefix) && prefix) {
      prefix = prefix.slice(0, -1)
    }
  }

  return prefix
}

const splitCommandInput = (input) => {
  const trimmed = input.replace(/\s+$/, '')
  const hasTrailingSpace = /\s$/.test(input)
  const parts = trimmed ? trimmed.split(/\s+/) : []

  return { parts, hasTrailingSpace }
}

const autocompleteCommand = (value) => {
  const matches = availableCommands.filter((command) => command.startsWith(value)).sort()

  if (!matches.length) return null

  if (matches.length === 1) {
    return { nextValue: `${matches[0]} `, matches }
  }

  const commonPrefix = getCommonPrefix(matches)
  return {
    nextValue: commonPrefix.length > value.length ? commonPrefix : value,
    matches
  }
}

const autocompletePath = (baseCommand, rawValue) => {
  const originalValue = rawValue || ''
  const value = normalizeInputPath(originalValue)
  const lastSlashIndex = value.lastIndexOf('/')
  const typedDirectory = lastSlashIndex >= 0 ? value.slice(0, lastSlashIndex + 1) : ''
  const typedName = lastSlashIndex >= 0 ? value.slice(lastSlashIndex + 1) : value
  const directoryPath = normalizePath(resolvePath(typedDirectory || '.'))
  const entries = getDirectoryEntries(directoryPath)
  const matches = entries.filter((entry) => entry.startsWith(typedName)).sort()

  if (!matches.length) return null

  const commonPrefix = matches.length === 1 ? matches[0] : getCommonPrefix(matches)
  const quoted = originalValue.startsWith('"') && originalValue.endsWith('"')
  const prefixValue = typedDirectory
  const completion = `${prefixValue}${commonPrefix}`
  const shouldAppendSpace = matches.length === 1 && !completion.endsWith('/')
  const nextRawValue = quoted ? `"${completion}${shouldAppendSpace ? '" ' : '"'}` : `${completion}${shouldAppendSpace ? ' ' : ''}`

  if (baseCommand === 'cd' && matches.length === 1 && matches[0].endsWith('/')) {
    return {
      nextValue: quoted ? `"${prefixValue}${matches[0].replace(/\/$/, '')}" ` : `${prefixValue}${matches[0].replace(/\/$/, '')} `,
      matches
    }
  }

  return {
    nextValue: nextRawValue,
    matches
  }
}

const handleTabCompletion = () => {
  if (pythonMode.value || vimState.value.active) return

  const input = currentInput.value
  const { parts, hasTrailingSpace } = splitCommandInput(input)

  if (!parts.length) {
    addOutput('tab', availableCommands.join('    '), '')
    scrollToBottom()
    return
  }

  if (parts.length === 1 && !hasTrailingSpace) {
    const completion = autocompleteCommand(parts[0])

    if (!completion) return

    currentInput.value = completion.nextValue

    if (completion.matches.length > 1 && completion.nextValue === parts[0]) {
      addOutput(input, completion.matches.join('    '), '')
      scrollToBottom()
    }

    return
  }

  const command = parts[0]
  if (!['cd', 'ls', 'cat'].includes(command)) return

  const rawValue = hasTrailingSpace ? '' : input.slice(input.indexOf(command) + command.length).trimStart()
  const completion = autocompletePath(command, rawValue)

  if (!completion) return

  currentInput.value = `${command} ${completion.nextValue}`.trimEnd()

  const normalizedCurrent = normalizeInputPath(rawValue)
  if (completion.matches.length > 1 && normalizeInputPath(completion.nextValue) === normalizedCurrent) {
    addOutput(input, completion.matches.join('    '), '')
    scrollToBottom()
  }
}

const normalizeVirtualFilePath = (path) => {
  const normalized = normalizePath(path || '/notes.txt')
  return normalized.replace(/^\//, '')
}

const loadPyodideScript = () => new Promise((resolve, reject) => {
  if (window.loadPyodide) {
    resolve()
    return
  }

  const existingScript = document.querySelector('script[data-pyodide-loader="true"]')
  if (existingScript) {
    existingScript.addEventListener('load', resolve, { once: true })
    existingScript.addEventListener('error', () => reject(new Error('Failed to load Pyodide loader.')), { once: true })
    return
  }

  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js'
  script.async = true
  script.dataset.pyodideLoader = 'true'
  script.onload = () => resolve()
  script.onerror = () => reject(new Error('Failed to load Pyodide loader.'))
  document.head.appendChild(script)
})

const ensurePyodide = async () => {
  if (pyodide.value) return pyodide.value
  if (pyodideLoading.value) {
    while (pyodideLoading.value && !pyodide.value) {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    return pyodide.value
  }

  pyodideLoading.value = true
  try {
    await loadPyodideScript()
    pyodide.value = await window.loadPyodide({
      stdout: () => {},
      stderr: () => {}
    })
    pyodideReady.value = true
    return pyodide.value
  } finally {
    pyodideLoading.value = false
  }
}

const ensurePyodideWorkspace = async (runtime) => {
  try {
    runtime.FS.mkdir('/workspace')
  } catch {
    // Directory already exists.
  }

  await runtime.runPythonAsync(`
import os
os.chdir("/workspace")
`)
}

const writeVirtualFileToPyodide = (runtime, relativePath, content) => {
  const normalizedPath = relativePath.replace(/^\/+/, '')
  const segments = normalizedPath.split('/').filter(Boolean)
  const fileName = segments.pop()
  let currentPath = '/workspace'

  for (const segment of segments) {
    currentPath = `${currentPath}/${segment}`
    try {
      runtime.FS.mkdir(currentPath)
    } catch {
      // Directory already exists.
    }
  }

  runtime.FS.writeFile(`${currentPath}/${fileName}`, content)
}

const syncVirtualFilesToPyodide = async (runtime) => {
  await ensurePyodideWorkspace(runtime)

  for (const [path, content] of Object.entries(virtualFiles.value)) {
    writeVirtualFileToPyodide(runtime, path, content)
  }
}

const readVirtualFilesFromPyodide = (runtime, directory = '/workspace', prefix = '') => {
  const entries = runtime.FS.readdir(directory).filter((entry) => !['.', '..'].includes(entry))
  const files = {}

  for (const entry of entries) {
    const absolutePath = `${directory}/${entry}`
    const relativePath = prefix ? `${prefix}/${entry}` : entry
    const stat = runtime.FS.stat(absolutePath)
    const isDirectory = runtime.FS.isDir(stat.mode)

    if (isDirectory) {
      Object.assign(files, readVirtualFilesFromPyodide(runtime, absolutePath, relativePath))
      continue
    }

    files[relativePath] = runtime.FS.readFile(absolutePath, { encoding: 'utf8' })
  }

  return files
}

const syncVirtualFilesFromPyodide = (runtime) => {
  virtualFiles.value = {
    ...virtualFiles.value,
    ...readVirtualFilesFromPyodide(runtime)
  }
}

const runPythonCommand = async (command) => {
  const runtime = await ensurePyodide()
  await syncVirtualFilesToPyodide(runtime)
  let stdoutBuffer = ''
  let stderrBuffer = ''

  runtime.setStdout({
    batched: (output) => {
      stdoutBuffer += `${output}\n`
    }
  })
  runtime.setStderr({
    batched: (output) => {
      stderrBuffer += `${output}\n`
    }
  })

  try {
    let result = await runtime.runPythonAsync(`
import io
import contextlib
import traceback
_codex_stdout = io.StringIO()
_codex_stderr = io.StringIO()
with contextlib.redirect_stdout(_codex_stdout), contextlib.redirect_stderr(_codex_stderr):
    _codex_value = eval(compile(${JSON.stringify(command)}, "<terminal>", "eval"), globals())
_codex_stdout.getvalue()
`)
    let finalOutput = `${stdoutBuffer}${result || ''}`.trim()

    if (!finalOutput) {
      try {
        result = await runtime.runPythonAsync(`
import io
import contextlib
_codex_stdout = io.StringIO()
_codex_stderr = io.StringIO()
with contextlib.redirect_stdout(_codex_stdout), contextlib.redirect_stderr(_codex_stderr):
    exec(compile(${JSON.stringify(command)}, "<terminal>", "exec"), globals())
_codex_stdout.getvalue()
`)
        finalOutput = `${stdoutBuffer}${result || ''}`.trim()
      } catch (execError) {
        return {
          result: stdoutBuffer.trim(),
          error: execError.message.replace(/^PythonError:\s*/, '') || stderrBuffer.trim()
        }
      }
    }

    syncVirtualFilesFromPyodide(runtime)
    return {
      result: finalOutput || '(no output)',
      error: stderrBuffer.trim()
    }
  } catch (error) {
    try {
      const execResult = await runtime.runPythonAsync(`
import io
import contextlib
_codex_stdout = io.StringIO()
_codex_stderr = io.StringIO()
with contextlib.redirect_stdout(_codex_stdout), contextlib.redirect_stderr(_codex_stderr):
    exec(compile(${JSON.stringify(command)}, "<terminal>", "exec"), globals())
_codex_stdout.getvalue()
`)
      syncVirtualFilesFromPyodide(runtime)
      return {
        result: `${stdoutBuffer}${execResult || ''}`.trim() || '(no output)',
        error: stderrBuffer.trim()
      }
    } catch (execError) {
      syncVirtualFilesFromPyodide(runtime)
      return {
        result: stdoutBuffer.trim(),
        error: execError.message.replace(/^PythonError:\s*/, '') || error.message.replace(/^PythonError:\s*/, '') || stderrBuffer.trim()
      }
    }
  }
}

const runPythonFile = async (rawPath) => {
  const runtime = await ensurePyodide()
  await syncVirtualFilesToPyodide(runtime)

  const normalizedPath = normalizeVirtualFilePath(resolvePath(normalizeInputPath(rawPath)))
  if (!(normalizedPath in virtualFiles.value)) {
    return {
      result: '',
      error: `python: can't open file '${rawPath}': No such file or directory`
    }
  }

  let stdoutBuffer = ''
  let stderrBuffer = ''

  runtime.setStdout({
    batched: (output) => {
      stdoutBuffer += `${output}\n`
    }
  })
  runtime.setStderr({
    batched: (output) => {
      stderrBuffer += `${output}\n`
    }
  })

  try {
    await runtime.runPythonAsync(`
import os
import runpy
import sys
sys.argv = [${JSON.stringify(normalizedPath)}]
runpy.run_path(os.path.join("/workspace", ${JSON.stringify(normalizedPath)}), run_name="__main__")
`)
    syncVirtualFilesFromPyodide(runtime)
    return {
      result: stdoutBuffer.trim() || '(no output)',
      error: stderrBuffer.trim()
    }
  } catch (error) {
    syncVirtualFilesFromPyodide(runtime)
    return {
      result: stdoutBuffer.trim(),
      error: error.message.replace(/^PythonError:\s*/, '') || stderrBuffer.trim()
    }
  }
}

const enterPythonMode = async () => {
  if (pythonMode.value) return

  addOutput('python', pyodideReady.value ? 'Python 3 (Pyodide) REPL. Type exit to leave.' : 'Loading Pyodide runtime...', '')
  scrollToBottom()

  try {
    await ensurePyodide()
    pyodideReady.value = true
    pythonMode.value = true
    addOutput('python', 'Python 3 (Pyodide) ready. Try: print("hello")', '')
  } catch (error) {
    addOutput('python', '', error.message || 'Failed to initialize Python runtime.')
  }

  scrollToBottom()
  focusInput()
}

const exitPythonMode = () => {
  pythonMode.value = false
  addOutput('exit', 'Leaving Python REPL.', '')
  scrollToBottom()
  focusInput()
}

const openVim = (rawFilename) => {
  const filename = normalizeVirtualFilePath(resolvePath(normalizeInputPath(rawFilename || 'notes.txt')))
  if (!(filename in virtualFiles.value)) {
    virtualFiles.value[filename] = ''
  }

  vimState.value = {
    active: true,
    filename,
    content: virtualFiles.value[filename],
    mode: 'normal',
    commandBuffer: '',
    statusMessage: `"${filename}" ${virtualFiles.value[filename].split('\n').length}L`
  }

  addOutput(`vim ${filename}`, `Opened "${filename}" in browser vim.`, '')
  nextTick(() => {
    vimTextareaRef.value?.focus()
  })
}

const closeVim = (message = 'Vim closed.') => {
  vimState.value = {
    active: false,
    filename: 'notes.txt',
    content: '',
    mode: 'normal',
    commandBuffer: '',
    statusMessage: 'READY'
  }
  addOutput('vim', message, '')
  focusInput()
  scrollToBottom()
}

const saveVimFile = () => {
  const { filename, content } = vimState.value
  virtualFiles.value[filename] = content
  vimState.value.statusMessage = `"${filename}" written`
}

const executeVimCommand = () => {
  const command = vimState.value.commandBuffer.trim()

  if (command === 'w') {
    saveVimFile()
    vimState.value.mode = 'normal'
    vimState.value.commandBuffer = ''
    return
  }

  if (command === 'q') {
    vimState.value.commandBuffer = ''
    closeVim(`Closed "${vimState.value.filename}".`)
    return
  }

  if (command === 'wq' || command === 'x') {
    saveVimFile()
    const filename = vimState.value.filename
    vimState.value.commandBuffer = ''
    closeVim(`Saved and closed "${filename}".`)
    return
  }

  vimState.value.statusMessage = `Not an editor command: ${command}`
  vimState.value.commandBuffer = ''
  vimState.value.mode = 'normal'
}

const handleVimKeydown = (event) => {
  if (!vimState.value.active) return

  if (vimState.value.mode === 'insert') {
    if (event.key === 'Escape') {
      event.preventDefault()
      vimState.value.mode = 'normal'
      vimState.value.statusMessage = 'NORMAL'
    }
    return
  }

  if (vimState.value.mode === 'command') {
    if (event.key === 'Enter') {
      event.preventDefault()
      executeVimCommand()
      return
    }

    if (event.key === 'Backspace') {
      event.preventDefault()
      vimState.value.commandBuffer = vimState.value.commandBuffer.slice(0, -1)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      vimState.value.mode = 'normal'
      vimState.value.commandBuffer = ''
      vimState.value.statusMessage = 'NORMAL'
      return
    }

    if (event.key.length === 1) {
      event.preventDefault()
      vimState.value.commandBuffer += event.key
    }
    return
  }

  if (vimState.value.mode === 'normal') {
    if (event.key === 'i') {
      event.preventDefault()
      vimState.value.mode = 'insert'
      vimState.value.statusMessage = 'INSERT'
      return
    }

    if (event.key === ':') {
      event.preventDefault()
      vimState.value.mode = 'command'
      vimState.value.commandBuffer = ''
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      return
    }

    event.preventDefault()
  }
}

// 指令處理器
const executeCommand = async () => {
  const command = currentInput.value.trim()
  
  if (!command) {
    currentInput.value = ''
    focusInput()
    return
  }

  // 添加到命令歷史
  if (commandHistory.value[commandHistory.value.length - 1] !== command) {
    commandHistory.value.push(command)
  }
  historyIndex.value = commandHistory.value.length

  if (pythonMode.value) {
    if (['exit', 'quit'].includes(command.toLowerCase())) {
      currentInput.value = ''
      exitPythonMode()
      return
    }

    const pythonResult = await runPythonCommand(command)
    addOutput(command, pythonResult.result, pythonResult.error)
    currentInput.value = ''
    scrollToBottom()
    focusInput()
    return
  }

  // 解析命令
  const [cmd = '', ...args] = command.split(' ')
  const rawArgString = command.slice(cmd.length).trim()
  const normalizedArgString = normalizeInputPath(rawArgString)
  
  // 檢查危險命令 rm -rf /
  const commandLower = command.toLowerCase()
        if ((cmd.toLowerCase() === 'rm' && args.includes('-rf') && args.includes('/')) ||
      commandLower === 'rm -rf /' ||
      commandLower.includes('rm -rf /')) {
    // 顯示警告訊息
    addOutput(command, terminalErrorMessages.rmDangerous, '')
    currentInput.value = ''
    scrollToBottom()
    
    // 延遲觸發損毀動畫
    setTimeout(() => {
      showCrashAnimation.value = true
    }, 1000)
    return
  }
  let result = ''
  let error = ''

  try {
    switch (cmd.toLowerCase()) {
      case 'whoami':
        result = terminalCommandOutputs.whoami.template
          .replace('{publicationsCount}', publications.length)
          .replace('{conferencesCount}', conferences.length)
          .replace('{experiencesCount}', experiences.length)
        break

      case 'pwd':
        result = currentDirectory.value
        break

      case 'cd':
        const cdResult = handleCdCommand(normalizedArgString)
        if (cdResult.error) {
          error = cdResult.error
        } else {
          addOutput(command, '', '')
          previousDirectory.value = currentDirectory.value
          currentDirectory.value = cdResult.directory
          // cd 命令不顯示輸出，但會保留上一個 prompt 的歷史
          currentInput.value = ''
          scrollToBottom()
          focusInput()
          return
        }
        break

      case 'cat':
        if (!normalizedArgString) {
          error = terminalErrorMessages.catMissingOperand
        } else {
          const filePath = resolvePath(normalizedArgString)
          result = handleCatCommand(filePath)
          if (!result) {
            error = terminalErrorMessages.catNoSuchFile.replace('{file}', normalizedArgString)
          }
        }
        break

      case 'ls':
        const lsPath = normalizedArgString || currentDirectory.value
        const lsResult = handleLsCommand(lsPath)
        result = lsResult.result
        error = lsResult.error
        break

      case 'help':
        result = terminalHelpCommand.title + '\n' +
          terminalHelpCommand.commands.map(cmd => 
            `  ${cmd.command.padEnd(20)} - ${cmd.description}`
          ).join('\n')
        break

      case 'history':
        result = commandHistory.value.map((entry, index) => `${index + 1}  ${entry}`).join('\n')
        break

      case 'date':
        result = new Date().toString()
        break

      case 'uname':
        result = rawArgString === '-a'
          ? 'PortfolioOS 1.0.0 juihsuan terminal-shell x86_64'
          : 'PortfolioOS'
        break

      case 'echo':
        result = rawArgString
        break

      case 'clear':
        outputHistory.value = []
        currentInput.value = ''
        focusInput()
        return

      case 'python':
      case 'python3':
        if (normalizedArgString) {
          const pythonFileResult = await runPythonFile(normalizedArgString)
          addOutput(command, pythonFileResult.result, pythonFileResult.error)
          currentInput.value = ''
          scrollToBottom()
          focusInput()
          return
        }

        currentInput.value = ''
        await enterPythonMode()
        return

      case 'vim':
      case 'vi':
        currentInput.value = ''
        openVim(normalizedArgString || 'notes.txt')
        scrollToBottom()
        return

      case 'exit':
      case 'quit':
        result = 'Nothing to exit right now.'
        break

      case 'shutdown':
      case 'poweroff':
      case 'halt':
        result = terminalCommandOutputs.shutdown
        addOutput(command, result, error)
        currentInput.value = ''
        scrollToBottom()
        // 延遲執行關機，讓訊息先顯示
        setTimeout(() => {
          if (shutdown) {
            shutdown()
          }
        }, 1000)
        return

      // 彩蛋命令
      case 'coffee':
        result = terminalCommandOutputs.coffee
        break

      case 'paper':
        const recentPubs = publications.slice(0, 3).map((pub, idx) => 
          `  ${idx + 1}. ${pub.title} (${pub.year})`
        ).join('\n')
        result = terminalCommandOutputs.paper.template
          .replace('{publicationsCount}', publications.length)
          .replace('{conferencesCount}', conferences.length)
          .replace('{recentPublications}', recentPubs)
        break

      case 'rag':
        result = terminalCommandOutputs.rag
        break

      case 'llm':
        result = terminalCommandOutputs.llm
        break

      case 'tanet':
        const tanetConfs = conferences.filter(c => c.title.includes('TANET')).map((conf, idx) => 
          `${idx + 1}. ${conf.title}\n   Date: ${conf.date}\n   Location: ${conf.location}\n   Paper: ${conf.paperTitle}\n   Type: ${conf.presentationType}`
        ).join('\n\n')
        result = terminalCommandOutputs.tanet.template
          .replace('{tanetConferences}', tanetConfs)
          .replace('{tanetCount}', conferences.filter(c => c.title.includes('TANET')).length)
        break

      case 'research':
        result = terminalCommandOutputs.research.template
          .replace('{publicationsCount}', publications.length)
          .replace('{conferencesCount}', conferences.length)
        break

      case 'easter-egg':
      case 'egg':
        result = terminalCommandOutputs['easter-egg']
        break

      case 'howdoyouturnthison':
        result = terminalCommandOutputs.howdoyouturnthison
        break

      default:
        if (command.startsWith('./')) {
          if (command === './quick_links.sh') {
            result = quickLinks.map((link, idx) => {
              const path = link.type === 'mailto' ? link.path : link.path
              return `[${idx + 1}] ${link.label} - ${path}`
            }).join('\n')
          } else {
            error = terminalErrorMessages.bashNoSuchFile.replace('{command}', command)
          }
        } else {
          // 有趣的錯誤訊息
          const funnyMessages = terminalErrorMessages.commandNotFound.map(msg => 
            msg.replace('{cmd}', cmd)
          )
          error = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
        }
    }
  } catch (e) {
    error = `Error: ${e.message}`
  }

  addOutput(command, result, error)
  currentInput.value = ''
  scrollToBottom()
  focusInput()
}

const addOutput = (command, result, error) => {
  outputHistory.value.push({
    command,
    result,
    error,
    directory: currentDirectory.value,
    timestamp: new Date()
  })
}

// 解析路徑（支援相對路徑和絕對路徑）
const resolvePath = (path) => {
  if (!path) {
    return currentDirectory.value
  }

  if (path === '~') {
    return '/'
  }

  if (path.startsWith('/')) {
    // 絕對路徑
    return path
  } else {
    // 相對路徑
    if (currentDirectory.value === '/') {
      return '/' + path
    } else {
      return currentDirectory.value + '/' + path
    }
  }
}

// 標準化路徑（移除多餘的斜線和處理 ..）
const normalizePath = (path) => {
  // 移除末尾的斜線（除了根目錄）
  let normalized = path.replace(/\/+$/, '') || '/'
  
  // 處理 .. 和 .
  const parts = normalized.split('/').filter(p => p !== '' && p !== '.')
  const result = []
  
  for (const part of parts) {
    if (part === '..') {
      if (result.length > 0) {
        result.pop()
      }
    } else {
      result.push(part)
    }
  }
  
  return '/' + result.join('/')
}

const handleCdCommand = (target) => {
  if (!target || target === '~') {
    // cd 或 cd ~ 回到根目錄
    return { directory: '/', error: null }
  }
  
  if (target === '-') {
    return { directory: previousDirectory.value, error: null }
  }
  
  // 解析路徑
  let targetPath = target.startsWith('/') ? target : currentDirectory.value + '/' + target
  targetPath = normalizePath(targetPath)
  
  // 檢查目錄是否存在
  if (validDirectories.includes(targetPath)) {
    return { directory: targetPath, error: null }
  } else {
    return { directory: currentDirectory.value, error: terminalErrorMessages.cdNoSuchDirectory.replace('{dir}', target) }
  }
}

const handleCatCommand = (filePath) => {
  // 標準化路徑
  const normalizedPath = normalizePath(filePath)
  const virtualFileKey = normalizedPath.replace(/^\//, '')

  if (virtualFileKey in virtualFiles.value) {
    return virtualFiles.value[virtualFileKey]
  }

  switch (normalizedPath) {
    case '/about.txt':
      return terminalFileContents['about.txt']

    case '/README.txt':
      return terminalFileContents['README.txt']

    case '/research.txt':
      return terminalFileContents['research.txt'].template
        .replace('{conferencesCount}', conferences.length)
        .replace('{publicationsCount}', publications.length)

    case '/experience.txt':
      return terminalFileContents['experience.txt'].template
        .replace('{experiencesCount}', experiences.length)

    default:
      // 檢查是否在子目錄中
      if (normalizedPath.startsWith('/skills/')) {
        const skillName = normalizedPath.replace('/skills/', '')
        const skill = skills.find(s => s.title === skillName)
        if (skill) {
          return `技能: ${skill.title}

${skill.description}

技術棧:
${skill.technologies.map(t => `  - ${t.name}`).join('\n')}

技能等級:
${skill.skillLevels.map(l => `  ${l.name}: ${l.level}%`).join('\n')}`
        }
      } else if (normalizedPath.startsWith('/conferences/')) {
        const confName = normalizedPath.replace('/conferences/', '')
        const conf = conferences.find(c => c.title === confName)
        if (conf) {
          return `研討會: ${conf.title}

日期: ${conf.date}
地點: ${conf.location}
類型: ${conf.type}
報告形式: ${conf.presentationType}

論文標題: ${conf.paperTitle}

作者: ${conf.authors.join(', ')}`
        }
      } else if (normalizedPath.startsWith('/publications/')) {
        const pubName = normalizedPath.replace('/publications/', '')
        const pub = publications.find(p => p.title === pubName)
        if (pub) {
          return `論文: ${pub.title}

作者: ${pub.authors.join(', ')}
年份: ${pub.year}
類型: ${pub.type}

${pub.journal ? `期刊: ${pub.journal}` : ''}
${pub.conference ? `會議: ${pub.conference}` : ''}

關鍵字: ${pub.keywords.join(', ')}`
        }
      } else if (normalizedPath.startsWith('/experiences/')) {
        const expName = normalizedPath.replace('/experiences/', '')
        const exp = experiences.find(e => `${e.position}@${e.company}` === expName)
        if (exp) {
          return `工作經歷: ${exp.position}

公司: ${exp.company}
地點: ${exp.location}
期間: ${exp.startDate}${exp.isCurrent ? ' - 仍在職' : ` - ${exp.endDate}`}
產業: ${exp.industry}
公司規模: ${exp.companySize}

職責:
${exp.responsibilities.map(r => `  - ${r}`).join('\n')}

技術:
${exp.technologies.map(t => `  - ${t}`).join('\n')}`
        }
      }
      return null
  }
}

const handleLsCommand = (directory) => {
  // 解析路徑
  let targetPath = directory.startsWith('/') ? directory : currentDirectory.value + '/' + directory
  targetPath = normalizePath(targetPath)
  
  // 移除末尾斜線
  const cleanPath = targetPath.replace(/\/$/, '') || '/'
  
  switch (cleanPath) {
    case '/':
      return {
        result: [terminalLsOutputs['/'], ...Object.keys(virtualFiles.value).filter((file) => !rootFiles.includes(file))].join('\n'),
        error: ''
      }

    case '/skills':
      return { result: skills.map(skill => skill.title).join('\n'), error: '' }

    case '/conferences':
      return { result: conferences.map(conf => `${conf.title} (${conf.date})`).join('\n'), error: '' }

    case '/publications':
      return { result: publications.map(pub => `${pub.title} (${pub.year})`).join('\n'), error: '' }

    case '/experiences':
      return { result: experiences.map(exp => `${exp.position}@${exp.company} (${exp.startDate}${exp.isCurrent ? '-仍在職' : `-${exp.endDate}`})`).join('\n'), error: '' }

    default:
      if (rootFiles.includes(cleanPath.replace(/^\//, '')) || cleanPath.replace(/^\//, '') in virtualFiles.value) {
        return { result: cleanPath.replace(/^\//, ''), error: '' }
      }

      return {
        result: '',
        error: terminalErrorMessages.lsCannotAccess.replace('{dir}', directory)
      }
  }
}

const handleKeyDown = (event) => {
  if (vimState.value.active) {
    event.preventDefault()
    return
  }

  // 上下箭頭瀏覽歷史
  if (event.key === 'Tab') {
    event.preventDefault()
    handleTabCompletion()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (commandHistory.value.length > 0) {
      if (historyIndex.value > 0) {
        historyIndex.value--
      }
      currentInput.value = commandHistory.value[historyIndex.value] || ''
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++
      currentInput.value = commandHistory.value[historyIndex.value] || ''
    } else {
      historyIndex.value = commandHistory.value.length
      currentInput.value = ''
    }
  } else if (event.key === 'l' && event.ctrlKey) {
    // Ctrl+L 清空終端
    event.preventDefault()
    outputHistory.value = []
    currentInput.value = ''
  }
}

// 監聽輸入變化，重置歷史索引
watch(currentInput, () => {
  if (historyIndex.value === commandHistory.value.length) {
    // 用戶正在輸入新命令
  }
})

watch(
  () => vimState.value.active,
  (active) => {
    if (active) {
      nextTick(() => {
        vimTextareaRef.value?.focus()
      })
      return
    }

    focusInput()
  }
)

const handleCrashComplete = () => {
  // 損毀動畫完成後，停留在藍屏狀態
  // 用戶需要手動重新整理頁面才能恢復
}

onMounted(() => {
  // 顯示歡迎訊息
  const welcomeMsg = `${terminalWelcomeMessages.join('\n')}\n\n${terminalFileContents['README.txt']}`
  addOutput('motd', welcomeMsg, '')
  
  // 聚焦輸入框
  focusInput()
})
</script>

<style scoped>
.terminal-output {
  font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
}

.prompt-symbol {
  color: #00ff00;
  font-weight: bold;
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.output-item {
  margin-bottom: 0.5rem;
  animation: shellOutputIn 0.28s ease;
}

.output-timestamp {
  min-width: 3.4rem;
  color: rgba(0, 255, 0, 0.32);
  font-size: 11px;
  line-height: 1.5rem;
}

.terminal-command {
  color: rgba(57, 255, 20, 0.95);
}

.terminal-command-system {
  color: rgba(143, 255, 143, 0.9);
}

.terminal-command-hint {
  color: #7dd3fc;
}

.terminal-result {
  color: rgba(180, 255, 180, 0.78);
}

.terminal-result-system {
  color: rgba(143, 255, 143, 0.82);
}

.terminal-result-hint {
  color: rgba(125, 211, 252, 0.9);
}

.terminal-error {
  color: #f87171;
}

.suggestion-chip {
  background: rgba(0, 255, 0, 0.04);
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.suggestion-chip:hover {
  background: rgba(0, 255, 0, 0.08);
  transform: translateY(-1px);
}

.suggestion-label {
  color: rgba(180, 255, 180, 0.82);
}

input {
  caret-color: #00ff00;
}

input::placeholder {
  color: rgba(0, 255, 0, 0.3);
}

/* 自定義滾動條 */
.terminal-output::-webkit-scrollbar {
  width: 8px;
}

.terminal-output::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
}

.terminal-output::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 0, 0.3);
  border-radius: 4px;
}

.terminal-output::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 0, 0.5);
}

.terminal-window-bar {
  position: relative;
}

.terminal-window-bar::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.18), transparent);
}

.vim-overlay {
  display: flex;
  flex-direction: column;
  min-height: 18rem;
}

.vim-toolbar,
.vim-statusline {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 1rem;
  font-size: 0.75rem;
  color: rgba(180, 255, 180, 0.75);
}

.vim-toolbar {
  border-bottom: 1px solid rgba(0, 255, 0, 0.12);
}

.vim-statusline {
  border-top: 1px solid rgba(0, 255, 0, 0.12);
  color: rgba(143, 255, 143, 0.82);
}

.vim-title {
  color: #39ff14;
}

.vim-editor {
  flex: 1;
  min-height: 14rem;
  resize: none;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0.92);
  color: rgba(180, 255, 180, 0.9);
  padding: 1rem;
  font: inherit;
  line-height: 1.7;
  caret-color: #39ff14;
}

.vim-editor[readonly] {
  caret-color: transparent;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
}

.window-dot-red {
  background: #ff5f56;
}

.window-dot-amber {
  background: #ffbd2e;
}

.window-dot-green {
  background: #27c93f;
}

@keyframes shellOutputIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
