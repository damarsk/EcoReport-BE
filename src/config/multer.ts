import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"))
  },
  filename: (req, file, cb) => {
    const customFileName = uuidv4()
    const fileExtension = path.extname(file.originalname)
    cb(null, `${customFileName}${fileExtension}`)
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }
})