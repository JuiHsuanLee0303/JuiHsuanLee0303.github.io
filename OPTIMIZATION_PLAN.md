# Portfolio 優化計畫與執行手冊 — Jui-Hsuan Lee

> 北極星目標：拿到 **AI Engineer / LLM / RAG** 職缺。
> 方向於 2026-07-08 經 `/grill-me` 定案；本文件同時是**追蹤清單**與**可直接照做的執行步驟**。

---

## 一、定案方向（8 項）

| # | 分岔 | 決定 |
|---|------|------|
| 1 | 受眾 | **中英雙語並重** |
| 2 | 美學 | 保留終端機識別、**策略性軟化**（內文對比過 AA、長段中文可讀字體、明確 CTA）|
| 3 | 終端機/動畫 | **維持但凍結**，從 Home 推銷、修掉嚇人 UX |
| 4 | 技能 | **去掉自評 %，證據優先** |
| 5 | 轉換 | **Hero 常駐 CTA + 雙語 CV PDF** |
| 6 | 案例 | 深化 2 旗艦 + 補「作品集/終端機」公開專案 |
| 7 | SEO | **預渲染 SSG + JSON-LD + sitemap + OG + favicon** |
| 8 | i18n | **全對等、路由式 `/zh` `/en` + SSG + hreflang** |

---

## 二、追蹤清單

### P0 — 快速修補（不依賴雙語，先上）✅ 全數完成（分支 `feat/p0-quick-wins`）
- [x] P0-1 移除死篩選「碩士學位論文」（`src/data/ui.json`）— TDD RED→GREEN→refactor
- [x] P0-2 字體精簡 + favicon + OG meta（`index.html`）
- [x] P0-3 建立 `public/favicon.svg`（終端機 `>_`）
- [x] P0-4 建立 `public/og-image.svg` + 已匯出 `og-image.png`（1200×630）
- [x] P0-5 開機動畫可跳過 + 尊重 reduced-motion（`BootAnimation.vue`）— TDD
- [x] P0-6 關機可「Power On」（`ShutdownAnimation.vue`）— TDD
- [x] P0-7 關機前確認（`Navbar.vue`）— TDD
- [x] P0-8 移除技能 % 條 + `div→button` a11y + Hero CTA（`HomePage.vue`）— TDD
- [x] P0-9 內文對比拉高過 AA（Research/Experience 欄位標籤 /50→/70）

> 測試環境：Vitest + @vue/test-utils + jsdom（`npm test`）。P0 共 14 個測試、5 檔，全綠；`npm run build` 通過。
> 已知遺留：`BootAnimation.vue` BIOS 迴圈的 `v-for`+`v-if` 用到 `index`（Vue3 precedence 警告）— 非 P0 範圍，待 P2 清理。
> 尚未做：a11y 對比的自動化檢測（目前靠對比計算 + 人工），可於 P1 加 axe/E2E。

### P1 — 雙語 + 可發現性地基
- [ ] 資料層雙語模型（`home/common/experience/research` JSON + Markdown）
- [ ] `vue-i18n` + 路由式 `/zh` `/en`（語言偵測 + localStorage 記憶）
- [ ] `vite-ssg` 預渲染兩語言 + 每頁雙語 `<title>`/`description`/OG + `hreflang`
- [ ] JSON-LD `Person` + `sitemap.xml` + `robots.txt`
- [ ] 中英雙語 CV PDF，接上 Hero「下載 CV」
- [ ] 核心頁英文（Home / Experience / Research）；技能「證據優先」雙語定稿

### P2 — 深度 & 打磨
- [ ] 2 案例加架構圖 / 量化成效；新增「作品集+終端機」公開專案（GitHub + live）
- [ ] 新增 Education 區塊
- [ ] Home 明確推銷終端機（一句話 + 引導點擊）
- [ ] 長段中文換可讀字體（策略性軟化收尾）
- [ ] Notes 英文分批補齊

---

## 三、P0 執行步驟（可直接照做）

### P0-1 移除死篩選 — `src/data/ui.json`
`researchFilters` 移除 `thesis` 項（沒有對應資料，點了會出現空清單）：
```json
  "researchFilters": [
    { "label": "全部", "value": "all" },
    { "label": "2025", "value": "2025" },
    { "label": "2024", "value": "2024" },
    { "label": "會議論文", "value": "conference" }
  ],
```
（可選清理：`src/views/ResearchPage.vue` 內 `filteredPublications` 的 `activeFilter === 'thesis'` 分支變成死碼，可一併刪除，不刪也無害。）

