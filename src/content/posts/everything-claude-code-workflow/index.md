---
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

- `agents`
  像 `planner`、`tdd-guide`、`code-reviewer`、`security-reviewer` 這類專門分工的子代理
- `commands`
  用 `/plan`、`/tdd`、`/code-review` 這些入口快速啟動一段流程
- `skills`
  把特定工作方法整理成可重用的 workflow
- `rules`
  放一些固定要遵守的工程習慣
- `hooks`
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

```bash
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
```

這種方式的好處是：

- 上手快
- 能直接先完整體驗整套 plugin
- 不用自己一個個搬 agents / commands / skills

如果只是想先試，這通常是最合理的起點。

### 2. 手動安裝需要的元件

README 與 OpenCodeDocs 也都提到，你可以 clone repo 後手動安裝：

```bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
npm install
./install.sh --profile full
```

或是只安裝特定語言：

```bash
./install.sh typescript
./install.sh python
./install.sh golang
```

這種方式比較適合：

- 已經有自己的設定，不想整包覆蓋
- 只想挑部分語言規則或某些 workflow
- 想精細控制裝進去的東西

## 安裝時我會注意什麼？

我覺得有兩個點很值得先知道。

### 1. rules 不是完全自動跟著 plugin 一起進來

README 有特別提醒，Claude Code plugin 並不能把 `rules` 全自動分發，所以很多情況下還是要照文件把 rules 安裝好。這代表你不能只看到 plugin 裝好了，就以為整套 workflow 已經完整生效。

### 2. 不一定要全裝

OpenCodeDocs 的安裝說明其實也強調得很清楚：如果你有自己的工作流，不一定需要整套照搬。先裝主要入口，再慢慢加上你真的會用到的規則、命令與 hooks，通常會比一開始全開來得穩。

這也是我比較認同的用法。這類工具的價值不在於「功能越多越好」，而在於你有沒有把它調成真的符合自己節奏。

## 如果是我，我會怎麼用 Everything Claude Code？

這裡是我覺得最重要的部分。

如果把 ECC 當成「裝了就會變強」的外掛，其實很容易失望。因為它不是魔法，而是一套 workflow scaffolding。真正的差別，在於你怎麼把它放進自己的日常開發步驟。

如果是我自己，我會這樣用。

## 1. 複雜需求一定先走 `/plan`

只要是下面這種情境，我都會先走 planning：

- 新功能跨很多檔案
- 需求還有模糊地帶
- 改動會碰到架構或資料流
- 想先確認風險與 phase 切法

因為 AI 很擅長直接開始做，但不一定擅長先停下來想。ECC 把 `/plan` 做成標準入口，剛好能壓住這個問題。

對我來說，它最有價值的不是「產出一份漂亮計畫」，而是強迫先建立共同理解。

## 2. 進入實作時，用 `/tdd` 當護欄

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

這時候用 `code-reviewer` 或 `security-reviewer` 類型的角色，比最後一次總檢查更有效，因為上下文還在，修正成本也比較低。

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

1. 先用 `/plan`、`/tdd`、`/code-review` 這種明確入口
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
