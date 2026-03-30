import { isImageAsset, renderMarkdown } from './markdown'

const markdownModules = import.meta.glob('../../content/posts/*/index.md', {
  eager: true,
  import: 'default',
  query: '?raw'
})

const assetModules = import.meta.glob('../../content/posts/**/*', {
  eager: true,
  import: 'default',
  query: '?url'
})

const FRONT_MATTER_PATTERN = /^---\n([\s\S]*?)\n---\n?/
const DATE_FORMATTER = new Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})

const parseScalar = (value) => {
  const trimmed = value.trim()

  if (!trimmed) return ''

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed)

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => parseScalar(item))
      .filter(Boolean)
  }

  return trimmed
}

const parseFrontMatter = (markdown) => {
  const frontMatterMatch = markdown.match(FRONT_MATTER_PATTERN)

  if (!frontMatterMatch) {
    return {
      attributes: {},
      body: markdown.trim()
    }
  }

  const attributes = {}
  const lines = frontMatterMatch[1].split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/)

    if (!match) {
      continue
    }

    const key = match[1]
    const rawValue = match[2] || ''

    if (rawValue.trim()) {
      attributes[key] = parseScalar(rawValue)
      continue
    }

    const listValues = []

    while (index + 1 < lines.length) {
      const listMatch = lines[index + 1].match(/^\s*-\s+(.*)$/)

      if (!listMatch) {
        break
      }

      listValues.push(parseScalar(listMatch[1]))
      index += 1
    }

    attributes[key] = listValues
  }

  return {
    attributes,
    body: markdown.slice(frontMatterMatch[0].length).trim()
  }
}

const parseContentPath = (filePath) => {
  const match = filePath.match(/content\/posts\/([^/]+)\/(.+)$/)

  if (!match) {
    return null
  }

  return {
    slug: match[1],
    relativePath: match[2]
  }
}

const buildAssetLookup = () => {
  const lookup = {}

  Object.entries(assetModules).forEach(([filePath, url]) => {
    const parsedPath = parseContentPath(filePath)

    if (!parsedPath || parsedPath.relativePath === 'index.md') {
      return
    }

    lookup[parsedPath.slug] ||= {}
    lookup[parsedPath.slug][parsedPath.relativePath] = url
  })

  return lookup
}

const assetLookupBySlug = buildAssetLookup()

const resolveLocalAsset = (assetLookup, reference) => {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\/)/i.test(reference)) {
    return reference || ''
  }

  try {
    const url = new URL(reference, 'https://notes.local/')
    const normalizedPath = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
    const resolved = assetLookup[normalizedPath]

    return resolved ? `${resolved}${url.search}${url.hash}` : reference
  } catch {
    return reference
  }
}

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean)
  }

  return []
}