### P0-2 字體精簡 + favicon + OG — `index.html`
**favicon**：`href="/vite.svg"` → `href="/favicon.svg"`
**字體**（原本載 Fira Code + JetBrains Mono 各 5 字重 = 10 個，改成只載 Fira Code 實際用到的）：
```html
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet">
```
**OG/Twitter**：在 `og:locale` 那行後面加、並把 `twitter:card` 改成大圖：
```html
<meta property="og:url" content="https://juihsuanlee0303.github.io/" />
<meta property="og:image" content="https://juihsuanlee0303.github.io/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://juihsuanlee0303.github.io/og-image.png" />
```
> ⚠️ LinkedIn/Twitter/Slack **不吃 SVG OG 圖**，一定要有 `og-image.png`。PNG 未就緒前，先把上面兩個 image 網址暫時指向 `/og-image.svg` 以免 404。

### P0-3 建立 `public/favicon.svg`（終端機 `>_` 圖示）
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Terminal">
  <rect width="64" height="64" rx="12" fill="#000000"/>
  <g fill="none" stroke="#00ff00" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21 L28 32 L17 43"/>
    <path d="M34 44 H49"/>
  </g>
</svg>
```

### P0-4 建立 `public/og-image.svg`（分享大圖，之後匯出 PNG 1200×630）
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <defs>
    <pattern id="g" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="#00ff00" stroke-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="#000" fill-opacity="0.5"
        stroke="#00ff00" stroke-opacity="0.3"/>
  <g font-family="'Fira Code','JetBrains Mono',monospace" fill="#00ff00">
    <text x="90" y="150" font-size="30" fill-opacity="0.7">$ whoami</text>
    <text x="90" y="270" font-size="86" font-weight="700">Jui-Hsuan Lee</text>
    <text x="90" y="338" font-size="38" fill-opacity="0.85">李睿軒 · AI Engineer</text>
    <text x="90" y="418" font-size="29" fill-opacity="0.6">LLM / RAG / AI Agent · Enterprise AI Integration</text>
    <text x="90" y="540" font-size="26" fill-opacity="0.45">juihsuanlee0303.github.io</text>
  </g>
</svg>
```
匯出 PNG（擇一）：`npx -y sharp-cli -i public/og-image.svg -o public/og-image.png resize 1200 630`，或用 Figma/線上工具轉。

### P0-5 開機動畫可跳過 — `src/components/BootAnimation.vue`
**template**：在「完成訊息」那個 `</div>` 之後、根 `fixed` 容器結束前，加一顆跳過鈕：
```html
      <button
        type="button"
        @click="skip"
        class="absolute bottom-6 right-6 rounded-lg border border-terminal-green/40 bg-black/60 px-4 py-2 text-xs text-terminal-green/80 hover:border-terminal-green hover:text-terminal-green"
      >
        跳過開機動畫 [Enter]
      </button>
```
**script**：把最後的 `onMounted`/`onUnmounted` 換成：
```js
const finish = () => {
  clearAllTimers()
  isVisible.value = false
  props.onComplete()
}
const skip = () => finish()
const handleKeydown = (event) => {
  if (event.key === 'Enter' || event.key === 'Escape') skip()
}

onMounted(() => {
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) { finish(); return }          // 尊重減少動態偏好，直接進站
  window.addEventListener('keydown', handleKeydown)
  startStage1()
})
onUnmounted(() => {
  clearAllTimers()
  window.removeEventListener('keydown', handleKeydown)
})
```

### P0-6 關機可 Power On — `src/components/ShutdownAnimation.vue`
**template**：把 `Please refresh the page to restart.` 那個 `<div v-if="stage >= 6">` 換成：
```html
          <div v-if="stage >= 6" class="mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              @click="powerOn"
              class="rounded-lg border border-terminal-green/50 bg-terminal-green/10 px-5 py-2 text-terminal-green hover:bg-terminal-green/20"
            >
              ⏻ Power On
            </button>
            <span class="text-terminal-green/40 text-xs">或重新整理頁面以重新啟動</span>
          </div>
```
**script**：在 `const stage = ref(0)` 之後加：
```js
const powerOn = () => window.location.reload()
```

