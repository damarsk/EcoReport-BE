import multer from "multer"

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only jpeg, jpg, png, and webp files are allowed'))
    }
}

export const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})