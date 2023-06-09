const createError = require("http-errors");
const multerObjectMaker = require("../utilities/multerObjectMaker");

const singleUpload = (fieldName) => async (req, res, next) => {
  try {
    const upload = multerObjectMaker(
      "images",
      ["image/jpg", "image/jpeg", "image/png"],
      1024 * 1024,
      "Only jpg, jpeg or png file accepted"
    );

    await upload.single(fieldName)(req, res, (err) => {
      if (err) {
        res.status(500);
        next(err);
      } else {
        if (req.file) {
          const data = {
            filename: req.file.filename,
            link: process.env.APP_URL + "/uploads/images/" + req.file.filename,
          };

          req.file = data;
        }

        next();
      }
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    next(createError(error));
  }
};

const multipleUpload = (fieldName, maxItem) => async (req, res, next) => {
  try {
    const upload = multerObjectMaker(
      "images",
      ["image/jpg", "image/jpeg", "image/png"],
      1024 * 1024,
      "Only jpg, jpeg or png file accepted"
    );

    await upload.array(fieldName, maxItem)(req, res, (err) => {
      if (err) {
        res.status(500);
        next(createError(err));
      } else {
        if (req.files) {
          const data = req.files.map((file) => {
            return {
              filename: file.filename,
              link: process.env.APP_URL + "/uploads/images/" + file.filename,
            };
          });

          req.files = data;
        }

        next();
      }
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    next(createError(error));
  }
};

module.exports = {
  singleUpload,
  multipleUpload,
};
