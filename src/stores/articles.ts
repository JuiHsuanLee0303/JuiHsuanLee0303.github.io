import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [
      {
        date: '2025-03-10',
        category: '技術分享',
        title: 'Tailwind CSS v4 更新介紹與最佳實踐',
        content: `
Tailwind CSS v4 是這個受歡迎的 CSS 框架的最新重大更新，帶來了許多新特性與改進，特別是在配置管理與效能優化方面。本文將介紹 Tailwind CSS v4 的重要更新內容，並提供如何適應這些變化的最佳實踐。

## 1. CSS 優先配置 (CSS-First Configuration)

在 v4 版本中，Tailwind 轉向 "CSS 優先" 的配置方式，允許開發者直接在 CSS 檔案中使用 \`@theme\` 指令來定義主題變數，取代了原本的 \`tailwind.config.js\` 設定。

### 變更前 (v3)：
\`\`\`javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#E3004F',
        secondary: '#005B94',
      },
    },
  },
};
\`\`\`

### 變更後 (v4)：
\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #E3004F;
  --color-secondary: #005B94;
}
\`\`\`

這樣可以讓 Tailwind 更靈活地處理樣式，並更容易在不同專案間共享主題設定。

## 2. 簡化的 \`@apply\` 語法

Tailwind CSS v4 進一步優化 \`@apply\`，允許開發者更自然地在 CSS 中應用 Tailwind 工具類。

### v3 寫法：
\`\`\`css
.btn {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
\`\`\`

### v4 寫法：
\`\`\`css
.btn {
  background: theme('colors.blue.500');
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
\`\`\`
這樣的改變讓 \`@apply\` 更接近原生 CSS，並且能夠使用 \`theme()\` 來引用 Tailwind 的變數。

## 3. 全新的 JIT 編譯優化

Tailwind v4 繼續強化 Just-In-Time (JIT) 編譯，提升效能與減少不必要的 CSS 生成。

**優勢包括：**
- **更快的編譯速度**：減少未使用的 CSS 類別，減少最終的 CSS 檔案大小。
- **更靈活的變數支援**：允許開發者在 CSS 內部使用 \`theme()\` 來存取 Tailwind 變數。

## 4. 改進的響應式單位

在 Tailwind v4 中，開發者可以更自由地自訂響應式單位，支援 \`rem\`、\`em\`、\`vh\`、\`vw\` 等更多單位。

**範例：**
\`\`\`css
@theme {
  --spacing-sm: 0.5rem;
  --spacing-lg: 2rem;
}
\`\`\`

這讓開發者可以更容易地調整不同裝置上的排版與間距。

## 5. 其他重要更新

- **刪除 \`tailwind.config.js\`**：預設不再需要 JavaScript 配置檔案。
- **提升跨框架兼容性**：更好地支援 Vue、React、Svelte 等前端框架。
- **更快的開發體驗**：大幅優化開發過程中的即時編譯速度。

## 6. 如何升級到 Tailwind v4

如果你目前使用的是 Tailwind v3，可以透過以下步驟升級：

### 1️⃣ 更新 Tailwind CSS
\`\`\`bash
npm install tailwindcss@latest
\`\`\`

### 2️⃣ 移除 \`tailwind.config.js\`（如果需要）
\`\`\`bash
rm tailwind.config.js
\`\`\`

### 3️⃣ 轉換 CSS 設定
將原本的 \`extend.colors\` 轉換為 \`@theme\`，例如：
\`\`\`css
@theme {
  --color-primary: #E3004F;
  --color-secondary: #005B94;
}
\`\`\`

這樣就可以無縫升級到 Tailwind v4，並享受更快、更靈活的開發體驗。

## 結論

Tailwind CSS v4 帶來了重大改進，特別是在 **CSS 優先配置、JIT 編譯優化、響應式單位擴展** 等方面，讓開發者能夠更靈活、更高效地開發現代化的 UI。雖然移除 \`tailwind.config.js\` 可能需要一些適應，但新的 \`@theme\` 方法讓全域設定變得更簡單，值得嘗試！

🚀 **快來升級 Tailwind CSS v4，體驗更現代的前端開發方式吧！**

`,
        tags: ['tailwind', 'css', '前端開發'],
        image: new URL('@/assets/Tailwind_CSS_logo.svg.png', import.meta.url).href,
      },
      {
        date: '2025-03-10',
        category: '學習筆記',
        title: 'Chapter 2 Working with text data',
        content: `
### 2.1 了解詞嵌入（Word Embedding）

詞嵌入（Word Embedding）是一種將文字轉換為數值向量的技術，使機器能夠理解語意關係。相較於傳統的獨熱編碼（one-hot encoding），詞嵌入能夠將語意相近的詞彙映射到相鄰的向量空間，使機器學習能夠更有效地處理自然語言。

常見的詞嵌入方法：

- **Word2Vec**：透過 Skip-gram 或 CBOW（Continuous Bag of Words）學習詞向量，根據詞彙的共現關係進行訓練。
- **GloVe**（Global Vectors for Word Representation）：利用詞彙的共現矩陣來學習詞向量，能夠保留語意與詞頻之間的關係。
- **FastText**：基於 Word2Vec，進一步考慮子詞（subword），使其能夠處理罕見詞或新詞。

詞嵌入技術在文本分類、情感分析、機器翻譯等自然語言處理（NLP）任務中扮演著關鍵角色。

---

### 2.2 文本切分（Tokenizing Text）

**文本切分（Tokenization）**是將輸入的文字拆分成較小的單位（稱為 Token），這些單位可以是單詞（word）、子詞（subword）或甚至是單個字母（character）。這一步驟對於 NLP 來說至關重要，因為機器學習模型無法直接處理原始文字，必須先轉換成數字表示。

主要的文本切分方法：

- **基於單詞的切分（Word-based Tokenization）**：依據空格或標點符號來拆分句子，例如：

    \`\`\`plaintext
    句子："機器學習正在改變世界。"
    切分結果：["機器學習", "正在", "改變", "世界", "。"]
    \`\`\`

- **基於子詞的切分（Subword Tokenization）**：透過 BPE（Byte Pair Encoding）或 WordPiece 將詞拆成較小的單位，能夠有效處理未見過的單詞。
- **基於字元的切分（Character Tokenization）**：將每個字視為一個 Token，例如：「機」、「器」、「學」、「習」。

在現代 NLP 模型中，常使用子詞切分來兼顧詞彙覆蓋率與計算效率。

---

### 2.3 將 Token 轉換為 Token ID

文本切分後，模型仍然無法直接處理 Token，必須將其轉換為數值表示，也就是 **Token ID**。這通常透過 **詞彙表（Vocabulary）** 來完成，詞彙表是 Token 與其對應 ID 的映射關係。

範例：

\`\`\`json
{
    "機器學習": 101,
    "正在": 102,
    "改變": 103,
    "世界": 104,
    "。": 105
}
\`\`\`

對應的 Token ID：

\`\`\`plaintext
[101, 102, 103, 104, 105]
\`\`\`

如果某個 Token 不在詞彙表中，則會被映射為 **未知詞（<|unk|>）**，表示模型未曾見過的詞彙。

---

### 2.4 加入特殊標記（Special Context Tokens）

在訓練與推理時，NLP 模型通常需要加入特殊標記來幫助處理輸入文本，例如：

- **\`<|unk|>\`（未知詞）**：表示模型無法識別的詞彙。
- **\`<|endoftext|>\`（文本結束）**：標記文本的結束位置。
- **\`[BOS]\`（句子起始）**：指示序列的開始（Begin of Sequence）。
- **\`[EOS]\`（句子結束）**：指示序列的結束（End of Sequence）。
- **\`[PAD]\`（填充）**：用於將短句補齊到固定長度，確保批量處理時長度一致。

範例：

\`\`\`plaintext
原始句子："機器學習正在改變世界。"
加入特殊標記：["[BOS]", "機器學習", "正在", "改變", "世界", "。", "[EOS]"]
對應的 Token ID：[1, 101, 102, 103, 104, 105, 2]
\`\`\`

這些標記幫助模型正確處理文本序列。

---

### 2.5 Byte Pair Encoding（BPE）

**BPE（Byte Pair Encoding）** 是一種子詞切分技術，主要用來處理未見過的詞彙。它透過統計方法將高頻詞組合併，逐步構建子詞詞彙表。

#### BPE 運作步驟：

1. **初始化**：將所有詞彙拆分成單個字母或字符。
2. **計算頻率**：找出最常見的相鄰字組合。
3. **合併**：將該組合視為新 Token，加入詞彙表。
4. **重複步驟 2-3**，直到達到預設的詞彙表大小。

範例：

\`\`\`plaintext
原始詞彙："機器學習", "機器人", "學校"
初始拆分：["機", "器", "學", "習"], ["機", "器", "人"], ["學", "校"]
合併 "機" 和 "器" → ["機器", "學", "習"], ["機器", "人"], ["學", "校"]
合併 "學" 和 "習" → ["機器", "學習"], ["機器", "人"], ["學", "校"]
\`\`\`

這種方法讓 NLP 模型可以處理詞彙之外的單詞，並減少詞彙表的大小。

---

### 2.6 滑動窗口（Sliding Window）取樣

當文本過長時，NLP 模型通常會使用**滑動窗口（Sliding Window）**來分割輸入，確保模型能夠學習長文本中的語境關係。

#### 主要概念：

- **窗口大小（Window Size）**：每次處理的 Token 數量。
- **步幅（Stride）**：滑動窗口移動的步長，決定下一個窗口與當前窗口的重疊程度。

範例：

\`\`\`plaintext
輸入文本："人工智慧正在改變世界的未來。"
窗口大小：5，步幅：3
分割結果：
1. ["人工", "智慧", "正在", "改變", "世界"]
2. ["正在", "改變", "世界", "的", "未來"]
3. ["世界", "的", "未來", "。"]
\`\`\`

這樣的方式能夠幫助模型捕捉上下文信息，特別是在語言模型的訓練過程中。

---

### 2.7 建立 Token 嵌入（Token Embedding）

當 Token ID 被映射後，它們需要進一步轉換成可學習的數值向量，這稱為 **Token 嵌入（Token Embedding）**。

常見的詞嵌入方法：

- **Word2Vec**
- **FastText**
- **基於 Transformer 的嵌入（如 BERT、GPT）**

範例：

\`\`\`plaintext
Token："人工智慧"
Token ID：201
對應的嵌入向量：[0.21, -0.34, 0.76, ..., 0.89]
\`\`\`

這些嵌入向量捕捉了詞語的語意關係，使模型能夠進一步理解文本。

---

### 2.8 位置編碼（Positional Encoding）

由於 Transformer 模型缺乏內建的順序資訊，通常需要加入 **位置編碼（Positional Encoding）** 來提供單詞的位置信息。

計算公式：

輸入嵌入=Token 嵌入+位置嵌入\text{輸入嵌入} = \text{Token 嵌入} + \text{位置嵌入}

位置嵌入可以是學習到的參數，或是基於 **三角函數（sin、cos）** 的固定函數。

範例：

\`\`\`plaintext
句子："你好 世界"
Token 嵌入：[0.2, 0.5, -0.1], [0.3, -0.2, 0.7]
位置嵌入：[0.1, -0.3, 0.2], [0.4, 0.1, -0.5]
最終輸入嵌入：[0.3, 0.2, 0.1], [0.7, -0.1, 0.2]
\`\`\`

這樣可以幫助模型理解單詞的相對位置。
        `,
        tags: ['NLP', 'Transformer', 'embedding'],
        image: new URL('@/assets/Build_a_Large Language_Model_(From_Scratch).jpg', import.meta.url)
          .href,
      },
      {
        date: '2025-04-01',
        category: '技術分享',
        title: '用 Poetry 管理 Python 專案：從入門到實戰教學',
        content: `
# 🎯 用 Poetry 管理 Python 專案：從入門到實戰教學

Python 專案常常會遇到套件衝突、虛擬環境混亂、\`requirements.txt\` 和 \`setup.py\` 不一致的狀況。這時你可以試試看 **Poetry** — 一個現代化的 Python 專案管理工具，幫你整合依賴管理、打包、虛擬環境與發佈，讓開發流程更清晰穩定。

---

## 🔧 為什麼選擇 Poetry？

| 傳統方式 | Poetry |
|----------|--------|
| \`pip + virtualenv + setup.py + requirements.txt\` | ✅ 統一整合 |
| 虛擬環境需手動建立 | ✅ 自動建立虛擬環境 |
| 無版本鎖定機制 | ✅ 使用 \`poetry.lock\` 可重現環境 |
| 發佈流程繁瑣 | ✅ 一鍵打包發佈 |

---

## 🧪 安裝 Poetry

在終端機輸入：

\`\`\`bash
curl -sSL https://install.python-poetry.org | python3 -
\`\`\`

如果是 Windows 系統，可以使用：
\`\`\`bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
\`\`\`

*如果使用 Microsoft Store 安裝 Python，請將 \`py\` 替換為 \`python\` 。*

安裝完成後請確認：
\`\`\`bash
poetry --version
\`\`\`

如果無法執行 \`poetry\`，請將以下路徑加入你的環境變數：
\`\`\`
$HOME/.local/bin  (Linux/macOS)
%USERPROFILE%\\.poetry\\bin  (Windows)
\`\`\`

---

## 🚀 使用 Poetry 建立專案

\`\`\`bash
poetry new my_project
cd my_project
\`\`\`

這會建立以下結構：

\`\`\`
my_project/
├── my_project/
│   └── __init__.py
├── tests/
│   └── test_my_project.py
├── pyproject.toml  👈 專案設定檔
└── README.rst
\`\`\`

---

## 📦 安裝套件（取代 pip install）

\`\`\`bash
poetry add requests
\`\`\`

會自動修改 \`pyproject.toml\` 並安裝到虛擬環境中。

---

## 🔬 安裝開發用依賴

\`\`\`bash
poetry add --group dev black
poetry add --group test pytest
\`\`\`

這些依賴不會被包含在正式發佈中，只用於開發或測試階段。

---

## 🧪 執行虛擬環境命令

你可以使用 Poetry 的虛擬環境執行指令：

\`\`\`bash
poetry run python script.py
poetry run pytest
\`\`\`

也可以直接進入虛擬環境：

\`\`\`bash
poetry shell
\`\`\`

---

## 🔨 安裝所有依賴

當你 clone 一個 Poetry 專案時，使用以下指令安裝所有套件：

\`\`\`bash
poetry install
\`\`\`

若你只想裝正式依賴（不含測試、開發套件）：

\`\`\`bash
poetry install --no-dev
\`\`\`

或安裝特定群組：

\`\`\`bash
poetry install --with test,docs
\`\`\`

---

## 🧠 處理特殊依賴（如 PyTorch）

某些套件（如 PyTorch）安裝方式會因平台而異，此時**不建議**寫死在 \`pyproject.toml\` 裡。

### 建議作法：

1. 不寫入 \`pyproject.toml\`
2. 在 \`README.md\` 中提示使用者：

\`\`\`bash
poetry run pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
\`\`\`

或者使用 optional group：

\`\`\`bash
poetry add --group torch torch --optional
\`\`\`

---

## 📦 打包與發佈

\`\`\`bash
poetry build
poetry publish
\`\`\`

發佈前請設定 PyPI 帳號：

\`\`\`bash
poetry config pypi-token.pypi your_token
\`\`\`

---

## 🧼 Poetry 的好處總整理

- ✅ 不再需要手動管理虛擬環境
- ✅ 所有依賴集中於 \`pyproject.toml\`
- ✅ 支援分群組管理（正式、開發、測試、文件）
- ✅ 發佈流程簡單安全
- ✅ 重現性強，團隊協作一致性高

---

## 📁 附加：VS Code 與 Poetry 整合

1. 在 VS Code 中打開專案資料夾
2. 按 \`Ctrl+Shift+P\` → \`Python: Select Interpreter\`
3. 選擇 \`.venv\\Scripts\\python.exe\`（或 Poetry 自動建立的環境）
4. 開始開發！

如果 Poetry 虛擬環境沒被偵測，可以執行：
\`\`\`bash
poetry config virtualenvs.in-project true
poetry install
\`\`\`

這樣會讓虛擬環境建立在專案內的 \`.venv/\` 資料夾中。

---

## ✅ 結語

Poetry 是 Python 開發者非常值得學會的工具，它不但減少繁瑣的環境與依賴管理工作，也讓團隊協作、打包與部署更有保障。如果你曾經為 \`pip freeze\`、\`requirements.txt\` 或虛擬環境抓狂，不妨現在就試試 Poetry 吧！
`,
        tags: ['Python', 'Poetry', '開發工具', '套件管理'],
        image: new URL('@/assets/poetry.png', import.meta.url).href,
      },
      {
        date: '2025-04-09',
        category: '技術分享',
        title: 'pinia-plugin-persistedstate 插件介紹',
        content: `
# 📦 \`pinia-plugin-persistedstate\` 插件介紹

---

## 🔰 插件簡介：\`pinia-plugin-persistedstate\`

\`pinia-plugin-persistedstate\` 是一個專為 [Pinia](https://pinia.vuejs.org)（Vue 官方推薦的狀態管理工具）設計的插件，**用來自動將 Pinia 的 store 狀態儲存在瀏覽器的 \`localStorage\` 或 \`sessionStorage\` 中。**

### ⭐ 主要功能：

- 將指定的 Pinia store 自動「持久化」，避免頁面刷新導致資料遺失
- 支援自訂儲存欄位（\`paths\`）、儲存 key 名稱、選擇儲存位置（\`localStorage\` / \`sessionStorage\`）
- 自動同步與還原，無須手動處理儲存與讀取邏輯
- 簡單設定就能達到「資料不會因頁面刷新而消失」

### 📦 安裝方式：

\`\`\`bash
npm install pinia-plugin-persistedstate
\`\`\`

### 🔧 註冊到 Pinia：

\`\`\`js
// main.js / main.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
\`\`\`

### 🧩 基本使用方式：

\`\`\`js
// stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: ''
  }),
  persist: true  // 一行搞定持久化
})
\`\`\`

### 🔧 進階設定（自訂 key、儲存位置、欄位）：

\`\`\`js
persist: {
  key: 'my-user',
  storage: sessionStorage,
  paths: ['token'] // 只儲存 token 欄位
}
\`\`\`

---

## 🤔 為什麼使用這個插件而不是自己操作 \`localStorage\`？

---

### ✅ 1. 自動同步 store 狀態，免除重複樣板程式碼

手動操作 \`localStorage\` 會有一堆重複的儲存、還原、patch 程式碼，而這個 plugin 一行設定就搞定：

\`\`\`js
persist: true
\`\`\`

---

### ✅ 2. 自動還原狀態，搭配反應性沒問題

使用 plugin 時，Pinia store 建立時就會自動讀取已儲存的資料，
**確保與 Vue 元件的 reactivity 正常運作**，不需要額外處理。

---

### ✅ 3. 支援 paths、key、storage 自訂

你可以：

- 只儲存特定欄位（paths）
- 自訂 key 名稱
- 使用 sessionStorage 而不是 localStorage（例如只想記憶登入狀態到關閉頁面）

---

### ✅ 4. 多個 store 可獨立管理

每個 store 都可以設定自己的 persist 行為與儲存 key，
plugin 會自動處理，不怕 key 衝突，也不需要自己手動管理儲存命名。

---

### ✅ 5. 結構乾淨、集中管理、可維護性高

所有資料儲存邏輯都寫在 store 裡，**不會散落在 component 裡到處亂飛**，
可讀性高、邏輯集中、團隊合作維護也比較輕鬆。

---

## 🚪 登出怎麼清除儲存資料？

如果啟用了持久化，登出時除了清空 Pinia 的狀態，也要清掉對應的儲存資料！

範例：

\`\`\`js
const userStore = useUserStore()
userStore.$reset()
localStorage.removeItem('pinia-user') // key 要跟你 persist 設定一致
\`\`\`

或者在 store 裡封裝一個 \`logout()\` action 更優雅：

\`\`\`js
logout() {
  this.$reset()
  localStorage.removeItem('pinia-user')
}
\`\`\`

---

## 🧠 總結一句話：

> **\`pinia-plugin-persistedstate\` = 自動管理 + 不易出錯 + 結構清晰 + 維護容易**

適合用來保存登入狀態、偏好設定、購物車內容等，幾乎是 Vue + Pinia 專案必裝插件！
        `,
        tags: ['Vue', 'Pinia', '狀態管理'],
        image: new URL('@/assets/pinia.jpg', import.meta.url).href,
      },
      {
        date: '2025-04-10',
        category: '學習筆記',
        title: '從頭學會 SSD：Single Shot MultiBox Detector 全流程筆記（含訓練與推論）',
        content: `
> 本篇筆記記錄了我學習並實作 SSD（Single Shot MultiBox Detector）模型的完整過程，從資料準備、模型架構、訓練流程到最終的推論展示，幫助自己也幫助未來有需要的朋友快速上手目標偵測任務！

---

## 📦 什麼是 SSD？

SSD（Single Shot MultiBox Detector）是一種**單階段物件偵測演算法**，一次性完成「邊界框回歸」與「類別預測」，速度快、效能佳，廣泛用於即時應用場景。

---

## 🧱 SSD 的核心模組結構

\`\`\`python
class SSD300(nn.Module):
    def __init__(self, n_classes, device):
        super().__init__()
        self.base = VGGBase()
        self.aux_convs = AuxiliaryConvolutions()
        self.pred_convs = PredictionConvolutions(n_classes)
        self.device = device
        self.priors_cxcy = self.create_prior_boxes().to(device)
\`\`\`

這裡的主要架構分為三部分：

- \`VGGBase\`：基礎特徵提取
- \`AuxiliaryConvolutions\`：增強高層語意特徵
- \`PredictionConvolutions\`：輸出分類與位置預測

---

## 📏 預設框與 Ground Truth 配對

### 每層產生不同比例與大小的 default boxes：

\`\`\`python
s_min, s_max = 0.2, 0.9
L = 6  # 層數
scales = [s_min + (s_max - s_min) * l / (L - 1) for l in range(L)]
aspect_ratios = [1.0, 2.0, 0.5, 3.0, 1.0/3.0]
\`\`\`

### 使用幾何平均計算額外 scale：

\`\`\`python
additional_scale = sqrt(scales[i] * scales[i+1])
\`\`\`

每個預設框與 ground truth 透過 IoU 配對，IoU > 0.5 為正樣本。

---

## 🧮 Loss 計算（MultiBoxLoss）

\`\`\`python
class MultiBoxLoss(nn.Module):
    def forward(self, pred_locs, pred_scores, boxes, labels):
        # 計算分類損失（cross entropy）
        # 計算定位損失（smooth L1）
        # 實作 hard negative mining (1:3 比例)
        ...
        return total_loss
\`\`\`

---

## 📂 資料準備與 Dataset 定義

### 轉換 Label 對應表

\`\`\`python
label2target = {l: i+1 for i, l in enumerate(DF_RAW['LabelName'].unique())}
label2target['background'] = 0
target2label = {v: k for k, v in label2target.items()}
\`\`\`

---

### 定義 Dataset 類別

\`\`\`python
class OpenDataset(torch.utils.data.Dataset):
    def __getitem__(self, ix):
        image_id = self.image_infos[ix]
        img_path = find(image_id, self.files)
        img = Image.open(img_path).convert("RGB")
        img = np.array(img.resize((self.w, self.h))) / 255.

        data = self.df[self.df['ImageID'] == image_id]
        boxes = data[['XMin', 'YMin', 'XMax', 'YMax']].values
        boxes[:, [0, 2]] *= self.w
        boxes[:, [1, 3]] *= self.h
        labels = data['LabelName'].tolist()
        return img, boxes.tolist(), labels
\`\`\`

---

### 自訂 \`collate_fn\` 處理不等長的框

\`\`\`python
def collate_fn(self, batch):
    images, boxes, labels = [], [], []
    for img, bbs, lbls in batch:
        img = preprocess_image(img)[None]
        images.append(img)
        boxes.append(torch.tensor(bbs).float().to(device) / 300)
        labels.append(torch.tensor([label2target[c] for c in lbls]))
    return torch.cat(images).to(device), boxes, labels
\`\`\`

---

## ⚙️ 模型訓練流程

### 定義訓練與驗證步驟：

\`\`\`python
def train_batch(inputs, model, criterion, optimizer):
    model.train()
    images, boxes, labels = inputs
    pred_locs, pred_scores = model(images)
    loss = criterion(pred_locs, pred_scores, boxes, labels)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    return loss
\`\`\`

\`\`\`python
@torch.no_grad()
def validate_batch(inputs, model, criterion):
    model.eval()
    images, boxes, labels = inputs
    pred_locs, pred_scores = model(images)
    loss = criterion(pred_locs, pred_scores, boxes, labels)
    return loss
\`\`\`

---

### 訓練主迴圈：

\`\`\`python
model = SSD300(num_classes, device)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-5)
criterion = MultiBoxLoss(model.priors_cxcy, device=device)

for epoch in range(n_epochs):
    for inputs in train_loader:
        loss = train_batch(inputs, model, criterion, optimizer)
        print(f"Train loss: {loss.item():.4f}")

    for inputs in test_loader:
        val_loss = validate_batch(inputs, model, criterion)
        print(f"Val loss: {val_loss.item():.4f}")
\`\`\`

---

## 🧪 單張圖片推論與顯示

\`\`\`python
bbs, labels, scores = detect(original_image, model,
                             min_score=0.9, max_overlap=0.5, top_k=200, device=device)

labels = [target2label[c.item()] for c in labels]
label_with_conf = [f"{l} @ {s:.2f}" for l, s in zip(labels, scores)]

show(original_image, bbs=bbs, texts=label_with_conf, text_sz=10)
\`\`\`

---

## ✅ 小結與心得

透過完整實作，我理解了：

- SSD 如何設計多尺度 default boxes 來覆蓋各種尺寸與形狀的物體
- 如何進行 IoU 配對與樣本篩選（hard negative mining）
- 搭配 PyTorch 如何從頭撰寫 Dataset、Loss、訓練流程
- 推論階段如何轉換預測為真實框並可視化

---

## 🔮 下一步：學習 Image Segmentation

下一章將進入 **影像分割** 領域，從目標偵測再往 pixel 級的精細區域辨識邁進，並透過 Facebook 的 [Detectron2](https://github.com/facebookresearch/detectron2) 框架實作實戰。

---

📘 **推薦資源：**

- 論文原文：[SSD: Single Shot MultiBox Detector](https://arxiv.org/abs/1512.02325)
- SSD 程式碼倉庫：[github.com/sizhky/ssd-utils](https://github.com/sizhky/ssd-utils)
- 可視化工具：[torch_snippets](https://github.com/sizhky/torch_snippets)
        `,
        tags: ['電腦視覺', '物件偵測', '深度學習'],
        image: new URL('@/assets/ssd.png', import.meta.url).href,
      },
    ],
  }),
  getters: {
    sortedArticles: (state) => {
      return [...state.articles].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    },
  },
})
