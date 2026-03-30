const W=`---
title: Everything Claude Code：把 Claude Code 變成流程化開發系統
date: 2026-03-29
updated: 2026-03-30
excerpt: 重新整理 Everything Claude Code 這個 Claude Code plugin：它在做什麼、怎麼安裝，以及我自己會怎麼把它放進規劃、開發、review 與驗證流程裡。
tags:
  - Claude Code
  - Plugin
  - Workflow
  - AI Agent
cover: ./ecc-workflow-map.svg
---

# Everything Claude Code：把 Claude Code 變成流程化開發系統

最近在看 [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) 這個 repo，我覺得它不是那種「多收幾個 prompt、湊成一包資源」的專案，而是比較接近一套完整的 Claude Code 開發工作流。

如果要先用一句話介紹它，我會這樣說：

> Everything Claude Code 是一個把 agents、commands、skills、rules、hooks 與 memory workflow 打包起來的 Claude Code plugin，目標是讓 AI coding 從一次性聊天，變成比較有方法的開發流程。

這篇我想分兩部分寫：

1. 它到底在幹嘛？怎麼安裝？
2. 如果是我自己，我會怎麼把它放進日常開發裡？

## 這個 Claude Code plugin 在做什麼？

官方 README 現在把它定位成一個 **AI agent harness performance system**。我覺得這個說法很貼切，因為它解決的不是單一痛點，而是整條開發鏈的幾個常見問題：

- 每次都要重新說明工作方式
- 模型太快開始動手，沒有先規劃
- 寫完之後沒有固定 review 與驗證節點
- session 結束後，有價值的模式沒有留下來

所以 Everything Claude Code 裡面最重要的幾個組件其實是這些：

- \`agents\`
  像 \`planner\`、\`tdd-guide\`、\`code-reviewer\`、\`security-reviewer\` 這類專門分工的子代理
- \`commands\`
  用 \`/plan\`、\`/tdd\`、\`/code-review\` 這些入口快速啟動一段流程
- \`skills\`
  把特定工作方法整理成可重用的 workflow
- \`rules\`
  放一些固定要遵守的工程習慣
- \`hooks\`
  讓某些檢查或記憶流程在對的時機自動觸發

換句話說，它不是只想讓 Claude Code「知道更多」，而是想讓 Claude Code「做事更有章法」。

## 我會怎麼理解它的核心價值？

![Everything Claude Code workflow map](./ecc-workflow-map.svg)

我自己看完之後，最直接的理解是：

**它想把 AI coding 這件事，變成 plan -> tdd -> review -> verify -> learn 的固定節奏。**

這個順序其實很重要，因為很多人用 AI coding tool 會卡住，不是因為模型太弱，而是因為流程太鬆散。

例如：

- 一開始沒先定義需求就直接改檔
- 改完沒有測
- 寫完沒有 review
- 交付前沒有完整驗證
- 每次 session 的有效經驗都散掉

ECC 想處理的，就是這些流程面的斷點。

## 如何安裝 Everything Claude Code？

目前我看到它主要有兩種安裝思路。

### 1. 透過 plugin marketplace 安裝

這是 README 裡最直接的方式：

\`\`\`bash
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
\`\`\`

這種方式的好處是：

- 上手快
- 能直接先完整體驗整套 plugin
- 不用自己一個個搬 agents / commands / skills

如果只是想先試，這通常是最合理的起點。

### 2. 手動安裝需要的元件

README 與 OpenCodeDocs 也都提到，你可以 clone repo 後手動安裝：

\`\`\`bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
npm install
./install.sh --profile full
\`\`\`

或是只安裝特定語言：

\`\`\`bash
./install.sh typescript
./install.sh python
./install.sh golang
\`\`\`

這種方式比較適合：

- 已經有自己的設定，不想整包覆蓋
- 只想挑部分語言規則或某些 workflow
- 想精細控制裝進去的東西

## 安裝時我會注意什麼？

我覺得有兩個點很值得先知道。

### 1. rules 不是完全自動跟著 plugin 一起進來

README 有特別提醒，Claude Code plugin 並不能把 \`rules\` 全自動分發，所以很多情況下還是要照文件把 rules 安裝好。這代表你不能只看到 plugin 裝好了，就以為整套 workflow 已經完整生效。

### 2. 不一定要全裝

OpenCodeDocs 的安裝說明其實也強調得很清楚：如果你有自己的工作流，不一定需要整套照搬。先裝主要入口，再慢慢加上你真的會用到的規則、命令與 hooks，通常會比一開始全開來得穩。

這也是我比較認同的用法。這類工具的價值不在於「功能越多越好」，而在於你有沒有把它調成真的符合自己節奏。

## 如果是我，我會怎麼用 Everything Claude Code？

這裡是我覺得最重要的部分。

如果把 ECC 當成「裝了就會變強」的外掛，其實很容易失望。因為它不是魔法，而是一套 workflow scaffolding。真正的差別，在於你怎麼把它放進自己的日常開發步驟。

如果是我自己，我會這樣用。

## 1. 複雜需求一定先走 \`/plan\`

只要是下面這種情境，我都會先走 planning：

- 新功能跨很多檔案
- 需求還有模糊地帶
- 改動會碰到架構或資料流
- 想先確認風險與 phase 切法

因為 AI 很擅長直接開始做，但不一定擅長先停下來想。ECC 把 \`/plan\` 做成標準入口，剛好能壓住這個問題。

對我來說，它最有價值的不是「產出一份漂亮計畫」，而是強迫先建立共同理解。

## 2. 進入實作時，用 \`/tdd\` 當護欄

我不一定每個小修都會完整 TDD，但只要是：

- 會影響行為
- 會改到核心邏輯
- 未來容易回歸出錯

我就會傾向讓 TDD 先進場。

因為 AI 在「快速補一段看似合理的程式」這件事上很強，但在「對自己的輸出保持約束」這件事上沒那麼自然。TDD 對我來說就是把約束提前。

## 3. 寫完先 review，不等最後

這是我覺得 ECC 很值得借鏡的一點。

以前很多人會把 review 放到最後，甚至等到準備 commit 才看。但如果是 AI 參與比較多的開發，我反而會想把 review 拉前面。

我會把這幾種情況視為立刻 review 的時機：

- 一段功能剛完成
- 一輪重構剛結束
- 剛修完一個 tricky bug
- 剛碰過比較敏感的資料流或安全邊界

這時候用 \`code-reviewer\` 或 \`security-reviewer\` 類型的角色，比最後一次總檢查更有效，因為上下文還在，修正成本也比較低。

## 4. 交付前一定跑 verification

如果只讓 AI 幫忙寫，不把 verification 做成固定步驟，最後很容易變成：

- 功能看起來做完了
- 但不敢 merge
- 還是要自己手動把 build、type、lint、test 全翻一輪

ECC 裡的 verification loop 對我來說就是一個很好的提醒：

**完成，不等於 ready。**

所以如果是我，我會把 verification 當成「是否進 PR」的門檻，而不是可有可無的收尾。

## 5. hooks 和 learning 我會慢慢加，不會一開始全開

我其實不會建議一開始就把所有 hooks 與自動學習類能力全部打開。

原因很簡單：

- 先看哪些提醒真的有用
- 先確定不會干擾原本工作流
- 先建立對工具行為的信任

如果一開始什麼都自動化，反而很難知道哪個環節真正幫到你，哪個只是增加噪音。

所以我自己的做法會是：

1. 先用 \`/plan\`、\`/tdd\`、\`/code-review\` 這種明確入口
2. 再補 verification
3. 最後才慢慢加 hooks、memory persistence、continuous learning

這樣比較像是在培養一套穩定工作方式，而不是一次塞進太多功能。

## 我會把 ECC 當成什麼？

如果要很直白地講，我不會把它當成「神奇外掛」，我會把它當成：

**一套替 Claude Code 補上工程習慣的 workflow plugin。**

它最有價值的地方不在於數量，而在於它讓下面這些習慣更容易被執行：

- 先規劃
- 再實作
- 中途 review
- 完成後驗證
- 把經驗留下來

這些事情本來就重要，只是人有時候會忘、會懶、會跳步。ECC 做的事情，就是把這些習慣變成比較容易重複執行的預設流程。

## 我的結論

如果你本來就常用 Claude Code，而且已經開始覺得「單次對話式開發不太夠」，那 Everything Claude Code 很值得看。

不是因為它功能最多，而是因為它把一套比較成熟的 AI 開發節奏整理出來了。

對我來說，最值得學的不是某一條 prompt，而是這個順序：

**plan -> tdd -> review -> verify -> learn**

如果能把這條主線真的放進自己的日常開發裡，就算沒有整包照抄 ECC，價值也已經出來了。

## 延伸閱讀

- [官方 GitHub README](https://github.com/affaan-m/everything-claude-code)
- [OpenCodeDocs：Quick Start](https://lzw.me/docs/opencodedocs/affaan-m/everything-claude-code/start/quickstart/)
- [OpenCodeDocs：Installation](https://opencodedocs.com/zh/affaan-m/everything-claude-code/start/installation/)
- [外部整理文](https://inf.news/en/tech/58f59383ab1c884b15cb1edfa32e674e.html)

## 附件

- [下載本文流程摘要](./ecc-workflow-checklist.txt)
`,z=`---
title: gstack：一人 AI Agent 公司
date: 2026-03-30
updated: 2026-03-30
excerpt: 這篇先整理 gstack 這個 Claude Code skill pack / plugin 在做什麼、怎麼安裝，再參考別人的使用方法，最後寫我自己怎麼看這套 workflow。
tags:
  - Claude Code
  - gstack
  - Workflow
  - AI Agent
cover: ./gstack-cover.svg
---

# gstack：一人 AI Agent 公司

最近我又看了一套很有代表性的 Claude Code workflow 工具：[gstack](https://github.com/garrytan/gstack)。

如果說前面那篇寫的 Everything Claude Code 比較像大型 workflow system，那 gstack 給我的感覺更像一套非常強勢、很有「操作方法論」的 skill pack。它不是要你自由組合，而是直接告訴你一條更像真正軟體團隊的工作順序。

這篇我想照下面這個順序寫：

1. gstack 是在幹嘛？
2. 怎麼安裝？
3. 別人都怎麼用？
4. 如果是我，我會怎麼用它？

## gstack 在做什麼？

如果先不管行銷語氣，我會把 gstack 理解成：

**一套把 Claude Code 拆成多個明確角色與工作階段的 skill pack。**

它最核心的說法是：Claude Code 預設只有一種模糊模式，規劃、實作、review、測試、出貨全部混在一起，所以品質容易不穩。gstack 的做法就是把這些事情明確拆開。

像 README 裡最常被拿出來講的 skill 有：

- \`/office-hours\`
- \`/plan-ceo-review\`
- \`/plan-eng-review\`
- \`/review\`
- \`/qa\`
- \`/ship\`

如果只看這幾個名字，大概就能感受到它想模擬的是什麼：

- 有人先幫你想產品問題值不值得做
- 有人幫你看架構
- 有人幫你 code review
- 有人進瀏覽器測
- 最後有人幫你送出 PR

它不是把 Claude Code 當單一助理，而是把它變成一個「虛擬開發團隊」。

## 它跟一般 prompt collection 最大的不同是什麼？

我覺得 gstack 最不一樣的地方，不是 skill 數量，而是它很強調 workflow order。

README 裡直接把 sprint 寫成：

**Think -> Plan -> Build -> Review -> Test -> Ship -> Reflect**

這一點很關鍵。很多 skill pack 其實只是把幾個有用 prompt 收在一起，但 gstack 比較像在說：

> 不是只有工具要完整，連做事順序也要固定下來。

這也是為什麼它會先推 \`/office-hours\`，而不是一開始就叫你寫 code。

## 怎麼安裝 gstack？

以 README 現在的寫法來看，最直接的方式是 clone 之後執行 setup。

### 安裝到自己的 Claude Code 環境

README 裡給的主要安裝方式是：

\`\`\`bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
\`\`\`

做完之後，還要在 \`CLAUDE.md\` 裡補一段 gstack 區塊，讓 Claude 知道有哪些 skills 可以用，還有指定網頁瀏覽時優先走 gstack 的 \`/browse\`。

### 加到目前專案，讓隊友也能一起用

README 也提供另一種做法，就是把 gstack 直接放進專案內的 \`.claude/skills/gstack\`：

\`\`\`bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
rm -rf .claude/skills/gstack/.git
cd .claude/skills/gstack && ./setup
\`\`\`

這種方式的優點是：

- 專案 clone 下來就有同樣的 skills
- 團隊比較容易共享同一套 workflow
- 不會只存在某一個人的本機環境

### 也支援其他 agent host

README 還有提到 Codex、Gemini CLI、Cursor 與 Factory Droid 的安裝方式，像 Codex 的做法是：

\`\`\`bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
\`\`\`

這點我覺得很實際，因為現在很多人不是只用 Claude Code 一種工具。gstack 顯然也在把自己定位成一套跨 agent host 的 workflow。

## 別人怎麼用 gstack？

這次我不是只看 README，也先看了幾個外部介紹，想確認別人是怎麼理解這套東西的。

我主要參考了：

1. [gstack GitHub README](https://github.com/garrytan/gstack)
2. [gstack 官方說明頁](https://gstacks.org/)
3. [Agent Air Force 的 gstack field guide](https://agentairforce.com/osint/gstack/)

這幾個來源雖然語氣不同，但有幾個共同重點很一致。

## 1. 很多人會把它當成「把 Claude Code 切成多種認知模式」

這點在 Agent Air Force 的介紹裡很明顯。它不是把 gstack 當技能列表，而是把它看成一套認知分工系統。

意思是：

- 想產品方向時，不要同時做 release 決策
- review 時，不要順手就幫自己 shipping
- ship 時，不要又回頭爭論產品定義

我覺得這個觀點很有意思。它不是在讓 AI 變「更萬能」，而是在阻止 AI 一次做太多不同性質的事。

## 2. 很多介紹都強調 \`/office-hours -> /plan -> /review -> /qa -> /ship\` 這條線

不管是 README 還是官方頁，最常被示範的用法都很像：

1. 先用 \`/office-hours\` 釐清你到底要解決什麼問題
2. 再用產品或工程 review 技能收斂計畫
3. 接著實作
4. 用 \`/review\` 抓 production 級 bug
5. 用 \`/qa\` 實際在瀏覽器裡測
6. 最後再 \`/ship\`

這跟一般人對 Claude Code 的直覺用法很不一樣。一般人常常是直接說「幫我做一個功能」，但 gstack 的節奏是先把問題重新定義。

## 3. \`/qa\` 和 \`/browse\` 幾乎是每篇介紹都會提的亮點

官方網站跟 README 都很強調這一點：gstack 不只是 Markdown 指令包，它的 \`/browse\`、\`/qa\` 背後還有實際的 browser automation runtime。

很多介紹會把這個能力當成它最有感的地方，因為這代表：

- agent 不是只看文字
- 它能真的進瀏覽器點頁面
- 可以測真實 flow
- 有些 bug 不用等人手動重現才知道

這個方向我很認同，因為只靠 code diff 或單元測試，常常抓不到 UI flow 的問題。

## 4. gstack 的語氣很像「你不是在用 copilot，而是在帶一個虛擬團隊」

這是我覺得它最鮮明的地方。

官方 README 一直反覆強調：

- CEO
- eng manager
- reviewer
- QA lead
- release engineer

有些人可能會覺得這種語氣有點滿，但我覺得它其實有個實際作用：它在強迫使用者切換工作心態。

當你輸入 \`/review\`，你就不是在「請 AI 幫忙看看」，而是在進入一個特定角色。

這種角色切分，本身就是它 workflow 的核心。

## 那我自己怎麼看 gstack？

如果直接講結論，我會說：

**gstack 很有個性，而且很適合拿來矯正「AI 直接亂衝」這件事。**

它不一定適合所有人，但對某些情境會非常有用。

## 我喜歡它的地方

### 1. 它很敢幫你先停下來

這其實很重要。

大部分人用 AI coding assistant 最容易出現的問題，就是太快往 implementation 跑。gstack 用 \`/office-hours\` 和幾個 plan review 類 skill，把「先重新想問題」這件事放在最前面。

如果我是做新產品、MVP、功能探索，我會覺得這很有價值。

### 2. 它把 review 與 QA 放得很重

這是另一個我很認同的地方。很多 AI workflow 都在強調「怎麼更快生成」，但 gstack 很明顯更在意：

- 這東西是否夠完整
- 有沒有 production 風險
- UI flow 到底有沒有真的能跑

這種取向比較像真正在做產品，而不是只在追求 demo velocity。

### 3. 它的角色邊界很清楚

我覺得這會讓品質比較穩。

一個工具如果同時要你規劃、實作、review、測試、發版，通常最後每件事都做一點，但都不夠深。gstack 則是刻意把模式切開，這其實是它最大的優勢。

## 我會怎麼使用 gstack？

如果是我自己，我不會一開始就把每一個 skill 全部用起來。我會這樣分階段。

### 第一階段：先把最核心的流程用起來

我會先只用這幾個：

- \`/office-hours\`
- \`/plan-eng-review\`
- \`/review\`
- \`/qa\`
- \`/ship\`

原因很簡單，這條線已經足夠代表它的核心方法：

- 先想問題
- 再收斂技術方案
- 做完後 review
- 用真瀏覽器驗證
- 最後再送出

### 第二階段：產品方向不明時，再用 CEO / design review 類 skill

如果我今天是在做：

- 新產品原型
- 還不清楚真正 wedge 是什麼
- UI / product direction 還在找

那 \`/plan-ceo-review\`、\`/plan-design-review\` 這類技能就會很有價值。

但如果只是單純修 API bug，這些 skill 反而太重。

### 第三階段：把它當流程，而不是功能表

這是我覺得最重要的用法。

如果只是偶爾想起來才用一個 \`/review\`，那 gstack 只是多了一個命令而已。真正有價值的用法，是把它當工作節奏：

1. 問題先經過 \`/office-hours\`
2. 計畫先經過 review
3. 程式寫完先過 \`/review\`
4. 上線前一定過 \`/qa\`
5. 最後才 \`/ship\`

只要這條順序真的建立起來，它就不只是技能包，而會變成一套做事方式。

## 我自己的最後看法

如果你希望 Claude Code 更自由、更像一個隨叫隨到的搭檔，那 gstack 可能會讓你覺得有點太強勢。

但如果你剛好遇到的痛點是：

- AI 很容易直接做錯方向
- 需求思考不夠深
- review 不夠穩
- UI flow 常常最後才發現問題

那 gstack 很值得試。

對我來說，它最有價值的不是「有很多 skill」，而是它很明確地告訴你：

**AI 開發不只是在寫 code，而是在跑一條完整的產品與工程流程。**

這也是我覺得它最值得借鏡的地方。

## 延伸閱讀

- [gstack GitHub README](https://github.com/garrytan/gstack)
- [gstack 官方說明頁](https://gstacks.org/)
- [Agent Air Force：gstack Field Guide](https://agentairforce.com/osint/gstack/)

## 附件

- [下載本文使用摘要](./gstack-notes.txt)
`,D="data:text/plain;base64,RXZlcnl0aGluZyBDbGF1ZGUgQ29kZSB3b3JrZmxvdyBub3Rlcwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CgoxLiBQbGFuIGJlZm9yZSBleGVjdXRpb24KMi4gVXNlIFRERCB0byBjb25zdHJhaW4gaW1wbGVtZW50YXRpb24KMy4gUnVuIHJldmlldyBhZ2VudHMgZWFybHksIG5vdCBvbmx5IGF0IHRoZSBlbmQKNC4gVHJlYXQgdmVyaWZpY2F0aW9uIGFzIGEgcXVhbGl0eSBnYXRlCjUuIFVzZSBob29rcyBhbmQgbWVtb3J5IHRvIHR1cm4gb25lIHNlc3Npb24gaW50byByZXVzYWJsZSBrbm93bGVkZ2UK",E="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjAwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3MjAiIHJ4PSIzNiIgZmlsbD0iIzA0MTEwNCIvPgogIDxyZWN0IHg9IjQ0IiB5PSI0NCIgd2lkdGg9IjExMTIiIGhlaWdodD0iNjMyIiByeD0iMjgiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMjQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9Ijg4IiB5PSIxMTgiIGZpbGw9IiNBOEZGQTgiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMzQiPkVDQyBXb3JrZmxvdzwvdGV4dD4KICA8dGV4dCB4PSI4OCIgeT0iMTU2IiBmaWxsPSIjNkRFQjZEIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjIyIj5mcm9tIHBsYW5uaW5nIHRvIHJldXNhYmxlIGxlYXJuaW5nPC90ZXh0PgoKICA8cmVjdCB4PSI5MiIgeT0iMjcwIiB3aWR0aD0iMTcwIiBoZWlnaHQ9IjE4MCIgcng9IjI0IiBmaWxsPSIjMDkxNzA5IiBzdHJva2U9IiMyNEZGNjYiIHN0cm9rZS1vcGFjaXR5PSIwLjE2Ii8+CiAgPHJlY3QgeD0iMzA4IiB5PSIyNzAiIHdpZHRoPSIxNzAiIGhlaWdodD0iMTgwIiByeD0iMjQiIGZpbGw9IiMwOTE3MDkiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiLz4KICA8cmVjdCB4PSI1MjQiIHk9IjI3MCIgd2lkdGg9IjE3MCIgaGVpZ2h0PSIxODAiIHJ4PSIyNCIgZmlsbD0iIzA5MTcwOSIgc3Ryb2tlPSIjMjRGRjY2IiBzdHJva2Utb3BhY2l0eT0iMC4xNiIvPgogIDxyZWN0IHg9Ijc0MCIgeT0iMjcwIiB3aWR0aD0iMTcwIiBoZWlnaHQ9IjE4MCIgcng9IjI0IiBmaWxsPSIjMDkxNzA5IiBzdHJva2U9IiMyNEZGNjYiIHN0cm9rZS1vcGFjaXR5PSIwLjE2Ii8+CiAgPHJlY3QgeD0iOTU2IiB5PSIyNzAiIHdpZHRoPSIxNzAiIGhlaWdodD0iMTgwIiByeD0iMjQiIGZpbGw9IiMwOTE3MDkiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiLz4KCiAgPHRleHQgeD0iMTM2IiB5PSIzNzAiIGZpbGw9IiMzOUZGMTQiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjgiPlBsYW48L3RleHQ+CiAgPHRleHQgeD0iMzYyIiB5PSIzNzAiIGZpbGw9IiMzOUZGMTQiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjgiPlRERDwvdGV4dD4KICA8dGV4dCB4PSI1NTgiIHk9IjM3MCIgZmlsbD0iIzM5RkYxNCIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIyOCI+UmV2aWV3PC90ZXh0PgogIDx0ZXh0IHg9Ijc3MCIgeT0iMzcwIiBmaWxsPSIjMzlGRjE0IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjI4Ij5WZXJpZnk8L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMzcwIiBmaWxsPSIjMzlGRjE0IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjI4Ij5MZWFybjwvdGV4dD4KCiAgPHBhdGggZD0iTTI2MiAzNjBIMzA4IiBzdHJva2U9IiMzOUZGMTQiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMCAxMCIvPgogIDxwYXRoIGQ9Ik00NzggMzYwSDUyNCIgc3Ryb2tlPSIjMzlGRjE0IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiLz4KICA8cGF0aCBkPSJNNjk0IDM2MEg3NDAiIHN0cm9rZT0iIzM5RkYxNCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjEwIDEwIi8+CiAgPHBhdGggZD0iTTkxMCAzNjBIOTU2IiBzdHJva2U9IiMzOUZGMTQiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMCAxMCIvPgoKICA8cmVjdCB4PSI5MiIgeT0iNTIwIiB3aWR0aD0iMTAzNCIgaGVpZ2h0PSI5OCIgcng9IjI0IiBmaWxsPSIjMEExQTBBIi8+CiAgPHRleHQgeD0iMTI4IiB5PSI1ODAiIGZpbGw9IiNEOEZGRDgiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjQiPndvcmtmbG93IGRlZmF1bHRzIG1hdHRlciBtb3JlIHRoYW4gb25lLW9mZiBwcm9tcHRzPC90ZXh0Pgo8L3N2Zz4K",S="/assets/index-rM8bOQ4B.md",Q="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjAwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3MjAiIHJ4PSIzNiIgZmlsbD0iIzA0MTEwNCIvPgogIDxyZWN0IHg9IjQ0IiB5PSI0NCIgd2lkdGg9IjExMTIiIGhlaWdodD0iNjMyIiByeD0iMjgiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMjQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9Ijg4IiB5PSIxMTgiIGZpbGw9IiNBOEZGQTgiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMzQiPmdzdGFjazwvdGV4dD4KICA8dGV4dCB4PSI4OCIgeT0iMTU2IiBmaWxsPSIjNkRFQjZEIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjIyIj53b3JrZmxvdyBza2lsbHMgZm9yIHBsYW5uaW5nLCByZXZpZXcsIFFBLCBhbmQgc2hpcHBpbmc8L3RleHQ+CgogIDxyZWN0IHg9IjkyIiB5PSIyNTIiIHdpZHRoPSIxOTQiIGhlaWdodD0iMTkwIiByeD0iMjQiIGZpbGw9IiMwOTE3MDkiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiLz4KICA8cmVjdCB4PSIzMjAiIHk9IjI1MiIgd2lkdGg9IjE5NCIgaGVpZ2h0PSIxOTAiIHJ4PSIyNCIgZmlsbD0iIzA5MTcwOSIgc3Ryb2tlPSIjMjRGRjY2IiBzdHJva2Utb3BhY2l0eT0iMC4xNiIvPgogIDxyZWN0IHg9IjU0OCIgeT0iMjUyIiB3aWR0aD0iMTk0IiBoZWlnaHQ9IjE5MCIgcng9IjI0IiBmaWxsPSIjMDkxNzA5IiBzdHJva2U9IiMyNEZGNjYiIHN0cm9rZS1vcGFjaXR5PSIwLjE2Ii8+CiAgPHJlY3QgeD0iNzc2IiB5PSIyNTIiIHdpZHRoPSIxOTQiIGhlaWdodD0iMTkwIiByeD0iMjQiIGZpbGw9IiMwOTE3MDkiIHN0cm9rZT0iIzI0RkY2NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiLz4KCiAgPHRleHQgeD0iMTM4IiB5PSIzNjAiIGZpbGw9IiMzOUZGMTQiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjYiPlRoaW5rPC90ZXh0PgogIDx0ZXh0IHg9IjM3MiIgeT0iMzYwIiBmaWxsPSIjMzlGRjE0IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjI2Ij5SZXZpZXc8L3RleHQ+CiAgPHRleHQgeD0iNjE4IiB5PSIzNjAiIGZpbGw9IiMzOUZGMTQiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjYiPlFBPC90ZXh0PgogIDx0ZXh0IHg9IjgzOCIgeT0iMzYwIiBmaWxsPSIjMzlGRjE0IiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjI2Ij5TaGlwPC90ZXh0PgoKICA8cGF0aCBkPSJNMjg2IDM0OEgzMjAiIHN0cm9rZT0iIzM5RkYxNCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjEwIDEwIi8+CiAgPHBhdGggZD0iTTUxNCAzNDhINTQ4IiBzdHJva2U9IiMzOUZGMTQiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMCAxMCIvPgogIDxwYXRoIGQ9Ik03NDIgMzQ4SDc3NiIgc3Ryb2tlPSIjMzlGRjE0IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiLz4KCiAgPHJlY3QgeD0iOTIiIHk9IjUxOCIgd2lkdGg9Ijg3OCIgaGVpZ2h0PSI5MiIgcng9IjIyIiBmaWxsPSIjMEExQTBBIi8+CiAgPHRleHQgeD0iMTI4IiB5PSI1NzQiIGZpbGw9IiNEOEZGRDgiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjQiPnJvbGUgc2VwYXJhdGlvbiBtYXR0ZXJzIG1vcmUgdGhhbiBvbmUgZ2lhbnQgZG8tZXZlcnl0aGluZyBwcm9tcHQ8L3RleHQ+Cjwvc3ZnPgo=",X="data:text/plain;base64,Z3N0YWNrIG5vdGVzCj09PT09PT09PT09PQoKMS4gVXNlIGl0IGFzIGEgd29ya2Zsb3csIG5vdCBhcyBhIGxvb3NlIHNldCBvZiBwcm9tcHRzCjIuIFN0YXJ0IHdpdGggb2ZmaWNlLWhvdXJzLCByZXZpZXcsIHFhLCBhbmQgc2hpcAozLiBBZGQgaGVhdmllciBwbGFubmluZy9kZXNpZ24gc2tpbGxzIG9ubHkgd2hlbiB0aGUgcHJvYmxlbSBzcGFjZSBpcyBmdXp6eQo0LiBUaGUgdmFsdWUgY29tZXMgZnJvbSByb2xlIHNlcGFyYXRpb24gYW5kIHN0ZXAgb3JkZXJpbmcK",Y="/assets/index-Bf90HfQj.md",L=/\.(?:avif|gif|jpe?g|png|svg|webp)$/i,J=/\.(?:pdf|zip|txt|csv|json|ya?ml|docx?|xlsx?|pptx?|md)$/i,U=/\u0000(\d+)\u0000/g,d=(n="")=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),f=n=>/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(n),$=n=>n.startsWith("/"),_=n=>n.startsWith("#"),v=n=>{const t=n.trim(),e=t.match(/^(.*?)(?:\s+"([^"]*)")?$/);if(!e)return{target:t,title:""};let s=e[1].trim();const i=e[2]||"";return s.startsWith("<")&&s.endsWith(">")&&(s=s.slice(1,-1)),{target:s,title:i}},F=n=>{try{const t=new URL(n,"https://notes.local/");return{path:decodeURIComponent(t.pathname.replace(/^\/+/,"")),suffix:`${t.search}${t.hash}`}}catch{return{path:n.replace(/^\.\/+/,"").replace(/^\/+/,""),suffix:""}}},N=(n,t)=>{if(!n||f(n)||$(n)||_(n))return n;const e=F(n),s=t==null?void 0:t(e.path);return s?`${s}${e.suffix}`:n},O=n=>n.replace(/\*\*([\s\S]+?)\*\*/g,"<strong>$1</strong>").replace(/__([\s\S]+?)__/g,"<strong>$1</strong>").replace(/~~([\s\S]+?)~~/g,"<del>$1</del>").replace(/(^|[\s(>])\*([^*]+?)\*(?=[\s).,!?:;]|$)/g,"$1<em>$2</em>").replace(/(^|[\s(>])_([^_]+?)_(?=[\s).,!?:;]|$)/g,"$1<em>$2</em>"),V=(n,t,e)=>{const{target:s,title:i}=v(t),a=N(s,e),c=J.test(s),o=c||f(a),g=i?` title="${d(i)}"`:"",l=o?' target="_blank" rel="noopener noreferrer"':"";return`<a class="${c?"note-link note-link-attachment":"note-link"}" href="${d(a)}"${g}${l}>${d(n)}</a>`},K=(n,t,e)=>{const{target:s,title:i}=v(t),a=N(s,e),c=i||n,o=i?` title="${d(i)}"`:"";return['<figure class="note-figure">',`<img class="note-image" src="${d(a)}" alt="${d(n)}"${o} loading="lazy" />`,c?`<figcaption class="note-caption">${d(c)}</figcaption>`:"","</figure>"].join("")},C=(n,t={})=>{let e=d(n);const s=[],i=a=>{const c=`\0${s.length}\0`;return s.push(a),c};return e=e.replace(/`([^`]+)`/g,(a,c)=>i(`<code>${d(c)}</code>`)),t.disableImages||(e=e.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(a,c,o)=>i(K(c,o,t.resolveAssetUrl)))),t.disableLinks||(e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(a,c,o)=>i(V(c,o,t.resolveAssetUrl)))),e=O(e),e.replace(U,(a,c)=>s[Number(c)]||"")},B=n=>/^#{1,6}\s+/.test(n),T=n=>/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(n),M=n=>/^```/.test(n.trim()),w=n=>/^\s*>\s?/.test(n),y=n=>/^(\s*)([-*+]|\d+\.)\s+/.test(n),q=n=>/^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(n),j=(n,t)=>t+1>=n.length?!1:n[t].includes("|")&&q(n[t+1]),A=(n,t)=>{const e=n[t]||"";return B(e)||T(e)||M(e)||w(e)||y(e)||j(n,t)},k=n=>n.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(e=>e.trim()),nn=n=>k(n).map(t=>{const e=t.trim();return e.startsWith(":")&&e.endsWith(":")?"center":e.endsWith(":")?"right":e.startsWith(":")?"left":""}),tn=(n,t,e)=>{const s=k(n[t]),i=nn(n[t+1]),a=[];let c=t+2;for(;c<n.length;){const l=n[c];if(!l.trim()||!l.includes("|"))break;a.push(k(l)),c+=1}const o=s.map((l,I)=>`<th${i[I]?` style="text-align:${i[I]}"`:""}>${C(l,e)}</th>`).join(""),g=a.map(l=>`<tr>${l.map((m,h)=>`<td${i[h]?` style="text-align:${i[h]}"`:""}>${C(m,e)}</td>`).join("")}</tr>`).join("");return{html:`<table class="note-table"><thead><tr>${o}</tr></thead><tbody>${g}</tbody></table>`,nextIndex:c}},en=(n,t,e)=>{const s=n[t].match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);if(!s)return null;const i=s[1].length,a=/\d+\./.test(s[2]),c=[];let o=t;for(;o<n.length;){const l=n[o];if(!l.trim())break;const I=l.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);if(!I||I[1].length!==i||a!==/\d+\./.test(I[2]))break;const m=[I[3].trim()];for(o+=1;o<n.length;){const r=n[o];if(!r.trim()){o+=1;break}const p=r.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);if(p&&p[1].length===i||A(n,o)&&!/^\s+/.test(r))break;m.push(r.trim()),o+=1}const h=m.map(r=>C(r,e)).join("<br />");c.push(`<li>${h}</li>`)}const g=a?"ol":"ul";return{html:`<${g} class="note-list">${c.join("")}</${g}>`,nextIndex:o}},sn=(n,t)=>{const e=n[t].trim().slice(3).trim(),s=[];let i=t+1;for(;i<n.length&&!M(n[i]);)s.push(n[i]),i+=1;return i<n.length&&(i+=1),{html:`<pre class="note-code-block"><code${e?` class="language-${d(e)}"`:""}>${d(s.join(`
`))}</code></pre>`,nextIndex:i}},cn=(n,t,e)=>{const s=[];let i=t;for(;i<n.length;){const a=n[i];if(!a.trim()){s.push(""),i+=1;continue}if(!w(a))break;s.push(a.replace(/^\s*>\s?/,"")),i+=1}return{html:`<blockquote class="note-blockquote">${G(s,e)}</blockquote>`,nextIndex:i}},an=(n,t,e)=>{const s=[];let i=t;for(;i<n.length;){const a=n[i];if(!a.trim()||i!==t&&A(n,i))break;s.push(a.trim()),i+=1}return{html:`<p>${s.map(a=>C(a,e)).join("<br />")}</p>`,nextIndex:i}},G=(n,t)=>{const e=[];let s=0;for(;s<n.length;){const i=n[s];if(!i.trim()){s+=1;continue}if(M(i)){const c=sn(n,s);e.push(c.html),s=c.nextIndex;continue}if(B(i)){const c=i.match(/^(#{1,6})\s+(.*)$/),o=c[1].length;e.push(`<h${o}>${C(c[2].trim(),t)}</h${o}>`),s+=1;continue}if(T(i)){e.push("<hr />"),s+=1;continue}if(j(n,s)){const c=tn(n,s,t);e.push(c.html),s=c.nextIndex;continue}if(w(i)){const c=cn(n,s,t);e.push(c.html),s=c.nextIndex;continue}if(y(i)){const c=en(n,s,t);e.push(c.html),s=c.nextIndex;continue}const a=an(n,s,t);e.push(a.html),s=a.nextIndex}return e.join(`
`)},on=n=>L.test(n),ln=(n,t={})=>{const e=n.replace(/\r\n/g,`
`).trim();return e?G(e.split(`
`),t):""},rn=Object.assign({"../../content/posts/everything-claude-code-workflow/index.md":W,"../../content/posts/gstack-intro/index.md":z}),In=Object.assign({"../../content/posts/everything-claude-code-workflow/ecc-workflow-checklist.txt":D,"../../content/posts/everything-claude-code-workflow/ecc-workflow-map.svg":E,"../../content/posts/everything-claude-code-workflow/index.md":S,"../../content/posts/gstack-intro/gstack-cover.svg":Q,"../../content/posts/gstack-intro/gstack-notes.txt":X,"../../content/posts/gstack-intro/index.md":Y}),gn=/^---\n([\s\S]*?)\n---\n?/,dn=new Intl.DateTimeFormat("zh-TW",{year:"numeric",month:"short",day:"numeric"}),Z=n=>{const t=n.trim();return t?t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")?t.slice(1,-1):t==="true"?!0:t==="false"?!1:/^-?\d+(?:\.\d+)?$/.test(t)?Number(t):t.startsWith("[")&&t.endsWith("]")?t.slice(1,-1).split(",").map(e=>Z(e)).filter(Boolean):t:""},mn=n=>{const t=n.match(gn);if(!t)return{attributes:{},body:n.trim()};const e={},s=t[1].split(`
`);for(let i=0;i<s.length;i+=1){const c=s[i].match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);if(!c)continue;const o=c[1],g=c[2]||"";if(g.trim()){e[o]=Z(g);continue}const l=[];for(;i+1<s.length;){const I=s[i+1].match(/^\s*-\s+(.*)$/);if(!I)break;l.push(Z(I[1])),i+=1}e[o]=l}return{attributes:e,body:n.slice(t[0].length).trim()}},P=n=>{const t=n.match(/content\/posts\/([^/]+)\/(.+)$/);return t?{slug:t[1],relativePath:t[2]}:null},un=()=>{const n={};return Object.entries(In).forEach(([t,e])=>{var i;const s=P(t);!s||s.relativePath==="index.md"||(n[i=s.slug]||(n[i]={}),n[s.slug][s.relativePath]=e)}),n},hn=un(),H=(n,t)=>{if(!t||/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\/)/i.test(t))return t||"";try{const e=new URL(t,"https://notes.local/"),s=decodeURIComponent(e.pathname.replace(/^\/+/,"")),i=n[s];return i?`${i}${e.search}${e.hash}`:t}catch{return t}},pn=n=>Array.isArray(n)?n.map(t=>String(t).trim()).filter(Boolean):typeof n=="string"?n.split(",").map(t=>t.trim()).filter(Boolean):[],bn=n=>n.split("-").filter(Boolean).map((t,e)=>e===0?t.charAt(0).toUpperCase()+t.slice(1):t).join(" "),Cn=n=>{const t=n.match(/^#\s+(.+)$/m);return t?t[1].trim():""},R=n=>n.replace(/```[\s\S]*?```/g," ").replace(/!\[([^\]]*)\]\(([^)]+)\)/g,"$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g,"$1").replace(/^>\s?/gm,"").replace(/^#{1,6}\s+/gm,"").replace(/[*_~`>-]/g," ").replace(/\|/g," ").replace(/\s+/g," ").trim(),kn=(n,t)=>{const e=R(n);return e?e.length>140?`${e.slice(0,140).trim()}...`:e:t},Zn=n=>{var i,a;const t=R(n),e=((i=t.match(/[A-Za-z0-9_]+/g))==null?void 0:i.length)||0,s=((a=t.match(/[\u3400-\u9fff\uf900-\ufaff]/g))==null?void 0:a.length)||0;return e+s},b=n=>{if(!n||typeof n!="string")return null;const t=n.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(t){const[,s,i,a]=t;return new Date(Number(s),Number(i)-1,Number(a))}const e=new Date(n);return Number.isNaN(e.getTime())?null:e},x=n=>{const t=n.split("/");return t[t.length-1]},Mn=n=>{const t=x(n),e=t.lastIndexOf(".");return e===-1?"":t.slice(e+1).toUpperCase()},wn=(n,t)=>{const e=n.match(/!\[[^\]]*\]\(([^)]+)\)/);return e?H(t,e[1]):""},fn=(n,t)=>{const e=P(n);if(!e)return null;const s=hn[e.slug]||{},{attributes:i,body:a}=mn(t),c=i.title||Cn(a)||bn(e.slug),o=i.excerpt||kn(a,c),g=i.date||"",l=i.updated||i.updatedAt||"",I=Zn(a),m=Object.entries(s).filter(([r])=>!on(r)).map(([r,p])=>({name:x(r),extension:Mn(r),relativePath:r,url:p})).sort((r,p)=>r.name.localeCompare(p.name)),h=H(s,i.cover||"")||wn(a,s);return{slug:e.slug,title:c,excerpt:o,date:g,updated:l,tags:pn(i.tags),coverImage:h,attachments:m,html:ln(a,{resolveAssetUrl:r=>s[r]}),readingTime:Math.max(1,Math.ceil(I/320)),readingUnits:I,sourcePath:`src/content/posts/${e.slug}/index.md`,folderPath:`src/content/posts/${e.slug}`,published:i.published!==!1&&i.draft!==!0}},u=Object.entries(rn).map(([n,t])=>fn(n,t)).filter(n=>n==null?void 0:n.published).sort((n,t)=>{var c,o,g,l;const e=((c=b(t.date))==null?void 0:c.getTime())||0,s=((o=b(n.date))==null?void 0:o.getTime())||0,i=((g=b(t.updated))==null?void 0:g.getTime())||0,a=((l=b(n.updated))==null?void 0:l.getTime())||0;return e!==s?e-s:i!==a?i-a:n.title.localeCompare(t.title,"zh-Hant")}),vn=[...new Set(u.flatMap(n=>n.tags))].sort((n,t)=>n.localeCompare(t,"zh-Hant")),Nn={total:u.length,tags:vn.length,attachments:u.reduce((n,t)=>n+t.attachments.length,0)},Bn=n=>u.find(t=>t.slug===n),Tn=n=>{const t=u.findIndex(e=>e.slug===n);return t===-1?{previous:null,next:null}:{previous:u[t-1]||null,next:u[t+1]||null}},yn=n=>{const t=b(n);return t?dn.format(t):"未標示日期"};export{Nn as a,Tn as b,yn as f,Bn as g,u as n};
