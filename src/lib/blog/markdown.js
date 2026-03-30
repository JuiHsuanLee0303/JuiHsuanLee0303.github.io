const IMAGE_EXTENSION_PATTERN = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i
const ATTACHMENT_EXTENSION_PATTERN = /\.(?:pdf|zip|txt|csv|json|ya?ml|docx?|xlsx?|pptx?|md)$/i
const INLINE_TOKEN_PATTERN = /\u0000(\d+)\u0000/g

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const isExternalReference = (value) => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)
const isRootReference = (value) => value.startsWith('/')
const isHashReference = (value) => value.startsWith('#')

const parseDestination = (rawDestination) => {
  const trimmed = rawDestination.trim()
  const titleMatch = trimmed.match(/^(.*?)(?:\s+"([^"]*)")?$/)

  if (!titleMatch) {
    return { target: trimmed, title: '' }
  }

  let target = titleMatch[1].trim()
  const title = titleMatch[2] || ''

  if (target.startsWith('<') && target.endsWith('>')) {
    target = target.slice(1, -1)
  }

  return { target, title }
}

const normalizeAssetPath = (value) => {
  try {
    const url = new URL(value, 'https://notes.local/')
    return {
      path: decodeURIComponent(url.pathname.replace(/^\/+/, '')),
      suffix: `${url.search}${url.hash}`
    }
  } catch {
    return {
      path: value.replace(/^\.\/+/, '').replace(/^\/+/, ''),
      suffix: ''
    }
  }
}

const resolveReference = (target, resolveAssetUrl) => {
  if (!target || isExternalReference(target) || isRootReference(target) || isHashReference(target)) {
    return target
  }

  const normalized = normalizeAssetPath(target)
  const resolved = resolveAssetUrl?.(normalized.path)

  return resolved ? `${resolved}${normalized.suffix}` : target
}

const renderTextStyles = (value) => value
  .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
  .replace(/__([\s\S]+?)__/g, '<strong>$1</strong>')
  .replace(/~~([\s\S]+?)~~/g, '<del>$1</del>')
  .replace(/(^|[\s(>])\*([^*]+?)\*(?=[\s).,!?:;]|$)/g, '$1<em>$2</em>')
  .replace(/(^|[\s(>])_([^_]+?)_(?=[\s).,!?:;]|$)/g, '$1<em>$2</em>')

const renderLink = (label, rawDestination, resolveAssetUrl) => {
  const { target, title } = parseDestination(rawDestination)
  const href = resolveReference(target, resolveAssetUrl)
  const isAttachment = ATTACHMENT_EXTENSION_PATTERN.test(target)
  const shouldOpenInNewTab = isAttachment || isExternalReference(href)
  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : ''
  const targetAttribute = shouldOpenInNewTab ? ' target="_blank" rel="noopener noreferrer"' : ''
  const className = isAttachment ? 'note-link note-link-attachment' : 'note-link'

  return `<a class="${className}" href="${escapeHtml(href)}"${titleAttribute}${targetAttribute}>${escapeHtml(label)}</a>`
}

const renderImage = (altText, rawDestination, resolveAssetUrl) => {
  const { target, title } = parseDestination(rawDestination)
  const src = resolveReference(target, resolveAssetUrl)
  const caption = title || altText
  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : ''

  return [
    '<figure class="note-figure">',
    `<img class="note-image" src="${escapeHtml(src)}" alt="${escapeHtml(altText)}"${titleAttribute} loading="lazy" />`,
    caption ? `<figcaption class="note-caption">${escapeHtml(caption)}</figcaption>` : '',
    '</figure>'
  ].join('')
}

