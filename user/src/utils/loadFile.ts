import multer from "multer";
import path from "path";
import fs from "fs";


// Создаем папку static, если ее нет
const staticDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, staticDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const uploadImg = multer({ 
    storage: storage,
    limits: { fileSize: Number(process.env.MAX_FILE_SIZE) ?? 10*1024*1024}, // 10MB лимит
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Разрешены только файлы изображений'));
      }
    }
  }).single('file'); // 'file' - имя поля в форме