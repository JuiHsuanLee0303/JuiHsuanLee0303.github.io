---
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

- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/review`
- `/qa`
- `/ship`

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

這也是為什麼它會先推 `/office-hours`，而不是一開始就叫你寫 code。

## 怎麼安裝 gstack？

以 README 現在的寫法來看，最直接的方式是 clone 之後執行 setup。

### 安裝到自己的 Claude Code 環境

README 裡給的主要安裝方式是：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

做完之後，還要在 `CLAUDE.md` 裡補一段 gstack 區塊，讓 Claude 知道有哪些 skills 可以用，還有指定網頁瀏覽時優先走 gstack 的 `/browse`。

### 加到目前專案，讓隊友也能一起用

README 也提供另一種做法，就是把 gstack 直接放進專案內的 `.claude/skills/gstack`：

```bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
rm -rf .claude/skills/gstack/.git
cd .claude/skills/gstack && ./setup
```

這種方式的優點是：

- 專案 clone 下來就有同樣的 skills
- 團隊比較容易共享同一套 workflow
- 不會只存在某一個人的本機環境

### 也支援其他 agent host

README 還有提到 Codex、Gemini CLI、Cursor 與 Factory Droid 的安裝方式，像 Codex 的做法是：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
```

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

## 2. 很多介紹都強調 `/office-hours -> /plan -> /review -> /qa -> /ship` 這條線

不管是 README 還是官方頁，最常被示範的用法都很像：

1. 先用 `/office-hours` 釐清你到底要解決什麼問題
2. 再用產品或工程 review 技能收斂計畫
3. 接著實作
4. 用 `/review` 抓 production 級 bug
5. 用 `/qa` 實際在瀏覽器裡測
6. 最後再 `/ship`

這跟一般人對 Claude Code 的直覺用法很不一樣。一般人常常是直接說「幫我做一個功能」，但 gstack 的節奏是先把問題重新定義。

## 3. `/qa` 和 `/browse` 幾乎是每篇介紹都會提的亮點

官方網站跟 README 都很強調這一點：gstack 不只是 Markdown 指令包，它的 `/browse`、`/qa` 背後還有實際的 browser automation runtime。

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

當你輸入 `/review`，你就不是在「請 AI 幫忙看看」，而是在進入一個特定角色。

這種角色切分，本身就是它 workflow 的核心。

## 那我自己怎麼看 gstack？

如果直接講結論，我會說：

**gstack 很有個性，而且很適合拿來矯正「AI 直接亂衝」這件事。**

它不一定適合所有人，但對某些情境會非常有用。

## 我喜歡它的地方

### 1. 它很敢幫你先停下來

這其實很重要。

大部分人用 AI coding assistant 最容易出現的問題，就是太快往 implementation 跑。gstack 用 `/office-hours` 和幾個 plan review 類 skill，把「先重新想問題」這件事放在最前面。

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

- `/office-hours`
- `/plan-eng-review`
- `/review`
- `/qa`
- `/ship`

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

那 `/plan-ceo-review`、`/plan-design-review` 這類技能就會很有價值。

但如果只是單純修 API bug，這些 skill 反而太重。

### 第三階段：把它當流程，而不是功能表

這是我覺得最重要的用法。

如果只是偶爾想起來才用一個 `/review`，那 gstack 只是多了一個命令而已。真正有價值的用法，是把它當工作節奏：

1. 問題先經過 `/office-hours`
2. 計畫先經過 review
3. 程式寫完先過 `/review`
4. 上線前一定過 `/qa`
5. 最後才 `/ship`

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
