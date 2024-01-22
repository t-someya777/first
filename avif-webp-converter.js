import c from 'ansi-colors'
import fs from 'fs'
import log from 'fancy-log'
import globule from 'globule'
import sharp from 'sharp'

class AvifWebpConverter {
  constructor(options = {}) {
    this.srcBase = options.srcBase || 'src'
    this.distBase = options.distBase || 'dist'
    this.includeExtensionName = options.includeExtensionName || false
    this.formats = options.formats || [
      {
        type: 'avif',
        quality: 80
      },
      {
        type: 'webp',
        quality: 80
      }
    ]
    this.srcImages = `${this.srcBase}/**/*.{jpg,jpeg,png}`
    this.init()
  }

  init = async () => {
    const imagePathList = this.findImagePaths()
    await this.convertImagesToAvifAndWebp(imagePathList)
  }

  findImagePaths = () => {
    return globule.find({
      src: [this.srcImages]
    })
  }

  convertImage = async (imagePath, format) => {
    const reg = /\/(.*)\.(jpe?g|png)$/i
    const [, imageName, imageExtension] = imagePath.match(reg)
    const imageFileName = this.includeExtensionName
      ? `${imageName}.${imageExtension}`
      : imageName
    const distPath = `${this.distBase}/${imageFileName}.${format}`
    try {
      const converter = sharp(imagePath)
      for (const format of this.formats) {
        converter[format.type]({ quality: format.quality })
      }
      await converter.toFile(distPath)
      log(
        `Converted ${c.blue(imagePath)} to ${c.yellow(
          format.toUpperCase()
        )} ${c.green(distPath)}`
      )
    } catch (err) {
      log(
        c.red(
          `Error converting image to ${c.yellow(format.toUpperCase())}\n${err}`
        )
      )
    }
  }

  convertImagesToAvifAndWebp = async (imagePathList) => {
    if (imagePathList.length === 0) {
      log(c.red('No images found to convert'))
      return
    }
    for (const imagePath of imagePathList) {
      const reg = new RegExp(`^${this.srcBase}/(.*/)?`)
      const path = imagePath.match(reg)[1] || ''
      const distDir = `${this.distBase}/${path}`
      if (!fs.existsSync(distDir)) {
        try {
          fs.mkdirSync(distDir, { recursive: true })
          log(`Created directory ${c.green(distDir)}`)
        } catch (err) {
          log(`Failed to create directory ${c.green(distDir)}\n${err}`)
        }
      }
      const conversionPromises = this.formats.map((format) =>
        this.convertImage(imagePath, format.type)
      )
      await Promise.all(conversionPromises)
    }
  }
}
const converter = new AvifWebpConverter()
