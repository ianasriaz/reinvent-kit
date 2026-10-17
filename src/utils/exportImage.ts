import { toPng, toBlob, getFontEmbedCSS } from "html-to-image"

export interface ExportOptions {
  filename?: string
  scale?: number // 1 for standard 1080/1200, 2 for Ultra-HD Retina 2160/2400
  targetWidth?: number
}

async function waitForFonts() {
  try {
    await document.fonts.ready
  } catch {
    // Fonts API unavailable — proceed with whatever is loaded
  }
}

/**
 * html-to-image needs a second render pass the first time it sees remote
 * images (data URLs, cross-origin photos) and embedded web fonts — otherwise
 * the first capture can miss images or fall back to system fonts. Double-pass
 * makes exports deterministic at the cost of one throwaway render.
 */
export async function prepareRenderer(element: HTMLElement) {
  await waitForFonts()
  const options = {
    cacheBust: true,
    quality: 1,
  }
  try {
    const fontEmbedCSS = await getFontEmbedCSS(element)
    if (fontEmbedCSS) return { ...options, fontEmbedCSS }
  } catch {
    // Font embedding failed (CORS on font host) — fall back to loaded fonts
  }
  // First throwaway pass warms image/loading caches
  try {
    await toPng(element, { ...options, pixelRatio: 0.1 })
  } catch {
    // noop
  }
  return options
}

interface RenderOptionsParam {
  targetWidth?: number
  scale?: number
}

function buildRenderOptions(element: HTMLElement, options: RenderOptionsParam) {
  const { targetWidth, scale = 1 } = options
  const elementWidth = element.offsetWidth || element.clientWidth || 540
  const elementHeight =
    element.offsetHeight || element.clientHeight || elementWidth
  const pixelRatio = targetWidth
    ? (targetWidth * scale) / elementWidth
    : scale * 2
  const canvasWidth =
    targetWidth && scale ? Math.round(targetWidth * scale) : undefined
  const canvasHeight = canvasWidth
    ? Math.round(canvasWidth * (elementHeight / elementWidth))
    : undefined
  return { pixelRatio, canvasWidth, canvasHeight }
}

export async function exportElementAsPng(
  element: HTMLElement,
  options: ExportOptions = {},
): Promise<string> {
  const { filename = "social-card.png", targetWidth } = options
  const prepped = await prepareRenderer(element)
  const { pixelRatio, canvasWidth, canvasHeight } = buildRenderOptions(
    element,
    {
      targetWidth,
      scale: options.scale,
    },
  )

  const dataUrl = await toPng(element, {
    ...prepped,
    pixelRatio,
    ...(canvasWidth ? { canvasWidth, canvasHeight } : {}),
  })

  // Trigger browser download
  const link = document.createElement("a")
  link.download = filename
  link.href = dataUrl
  link.click()

  return dataUrl
}

export async function copyElementToClipboard(
  element: HTMLElement,
  options: RenderOptionsParam = {},
): Promise<boolean> {
  const prepped = await prepareRenderer(element)
  const { pixelRatio, canvasWidth, canvasHeight } = buildRenderOptions(
    element,
    options,
  )

  const blob = await toBlob(element, {
    ...prepped,
    pixelRatio,
    ...(canvasWidth ? { canvasWidth, canvasHeight } : {}),
  })

  if (!blob) {
    throw new Error("Failed to generate image blob")
  }

  if (navigator.clipboard && typeof window.ClipboardItem !== "undefined") {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ])
    return true
  }

  throw new Error("Clipboard copy is not supported in this browser session")
}

/** Convert an uploaded image file to a stable data URL (blob URLs break exports). */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