### P0-7 關機前確認 — `src/components/Navbar.vue`
把 `handleShutdown` 換成：
```js
const handleShutdown = () => {
    const confirmed = window.confirm('要關閉這個「系統」嗎？會播放關機動畫，可再開機。')
    if (!confirmed) return
    if (shutdown) shutdown()
    isMobileMenuOpen.value = false
}
```

### P0-8 技能 % 移除 + a11y + Hero CTA — `src/views/HomePage.vue`
**(a) 移除自評 % 條**：刪掉技能卡片內 `<div class="mt-4 space-y-2">` 這整塊（`v-for="level in skill.skillLevels"` … 到對應 `</div>`，含進度條與 `{{ level.level }}%`）。保留上方 technologies 清單。
**(b) a11y**：把 technologies 的外層 `<div ... @click>` 改成 `<button type="button">`，並補鍵盤 focus 的 tooltip（`<div>` tooltip 子元素改 `<span>` 以符合 button 內容模型）：
```html
              <button
                v-for="tech in skill.technologies"
                :key="tech.name"
                type="button"
                class="block w-full text-left text-terminal-green/75 text-xs relative group cursor-pointer"
                @mouseenter="hoveredItem = { type: 'tech', name: tech.name, experience: tech.experience }"
                @mouseleave="hoveredItem = null"
                @focus="hoveredItem = { type: 'tech', name: tech.name, experience: tech.experience }"
                @blur="hoveredItem = null"
                @click="toggleItemDetail({ type: 'tech', name: tech.name, experience: tech.experience })"
              >
                - {{ tech.name }}
                <span
                  v-if="hoveredItem && hoveredItem.type === 'tech' && hoveredItem.name === tech.name"
                  class="experience-tooltip"
                >
                  <span class="block text-terminal-green text-xs p-2">{{ tech.experience }}</span>
                </span>
              </button>
```
**(c) Hero CTA**：在 hero 右側面板 `quickStats` grid 的 `</div>` 之後、`</aside>` 之前插入（`personalInfo` 已 import）：
```html
          <div class="mt-6 flex flex-wrap gap-3">
            <a :href="`mailto:${personalInfo.email}`"
               class="inline-flex items-center gap-2 rounded-xl border border-terminal-green/60 bg-terminal-green/15 px-4 py-2 text-sm font-semibold text-terminal-green hover:bg-terminal-green/25">
              ✉ 聯絡我
            </a>
            <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 rounded-xl border border-terminal-green/25 px-4 py-2 text-sm text-terminal-green/85 hover:border-terminal-green/60 hover:text-terminal-green">
              LinkedIn
            </a>
            <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 rounded-xl border border-terminal-green/25 px-4 py-2 text-sm text-terminal-green/85 hover:border-terminal-green/60 hover:text-terminal-green">
              GitHub
            </a>
          </div>
```
（P1 產出 CV PDF 後，於此列首加「⬇ 下載 CV」按鈕指向 `/cv/jui-hsuan-lee-cv.pdf`。）

### P0-9 對比 pass（全站）
長段內文避免透明度低於 `/70`。把段落/說明文字的 `text-terminal-green/45`、`/50`、`/60` 提升到 `/70`~`/80`（純標籤、次要註記可留較低）。重點檔：`HomePage.vue`、`ResearchPage.vue`、`ExperiencePage.vue`、`NotesPage.vue`。建議把常用色階抽成 CSS 變數/utility，之後好統一維護。

**P0 驗收**：`npm run build` 通過；首訪可跳過開機；點 Shutdown 先確認、關機後可 Power On；Research 篩選無空選項；Home 無 % 條、CTA 可見、技能項可鍵盤聚焦；分享 meta 指向 og-image、favicon 為終端機圖。

---

## 四、P1 / P2 需要你提供的輸入
- **CV 內容**：既有？或授權我用站上資料生成中英雙語 PDF 草稿。
- **英文語氣**：沿用現有中文語氣直譯，或更精簡專業（influences 全站英文文案）。
- **個人照片**：是否放（`src/assets/avatar.png` 目前**未被任何程式碼引用**）。
- **企業案例可公開素材**：Anselm AI / Agile PLM MCP 的可公開量化數據、架構圖（P2 深化用）。

## 五、備忘
- `.DS_Store` 已被 `.gitignore` 涵蓋、且未被 git 追蹤（衛生無須處理）。
- `prefers-reduced-motion` 全域已處理（`src/style.css`）— 保留。
- 決策已存入 agent memory：`portfolio-optimization-direction`。
