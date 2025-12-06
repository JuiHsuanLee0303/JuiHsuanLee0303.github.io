<template>
  <div class="h-full bg-black text-terminal-green font-mono overflow-hidden flex flex-col relative">
    <!-- 損毀動畫 -->
    <CrashAnimation 
      v-if="showCrashAnimation"
      :on-complete="handleCrashComplete"
    />
    
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
        <div
          v-for="(message, index) in terminalWelcomeMessages"
          :key="index"
          class="text-terminal-green/70 text-sm mb-4"
        >
          {{ message }}
        </div>
        
        <!-- 歷史輸出 -->
        <div
          v-for="(output, index) in outputHistory"
          :key="index"
          class="output-item"
        >
          <!-- 命令提示符和輸入 -->
          <div class="flex items-start mb-1">
            <span class="prompt-symbol mr-2">{{ output.directory === '/' ? '$' : output.directory + ' $' }}</span>
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
        <span class="prompt-symbol mr-2">{{ currentDirectory === '/' ? '$' : currentDirectory + ' $' }}</span>
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

const router = useRouter()
const shutdown = inject('shutdown')
const inputRef = ref(null)
const outputContainer = ref(null)
const currentInput = ref('')
const outputHistory = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)
const currentDirectory = ref('/')
const showCrashAnimation = ref(false)

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
        const cdResult = handleCdCommand(args[0] || '')
        if (cdResult.error) {
          error = cdResult.error
        } else {
          currentDirectory.value = cdResult.directory
          // cd 命令不顯示輸出，只改變目錄
          currentInput.value = ''
          return
        }
        break

      case 'cat':
        if (!args[0]) {
          error = terminalErrorMessages.catMissingOperand
        } else {
          const filePath = resolvePath(args[0])
          result = handleCatCommand(filePath)
          if (!result) {
            error = terminalErrorMessages.catNoSuchFile.replace('{file}', args[0])
          }
        }
        break

      case 'ls':
        const lsPath = args[0] || currentDirectory.value
        result = handleLsCommand(lsPath)
        break

      case 'help':
        result = terminalHelpCommand.title + '\n' +
          terminalHelpCommand.commands.map(cmd => 
            `  ${cmd.command.padEnd(20)} - ${cmd.description}`
          ).join('\n')
        break

      case 'clear':
        outputHistory.value = []
        currentInput.value = ''
        return

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
              const path = link.type === 'mailto' ? `mailto:${personalInfo.email}` : 
                          link.type === 'external' ? personalInfo.github : link.path
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
    // cd - 回到上一個目錄（簡化處理，回到根目錄）
    return { directory: '/', error: null }
  }
  
  // 解析路徑
  let targetPath = target.startsWith('/') ? target : currentDirectory.value + '/' + target
  targetPath = normalizePath(targetPath)
  
  // 檢查目錄是否存在
  const validDirectories = ['/', '/skills', '/conferences', '/publications', '/experiences']
  
  if (validDirectories.includes(targetPath)) {
    return { directory: targetPath, error: null }
  } else {
    return { directory: currentDirectory.value, error: terminalErrorMessages.cdNoSuchDirectory.replace('{dir}', target) }
  }
}

const handleCatCommand = (filePath) => {
  // 標準化路徑
  const normalizedPath = normalizePath(filePath)
  
  // 提取文件名
  const filename = normalizedPath.split('/').pop()
  
  switch (normalizedPath) {
    case '/about.txt':
    case '/README.txt':
      return terminalFileContents['about.txt']

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
      return terminalLsOutputs['/']

    case '/skills':
      return skills.map(skill => skill.title).join('\n')

    case '/conferences':
      return conferences.map(conf => `${conf.title} (${conf.date})`).join('\n')

    case '/publications':
      return publications.map(pub => `${pub.title} (${pub.year})`).join('\n')

    case '/experiences':
      return experiences.map(exp => `${exp.position}@${exp.company} (${exp.startDate}${exp.isCurrent ? '-仍在職' : `-${exp.endDate}`})`).join('\n')

    default:
      return terminalErrorMessages.lsCannotAccess.replace('{dir}', directory)
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

const handleCrashComplete = () => {
  // 損毀動畫完成後，停留在藍屏狀態
  // 用戶需要手動重新整理頁面才能恢復
}

onMounted(() => {
  // 顯示歡迎訊息
  const readmeContent = terminalFileContents['README.txt']
  const welcomeMsg = readmeContent + '\n\n' + terminalWelcomeMessages.join('\n')
  addOutput('cat README.txt', welcomeMsg, '')
  
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