const renderInline = (value, options = {}) => {
  let rendered = escapeHtml(value)
  const tokens = []

  const stash = (html) => {
    const token = `\u0000${tokens.length}\u0000`
    tokens.push(html)
    return token
  }

  rendered = rendered.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${escapeHtml(code)}</code>`))

  if (!options.disableImages) {
    rendered = rendered.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, altText, rawDestination) => {
      return stash(renderImage(altText, rawDestination, options.resolveAssetUrl))
    })
  }

  if (!options.disableLinks) {
    rendered = rendered.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, rawDestination) => {
      return stash(renderLink(label, rawDestination, options.resolveAssetUrl))
    })
  }

  rendered = renderTextStyles(rendered)

  return rendered.replace(INLINE_TOKEN_PATTERN, (_, tokenIndex) => tokens[Number(tokenIndex)] || '')
}

const isHeading = (line) => /^#{1,6}\s+/.test(line)
const isHorizontalRule = (line) => /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)
const isFence = (line) => /^```/.test(line.trim())
const isBlockquoteLine = (line) => /^\s*>\s?/.test(line)
const isListItem = (line) => /^(\s*)([-*+]|\d+\.)\s+/.test(line)

const isTableSeparator = (line) => /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line)
const looksLikeTable = (lines, index) => {
  if (index + 1 >= lines.length) return false
  return lines[index].includes('|') && isTableSeparator(lines[index + 1])
}

const startsWithBlock = (lines, index) => {
  const line = lines[index] || ''

  return isHeading(line) ||
    isHorizontalRule(line) ||
    isFence(line) ||
    isBlockquoteLine(line) ||
    isListItem(line) ||
    looksLikeTable(lines, index)
}

const splitTableRow = (line) => {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return trimmed.split('|').map((cell) => cell.trim())
}

const parseTableAlignment = (line) => splitTableRow(line).map((cell) => {
  const trimmed = cell.trim()

  if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center'
  if (trimmed.endsWith(':')) return 'right'
  if (trimmed.startsWith(':')) return 'left'
  return ''
})

const renderTable = (lines, startIndex, options) => {
  const headerCells = splitTableRow(lines[startIndex])
  const alignments = parseTableAlignment(lines[startIndex + 1])
  const bodyRows = []

  let currentIndex = startIndex + 2

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    if (!line.trim() || !line.includes('|')) {
      break
    }

    bodyRows.push(splitTableRow(line))
    currentIndex += 1
  }

  const headerHtml = headerCells.map((cell, cellIndex) => {
    const style = alignments[cellIndex] ? ` style="text-align:${alignments[cellIndex]}"` : ''
    return `<th${style}>${renderInline(cell, options)}</th>`
  }).join('')

  const bodyHtml = bodyRows.map((row) => {
    const cells = row.map((cell, cellIndex) => {
      const style = alignments[cellIndex] ? ` style="text-align:${alignments[cellIndex]}"` : ''
      return `<td${style}>${renderInline(cell, options)}</td>`
    }).join('')

    return `<tr>${cells}</tr>`
  }).join('')

  return {
    html: `<table class="note-table"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`,
    nextIndex: currentIndex
  }
}

const renderList = (lines, startIndex, options) => {
  const firstMatch = lines[startIndex].match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/)

  if (!firstMatch) {
    return null
  }

  const baseIndent = firstMatch[1].length
  const ordered = /\d+\./.test(firstMatch[2])
  const items = []
  let currentIndex = startIndex

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    if (!line.trim()) {
      break
    }

    const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/)

    if (!match || match[1].length !== baseIndent || ordered !== /\d+\./.test(match[2])) {
      break
    }

    const itemLines = [match[3].trim()]
    currentIndex += 1

    while (currentIndex < lines.length) {
      const continuationLine = lines[currentIndex]

      if (!continuationLine.trim()) {
        currentIndex += 1
        break
      }

      const nextItemMatch = continuationLine.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/)

      if (nextItemMatch && nextItemMatch[1].length === baseIndent) {
        break
      }

      if (startsWithBlock(lines, currentIndex) && !/^\s+/.test(continuationLine)) {
        break
      }

      itemLines.push(continuationLine.trim())
      currentIndex += 1
    }

    const itemContent = itemLines.map((itemLine) => renderInline(itemLine, options)).join('<br />')
    items.push(`<li>${itemContent}</li>`)
  }

  const tagName = ordered ? 'ol' : 'ul'

  return {
    html: `<${tagName} class="note-list">${items.join('')}</${tagName}>`,
    nextIndex: currentIndex
  }
}