const toSentenceCase = (slug) => slug
  .split('-')
  .filter(Boolean)
  .map((segment, index) => {
    if (index === 0) {
      return segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    return segment
  })
  .join(' ')

const extractFirstHeading = (body) => {
  const headingMatch = body.match(/^#\s+(.+)$/m)
  return headingMatch ? headingMatch[1].trim() : ''
}

const stripMarkdown = (markdown) => markdown
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
  .replace(/^>\s?/gm, '')
  .replace(/^#{1,6}\s+/gm, '')
  .replace(/[*_~`>-]/g, ' ')
  .replace(/\|/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const createExcerpt = (body, fallbackTitle) => {
  const text = stripMarkdown(body)

  if (!text) {
    return fallbackTitle
  }

  return text.length > 140 ? `${text.slice(0, 140).trim()}...` : text
}

const countReadingUnits = (body) => {
  const plainText = stripMarkdown(body)
  const latinWords = plainText.match(/[A-Za-z0-9_]+/g)?.length || 0
  const cjkCharacters = plainText.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length || 0
  return latinWords + cjkCharacters
}

const parseDate = (value) => {
  if (!value || typeof value !== 'string') {
    return null
  }

  const ymdMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (ymdMatch) {
    const [, year, month, day] = ymdMatch
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

const getFileName = (relativePath) => {
  const segments = relativePath.split('/')
  return segments[segments.length - 1]
}

const getFileExtension = (relativePath) => {
  const fileName = getFileName(relativePath)
  const dotIndex = fileName.lastIndexOf('.')
  return dotIndex === -1 ? '' : fileName.slice(dotIndex + 1).toUpperCase()
}

const findCoverImage = (body, assetLookup) => {
  const imageMatch = body.match(/!\[[^\]]*\]\(([^)]+)\)/)

  if (!imageMatch) {
    return ''
  }

  return resolveLocalAsset(assetLookup, imageMatch[1])
}

const buildNote = (filePath, rawMarkdown) => {
  const parsedPath = parseContentPath(filePath)

  if (!parsedPath) {
    return null
  }

  const assetLookup = assetLookupBySlug[parsedPath.slug] || {}
  const { attributes, body } = parseFrontMatter(rawMarkdown)
  const title = attributes.title || extractFirstHeading(body) || toSentenceCase(parsedPath.slug)
  const excerpt = attributes.excerpt || createExcerpt(body, title)
  const date = attributes.date || ''
  const updated = attributes.updated || attributes.updatedAt || ''
  const readingUnits = countReadingUnits(body)

  const attachments = Object.entries(assetLookup)
    .filter(([relativePath]) => !isImageAsset(relativePath))
    .map(([relativePath, url]) => ({
      name: getFileName(relativePath),
      extension: getFileExtension(relativePath),
      relativePath,
      url
    }))
    .sort((left, right) => left.name.localeCompare(right.name))

  const coverImage = resolveLocalAsset(assetLookup, attributes.cover || '') || findCoverImage(body, assetLookup)

  return {
    slug: parsedPath.slug,
    title,
    excerpt,
    date,
    updated,
    tags: normalizeTags(attributes.tags),
    coverImage,
    attachments,
    html: renderMarkdown(body, {
      resolveAssetUrl: (relativePath) => assetLookup[relativePath]
    }),
    readingTime: Math.max(1, Math.ceil(readingUnits / 320)),
    readingUnits,
    sourcePath: `src/content/posts/${parsedPath.slug}/index.md`,
    folderPath: `src/content/posts/${parsedPath.slug}`,
    published: attributes.published !== false && attributes.draft !== true
  }
}

export const notes = Object.entries(markdownModules)
  .map(([filePath, rawMarkdown]) => buildNote(filePath, rawMarkdown))
  .filter((note) => note?.published)
  .sort((left, right) => {
    const rightTime = parseDate(right.date)?.getTime() || 0
    const leftTime = parseDate(left.date)?.getTime() || 0
    const rightUpdatedTime = parseDate(right.updated)?.getTime() || 0
    const leftUpdatedTime = parseDate(left.updated)?.getTime() || 0

    if (rightTime !== leftTime) {
      return rightTime - leftTime
    }

    if (rightUpdatedTime !== leftUpdatedTime) {
      return rightUpdatedTime - leftUpdatedTime
    }

    return left.title.localeCompare(right.title, 'zh-Hant')
  })

export const noteTags = [...new Set(notes.flatMap((note) => note.tags))].sort((left, right) => {
  return left.localeCompare(right, 'zh-Hant')
})

export const noteStats = {
  total: notes.length,
  tags: noteTags.length,
  attachments: notes.reduce((count, note) => count + note.attachments.length, 0)
}

export const getNoteBySlug = (slug) => notes.find((note) => note.slug === slug)

export const getAdjacentNotes = (slug) => {
  const currentIndex = notes.findIndex((note) => note.slug === slug)

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null
    }
  }

  return {
    previous: notes[currentIndex - 1] || null,
    next: notes[currentIndex + 1] || null
  }
}

export const formatNoteDate = (value) => {
  const parsedDate = parseDate(value)
  return parsedDate ? DATE_FORMATTER.format(parsedDate) : '未標示日期'
}
