# Blog Authoring Guide

這份文件是未來新增筆記文章時的標準程序，目標是讓每篇文章都能用一致的方式建立、檢查、建置與部署。

## 1. 文章放置位置

每篇文章都放在自己的資料夾中：

```text
src/content/posts/<slug>/
  index.md
  ...images
  ...attachments
```

範例：

```text
src/content/posts/gstack-intro/
  index.md
  gstack-cover.svg
  gstack-notes.txt
```

## 2. slug 命名規則

`<slug>` 建議遵守以下規則：

- 使用英文小寫
- 單字以 `-` 連接
- 不要用空白
- 盡量簡短，但能看出主題

建議：

- `gstack-intro`
- `everything-claude-code-workflow`
- `agent-observability-notes`

避免：

- `My New Post`
- `筆記文章1`
- `this_is_a_post`

## 3. index.md 標準格式

每篇文章的 `index.md` 建議使用 front matter。

最小範本：

```md
---
title: 我的新文章
date: 2026-03-29
tags:
  - Notes
  - Demo
---

# 我的新文章

這裡開始寫內容。
```

完整範本：

```md
---
title: 我的新文章
date: 2026-03-29
updated: 2026-03-29
excerpt: 這篇文章的摘要，會顯示在列表頁。
tags:
  - AI
  - RAG
cover: ./cover-image.svg
published: true
---

# 我的新文章

文章內容從這裡開始。
```

## 4. front matter 欄位說明

目前支援以下欄位：

| 欄位 | 是否必填 | 說明 |
| --- | --- | --- |
| `title` | 建議填寫 | 文章標題 |
| `date` | 建議填寫 | 發布日期，格式建議 `YYYY-MM-DD` |
| `updated` | 選填 | 更新日期 |
| `excerpt` | 選填 | 列表頁摘要 |
| `tags` | 選填 | 文章標籤 |
| `cover` | 選填 | 封面圖相對路徑 |
| `published` | 選填 | 是否發布；設成 `false` 可先隱藏 |

補充：

- 如果沒有 `title`，系統會嘗試用文章第一個 `# 標題`
- 如果沒有 `excerpt`，系統會自動從內文產生摘要
- 如果沒有 `cover`，列表頁會改成無封面卡片

## 5. 圖片與附件使用方式

### 5.1 圖片

文章中的圖片直接用相對路徑：

```md
![圖片說明](./diagram.svg)
```

### 5.2 附件

附件也用相對路徑：

```md
[下載附件](./reference.pdf)
[下載設定檔](./config.yaml)
```

### 5.3 同資料夾原則

建議文章用到的圖片與附件都放在同一篇文章資料夾裡，不要跨文章互相引用，這樣管理最單純。

## 6. 建議寫作流程

每次新增文章，建議照以下步驟：

1. 建立資料夾：`src/content/posts/<slug>/`
2. 新增 `index.md`
3. 把需要的圖片與附件放進同資料夾
4. 在 `index.md` 補上 front matter
5. 用相對路徑插入圖片與附件
6. 執行 `npm run build`
7. 確認 `/notes` 列表頁與單篇頁顯示正常
8. 再進行 deploy

## 7. 發文前檢查清單

發文前請至少確認以下項目：

- `title` 是否正確
- `date` 是否正確
- `excerpt` 是否夠清楚
- `tags` 是否合適
- 圖片是否能正常顯示
- 附件連結是否能正常點開
- 列表頁卡片高度與摘要是否合理
- 單篇頁標題、日期、附件區是否正常
- `npm run build` 是否成功

## 8. 草稿文章做法

如果文章還沒準備好，但想先放進 repo，可以在 front matter 加上：

```md
published: false
```

這樣文章仍會留在資料夾中，但不會顯示在 `/notes`。

## 9. 建議參考範例

目前 repo 內有幾篇可參考的示範文章：

- `src/content/posts/everything-claude-code-workflow/`
- `src/content/posts/gstack-intro/`

新增文章時，最快的做法通常是複製一篇最接近的範例，再改內容。

## 10. 建置與部署

本機建置：

```bash
npm run build
```

部署到 GitHub Pages：

```bash
npm run deploy
```

如果 build 沒過，不要先 deploy，先把文章格式或資源路徑修正完再發佈。
