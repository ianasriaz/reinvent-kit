import { toPng, toBlob } from "html-to-image"

export interface ExportOptions {
  filename?: string
  scale?: number // 1 for standard 1080/1200, 2 for Ultra-HD Retina 2160/2400
  targetWidth?: number
  targetHeight?: number
}

export async function exportElementAsPng(
  element: HTMLElement,
  options: ExportOptions = {},
): Promise<string> {
  const { filename = "social-card.png", scale = 1, targetWidth } = options

  const elementWidth = element.offsetWidth || element.clientWidth || 540
  const pixelRatio = targetWidth
    ? (targetWidth * scale) / elementWidth
    : scale * 2

  const dataUrl = await toPng(element, {
    pixelRatio,
    cacheBust: true,
    quality: 1,
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
  options: { targetWidth?: number; scale?: number } = {},
): Promise<boolean> {
  const { targetWidth, scale = 1 } = options
  const elementWidth = element.offsetWidth || element.clientWidth || 540
  const pixelRatio = targetWidth
    ? (targetWidth * scale) / elementWidth
    : scale * 2

  const blob = await toBlob(element, {
    pixelRatio,
    cacheBust: true,
    quality: 1,
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
