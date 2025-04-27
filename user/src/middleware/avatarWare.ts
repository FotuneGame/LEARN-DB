import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';


// Типизация для Multer
interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

// Конфигурация пути для загрузки
const uploadDir = path.join(__dirname, '../../public/files');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Настройка Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `avatar-${uniqueSuffix}${ext}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    fields: 3 // Количество текстовых полей (first_name, second_name, middle_name)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только изображения (JPEG, PNG, GIF)'));
    }
  }
});

const avatarWare = (req: Request, res: Response, next: NextFunction) => {
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'first_name', maxCount: 1 },
    { name: 'second_name', maxCount: 1 },
    { name: 'middle_name', maxCount: 1 }
  ])(req, res, (err: unknown) => {
    if (err) {
      // Обработка ошибок Multer
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          error: 'Ошибка загрузки файла',
          code: err.code,
          message: err.code === 'LIMIT_FILE_SIZE' 
            ? 'Размер файла не должен превышать 10MB' 
            : err.message
        });
      }
      return res.status(500).json({
        error: 'Ошибка сервера',
        details: err instanceof Error ? err.message : 'Неизвестная ошибка'
      });
    }

    // Типизированный доступ к files
    const files = req.files as MulterFiles;
    const avatarFile = req.file ? req.file : (files['avatar']?.[0] || null);

    // Формируем структурированные данные
    req.body = {
      ...req.body,
      avatar: avatarFile ? {
        path: avatarFile.path,
        filename: avatarFile.filename,
        originalname: avatarFile.originalname
      } : null
    };
    next();
  });
};

export default avatarWare;