import multer from 'multer';

const storage = multer.memoryStorage(); // Simpan file di buffer

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal file 5MB
  fileFilter: (req, file, cb) => {
    const extname = file.mimetype.split('/')[1].toLowerCase();
    if (extname !== 'jpeg' && extname !== 'png' && extname !== 'jpg') {
      return cb(new Error('Only image files are allowed') as any, false);
    }
    cb(null, true);
  }
});

export default upload;
