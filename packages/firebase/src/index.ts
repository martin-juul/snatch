import * as functions from 'firebase-functions'
import { dirname, join } from 'path'
import { tmpdir } from 'os'
import * as sharp from 'sharp'
import * as fs from 'fs-extra'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const resizeImage = functions.https.onRequest((request, response) => {
  functions
    .runWith({memory: '2GB', timeoutSeconds: 120})
    .storage
    .object()
    .onFinalize(async (object) => {
      const bucket = functions.storage.bucket(object.bucket)
      const filePath = object.name

      if (!filePath) {
        console.error(`filePath at: ${filePath} does not exist`)
        return
      }

      const fileName = filePath.split('/').pop() as string
      const bucketDir = dirname(filePath)

      const workingDir = join(tmpdir(), 'resize')
      const tmpFilePath = join(workingDir, 'source.png')

      console.log(`Got ${fileName} file`)

      if (fileName.includes('@s_') || (object.contentType && !object.contentType.includes('image'))) {
        console.log(`Already resized. Exiting function`)
        return false
      }

      await fs.ensureDir(workingDir)
      await bucket.file(filePath).download({destination: tmpFilePath})

      const sizes = [1920, 720, 100]

      const uploadPromises = sizes.map(async (size) => {

        console.log(`Resizing ${fileName} at size ${size}`)

        const ext = fileName.split('.').pop()
        const imgName = fileName.replace(`.${ext}`, '')
        const newImgName = `${imgName}@s_${size}.${ext}`
        const imgPath = join(workingDir, newImgName)
        await sharp(tmpFilePath).resize({width: size}).toFile(imgPath)

        console.log(`Just resized ${newImgName} at size ${size}`)

        return bucket.upload(imgPath, {
          destination: join(bucketDir, newImgName),
        })

      })

      await Promise.all(uploadPromises)

      return fs.remove(workingDir)

    }
})