const renderCodeFence = (lines, startIndex) => {
  const language = lines[startIndex].trim().slice(3).trim()
  const codeLines = []
  let currentIndex = startIndex + 1

  while (currentIndex < lines.length && !isFence(lines[currentIndex])) {
    codeLines.push(lines[currentIndex])
    currentIndex += 1
  }

  if (currentIndex < lines.length) {
    currentIndex += 1
  }

  const languageClass = language ? ` class="language-${escapeHtml(language)}"` : ''

  return {
    html: `<pre class="note-code-block"><code${languageClass}>${escapeHtml(codeLines.join('\n'))}</code></pre>`,
    nextIndex: currentIndex
  }
}

const renderBlockquote = (lines, startIndex, options) => {
  const quoteLines = []
  let currentIndex = startIndex

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    if (!line.trim()) {
      quoteLines.push('')
      currentIndex += 1
      continue
    }

    if (!isBlockquoteLine(line)) {
      break
    }

    quoteLines.push(line.replace(/^\s*>\s?/, ''))
    currentIndex += 1
  }

  return {
    html: `<blockquote class="note-blockquote">${renderBlocks(quoteLines, options)}</blockquote>`,
    nextIndex: currentIndex
  }
}

const renderParagraph = (lines, startIndex, options) => {
  const paragraphLines = []
  let currentIndex = startIndex

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    if (!line.trim()) {
      break
    }

    if (currentIndex !== startIndex && startsWithBlock(lines, currentIndex)) {
      break
    }

    paragraphLines.push(line.trim())
    currentIndex += 1
  }

  return {
    html: `<p>${paragraphLines.map((line) => renderInline(line, options)).join('<br />')}</p>`,
    nextIndex: currentIndex
  }
}

const renderBlocks = (lines, options) => {
  const blocks = []
  let currentIndex = 0

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    if (!line.trim()) {
      currentIndex += 1
      continue
    }

    if (isFence(line)) {
      const result = renderCodeFence(lines, currentIndex)
      blocks.push(result.html)
      currentIndex = result.nextIndex
      continue
    }

    if (isHeading(line)) {
      const match = line.match(/^(#{1,6})\s+(.*)$/)
      const level = match[1].length
      blocks.push(`<h${level}>${renderInline(match[2].trim(), options)}</h${level}>`)
      currentIndex += 1
      continue
    }

    if (isHorizontalRule(line)) {
      blocks.push('<hr />')
      currentIndex += 1
      continue
    }

    if (looksLikeTable(lines, currentIndex)) {
      const result = renderTable(lines, currentIndex, options)
      blocks.push(result.html)
      currentIndex = result.nextIndex
      continue
    }

    if (isBlockquoteLine(line)) {
      const result = renderBlockquote(lines, currentIndex, options)
      blocks.push(result.html)
      currentIndex = result.nextIndex
      continue
    }

    if (isListItem(line)) {
      const result = renderList(lines, currentIndex, options)
      blocks.push(result.html)
      currentIndex = result.nextIndex
      continue
    }

    const result = renderParagraph(lines, currentIndex, options)
    blocks.push(result.html)
    currentIndex = result.nextIndex
  }

  return blocks.join('\n')
}

export const isImageAsset = (value) => IMAGE_EXTENSION_PATTERN.test(value)

export const renderMarkdown = (markdown, options = {}) => {
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n').trim()

  if (!normalizedMarkdown) {
    return ''
  }

  return renderBlocks(normalizedMarkdown.split('\n'), options)
}
