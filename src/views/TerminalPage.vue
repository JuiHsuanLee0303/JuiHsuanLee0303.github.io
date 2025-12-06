<template>
  <div class="h-full bg-black text-terminal-green font-mono overflow-hidden flex flex-col">
    <div class="flex-1 container mx-auto px-4 py-6 flex flex-col min-h-0">
      <!-- 終端機標題 -->
      <div class="flex-shrink-0 mb-4 text-terminal-green/70 text-sm border-b border-terminal-green/30 pb-2">
        Terminal - Interactive Shell
      </div>

      <!-- 終端機輸出區域 -->
      <div 
        ref="outputContainer"
        class="flex-1 overflow-y-auto mb-4 space-y-2 terminal-output min-h-0"
      >
        <div class="text-terminal-green/70 text-sm mb-4">
          Welcome to Jui-Hsuan Lee's Interactive Terminal
        </div>
        <div class="text-terminal-green/70 text-sm mb-4">
          Type 'help' to see available commands.
        </div>
        
        <!-- 歷史輸出 -->
        <div
          v-for="(output, index) in outputHistory"
          :key="index"
          class="output-item"
        >
          <!-- 命令提示符和輸入 -->
          <div class="flex items-start mb-1">
            <span class="prompt-symbol mr-2">$</span>
            <span class="text-terminal-green">{{ output.command }}</span>
          </div>
          <!-- 命令輸出 -->
          <div 
            v-if="output.result"
            class="ml-6 text-terminal-green/80 whitespace-pre-wrap"
            v-html="output.result"
          ></div>
          <!-- 錯誤訊息 -->
          <div 
            v-if="output.error"
            class="ml-6 text-red-400"
          >
            {{ output.error }}
          </div>
        </div>
      </div>

      <!-- 輸入區域 -->
      <div class="flex-shrink-0 flex items-center border-t border-terminal-green/30 pt-2">
        <span class="prompt-symbol mr-2">$</span>
        <input
          ref="inputRef"
          v-model="currentInput"
          @keydown="handleKeyDown"
          @keyup.enter="executeCommand"
          type="text"
          class="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono"
          placeholder=""
          autofocus
        />
        <span class="cursor-blink ml-1">_</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { 
  skills, 
  conferences, 
  publications, 
  experiences 
} from '../data'

const router = useRouter()
const shutdown = inject('shutdown')
const inputRef = ref(null)
const outputContainer = ref(null)
const currentInput = ref('')
const outputHistory = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)

// 自動滾動到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (outputContainer.value) {
      outputContainer.value.scrollTop = outputContainer.value.scrollHeight
    }
  })
}

// 指令處理器
const executeCommand = () => {
  const command = currentInput.value.trim()
  
  if (!command) {
    addOutput('', '', '')
    currentInput.value = ''
    return
  }

  // 添加到命令歷史
  if (commandHistory.value[commandHistory.value.length - 1] !== command) {
    commandHistory.value.push(command)
  }
  historyIndex.value = commandHistory.value.length

  // 解析命令
  const [cmd, ...args] = command.split(' ')
  let result = ''
  let error = ''

  try {
    switch (cmd.toLowerCase()) {
      case 'whoami':
        result = `Jui-Hsuan Lee
學術研究者 | AI工程師 | 資安研究者`
        break

      case 'cat':
        if (!args[0]) {
          error = 'cat: missing file operand'
        } else {
          result = handleCatCommand(args[0])
          if (!result) {
            error = `cat: ${args[0]}: No such file or directory`
          }
        }
        break

      case 'ls':
        result = handleLsCommand(args[0] || '')
        break

      case 'help':
        result = `Available commands:
  whoami              - Display user information
  cat <file>          - Display file contents
                        Files: about.txt, research.txt, experience.txt
  ls [directory]      - List directory contents
                        Directories: skills/, conferences/, publications/, experiences/
  ./quick_links.sh    - Show quick links
  shutdown            - Shutdown the system
  poweroff            - Power off the system
  halt                - Halt the system
  clear               - Clear terminal
  help                - Show this help message`
        break

      case 'clear':
        outputHistory.value = []
        currentInput.value = ''
        return

      case 'shutdown':
      case 'poweroff':
      case 'halt':
        result = 'Initiating system shutdown...'
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

      default:
        if (command.startsWith('./')) {
          if (command === './quick_links.sh') {
            result = `[1] 學術研究 - /research
[2] 工作經歷 - /experience
[3] 聯絡我 - mailto:juihsuanlee0303@gmail.com
[4] GitHub - https://github.com`
          } else {
            error = `bash: ${command}: No such file or directory`
          }
        } else {
          error = `bash: ${cmd}: command not found`
        }
    }
  } catch (e) {
    error = `Error: ${e.message}`
  }

  addOutput(command, result, error)
  currentInput.value = ''
  scrollToBottom()
}

const addOutput = (command, result, error) => {
  outputHistory.value.push({
    command,
    result,
    error,
    timestamp: new Date()
  })
}

const handleCatCommand = (filename) => {
  switch (filename) {
    case 'about.txt':
      return `> 歡迎來到我的學術研究網站

> 我專注於人工智慧、自然語言處理、資訊安全等領域的研究

> 致力於將理論研究與實際應用相結合，推動技術創新`

    case 'research.txt':
      return `學術研究

研討會參與與論文發表記錄

研討會數量: ${conferences.length}
論文數量: ${publications.length}

使用 'ls conferences/' 查看研討會列表
使用 'ls publications/' 查看論文列表`

    case 'experience.txt':
      return `工作經歷

專業工作經驗與職責

工作經歷數量: ${experiences.length}

使用 'ls experiences/' 查看工作經歷列表`

    default:
      return null
  }
}

const handleLsCommand = (directory) => {
  if (!directory) {
    return `about.txt
research.txt
experience.txt
skills/
conferences/
publications/
experiences/
quick_links.sh`
  }

  switch (directory.replace(/\/$/, '')) {
    case 'skills':
      return skills.map(skill => skill.title).join('\n')

    case 'conferences':
      return conferences.map(conf => `${conf.title} (${conf.date})`).join('\n')

    case 'publications':
      return publications.map(pub => `${pub.title} (${pub.year})`).join('\n')

    case 'experiences':
      return experiences.map(exp => `${exp.position} @ ${exp.company} (${exp.startDate}${exp.isCurrent ? '-仍在職' : `-${exp.endDate}`})`).join('\n')

    default:
      return `ls: cannot access '${directory}': No such file or directory`
  }
}

const handleKeyDown = (event) => {
  // 上下箭頭瀏覽歷史
  if (event.key === 'ArrowUp') {
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
    executeCommand()
    currentInput.value = 'clear'
    executeCommand()
  }
}

// 監聽輸入變化，重置歷史索引
watch(currentInput, () => {
  if (historyIndex.value === commandHistory.value.length) {
    // 用戶正在輸入新命令
  }
})

onMounted(() => {
  // 顯示歡迎訊息
  addOutput('', 'Welcome to Jui-Hsuan Lee\'s Interactive Terminal\nType \'help\' to see available commands.', '')
  
  // 聚焦輸入框
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
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
</style>

