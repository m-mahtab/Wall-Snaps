require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const sharp = require('sharp')
const app = express();
const port = process.env.PORT;

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wall_snaps",
});
const query = promisify(db.query).bind(db);

app.use(
  cors({
    origin: ["http://localhost:5173"], // Update to your frontend URL
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    key: "connect.sid",
    secret: "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

db.connect((err) => {
  if (err) {
    console.error("Connection Failed", err.stack);
    return;
  }
  console.log("Connection Successful to Database");
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname && filetypes) {
      return cb(null, true);
    } else {
      cb(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      );
    }
  },
});

// Serving Static Files
app.use("/public/assets", express.static("public/assets"));

app.use("/public", express.static("public"));

// User Login

app.post("/users", (rq, rs) => {
  const sql = "SELECT * FROM users WHERE username =? AND password = ?";

  db.query(sql, [rq.body.username, rq.body.password], (err, data) => {
    if (err) return rs.json("Error");
    if (data.length > 0) {
      rq.session.username = data[0].username;
      console.log(rq.session.username);

      if (data[0].username == rq.body.username) {
        return rs.json({ login: true });
      } else {
        return rs.json({ login: false });
      }
    } else {
      return rs.json({ login: false });
    }
  });
});
// Session Management
app.get("/users", (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    res.clearCookie("connect.sid");
    return res.json({ valid: false });
  }
});

//Logout
app.post("/logout", (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Ensure this matches your cookie name
      console.log("Cookie Cleared");
      return res.status(200).json({ message: "Logout successful" });
    });
  } else {
    return res.status(200).json({ message: "No user logged in" });
  }
});

// Password reset route

app.post("/reset-password", async (req, res) => {

  const { oldPassword, newPassword, id } = req.body;
  const userId = id ;
  
  console.log('User ID : ', userId)


  if ( !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old and new passwords are required" });
  }

  try {
    // Retrieve the current password from the database
    const [rows] = await query(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );
    console.log("Query result:", [rows]);

    // if (!rows || rows.length === 0) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // const currentPassword = rows[0].password;

    // // Compare old password with the current password
    // if (oldPassword !== currentPassword) {
    //   return res.status(400).json({ message: "Old password is incorrect" });
    // }

    // // Hash the new password and update it in the database
    // await query("UPDATE users SET password = ? WHERE username = ?", [
    //   newPassword,
    //   username,
    // ]);

    // res.json({ message: "Password reset successful" });
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

});

// Privacy Policies - GET
app.get("/privacy_policies", (req, res) => {
  const query = "SELECT * FROM privacy_policies ORDER BY id DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (results.length > 0) {
        return res.json({ content: results[0].content });
      } else {
        return res.json({ content: "" });
      }
    }
  });
});
// Privacy Policies - POST
app.post("/privacy_policies", (req, res) => {
  const { content } = req.body;
  const query =
    "INSERT INTO privacy_policies ( content) VALUES (?) ON DUPLICATE KEY UPDATE content = VALUES(content) ";
  db.query(query, [content], (err, result) => {
    if (err) {
      console.log("Error saving privacy policy:", err);
      return result.status(500).json({ message: "Database error" });
    } else {
      return result.json({
        message: "Privacy Policy saved successfully",
        content,
      });
    }
  });
});

// Terms of Use - GET
app.get("/termsof_use", (req, res) => {
  const query = "SELECT * FROM termsof_use ORDER BY id DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (results.length > 0) {
        return res.json({ content: results[0].content });
      } else {
        return res.json({ content: "" });
      }
    }
  });
});
// Terms of Use - POST
app.post("/termsof_use", (req, res) => {
  const { content } = req.body;
  const query =
    "INSERT INTO termsof_use ( content) VALUES (?) ON DUPLICATE KEY UPDATE content = VALUES(content) ";
  db.query(query, [content], (err, result) => {
    if (err) {
      console.log("Error saving privacy policy:", err);
      return res.status(500).json({ message: "Database error" });
    } else {
      return res.json({
        message: "Privacy Policy saved successfully",
        content,
      });
    }
  });
});

//Live Wallpaper Images - GET
app.get("/livewallpapers", (req, res) => {
  const sql = "SELECT * FROM  livewallpapers";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Failed to fetch data" });
    }
    return res.json(data);
  });
});

// Search Live Wallpapers

app.get("/wallpaper_gallery/search", (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM wallpaper_gallery WHERE category LIKE '%${query}%'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error searching wallpapers:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});

// Live Wallpaper Images - POST
app.post(
  "/livewallpapers",
  upload.fields([{ name: "thumbnail" }, { name: "video" }]),
  async (req, res) => {
    try {
      const { id, category, type, tags, featured } = req.body;
      const thumbnail = req.files["thumbnail"]
        ? req.files["thumbnail"][0].path
        : null;
      const video = req.files["video"] ? req.files["video"][0].path : null;

      if (!thumbnail) {
        return res.status(400).json({ message: "Thumbnail is required" });
      }

      const reducedPath = path.join(
        "uploads",
        `reduced_${path.basename(thumbnail)}`
      );

      // Reduce image quality and save it
      await sharp(thumbnail).jpeg({ quality: 50 }).toFile(reducedPath);

      const sql =
        "INSERT INTO livewallpapers (id, thumbnail, reducedThumbnail, video, category, type, tags, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [id, thumbnail, reducedPath, video, category, type, tags, featured],
        (err, result) => {
          if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ message: "Failed to insert data" });
          }
          res.send("Live wallpaper data inserted into database");
        }
      );
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).send("Server error");
    }
  }
);
//Live WallPapers - PUT
app.put(
  "/livewallpapers/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  (req, res) => {
    const { id } = req.params;
    const { category, livetype, tags } = req.body;
    let thumbnail = req.files.thumbnail ? req.files.thumbnail[0].path : null;
    let video = req.files.video ? req.files.video[0].path : null;

    // Fetch the existing entry
    const fetchSql = "SELECT * FROM livewallpapers WHERE id = ?";
    db.query(fetchSql, [id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.log("Error fetching record:", fetchErr);
        return res.status(500).json({ message: "Failed to fetch data" });
      }

      if (fetchResult.length === 0) {
        return res.status(404).json({ message: "Record not found" });
      }

      const currentRecord = fetchResult[0];

      // Use current values if new values are not provided
      const updatedCategory = category || currentRecord.category;
      const updatedLivetype = livetype || currentRecord.livetype;
      const updatedTags = tags || currentRecord.tags;
      const updatedThumbnail = thumbnail || currentRecord.thumbnail;
      const updatedVideo = video || currentRecord.video;

      // Update the entry
      const updateSql =
        "UPDATE livewallpapers SET category = ?, livetype = ?, tags = ?, thumbnail = ?, video = ? WHERE id = ?";
      const params = [
        updatedCategory,
        updatedLivetype,
        updatedTags,
        updatedThumbnail,
        updatedVideo,
        id,
      ];

      db.query(updateSql, params, (updateErr, updateResult) => {
        if (updateErr) {
          console.log("Error updating record:", updateErr);
          return res.status(500).json({ message: "Failed to update data" });
        }
        res.json({
          id,
          category: updatedCategory,
          livetype: updatedLivetype,
          tags: updatedTags,
          thumbnail: updatedThumbnail,
          video: updatedVideo,
        });
      });
    });
  }
);

// Live wallpaper feature update

app.put("/livewallpapers/:id/featured", (req, res) => {
  const { id } = req.params;
  const { featured } = req.body; // expecting boolean value
  const query = "UPDATE livewallpapers SET featured = ? WHERE id = ?";

  db.query(query, [featured, id], (error, results) => {
    if (error) {
      console.error("Error updating featured status:", error);
      return res
        .status(500)
        .json({ error: "Failed to update featured status" });
    }
    res.status(200).json({ message: "Featured status updated successfully" });
  });
});

// Live Wallpapers Images - DELETE
app.delete("/livewallpapers/:id", (req, res) => {
  const { id } = req.params;
  const getImageSql =
    "SELECT thumbnail, video FROM livewallpapers WHERE id = ?";
  db.query(getImageSql, [id], (err, result) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = result[0].thumbnail;
    const videoPath = result[0].video;

    fs.unlink(imagePath, (unlinkErr1) => {
      if (unlinkErr1) {
        console.log("Error deleting image file:", unlinkErr1);
        return res.status(500).json({ message: "Failed to delete image" });
      }
      fs.unlink(videoPath, (unlinkErr2) => {
        if (unlinkErr2) {
          console.log("Error deleting video file:", unlinkErr2);
          return res.status(500).json({ message: "Failed to delete video" });
        }
        const deleteSql = "DELETE FROM livewallpapers WHERE id = ?";
        db.query(deleteSql, [id], (deleteErr, deleteResult) => {
          if (deleteErr) {
            console.log("Error deleting record:", deleteErr);
            return res.status(500).json({ message: "Failed to delete record" });
          }
          res.json(deleteResult);
        });
      });
    });
  });
});

//Live Category Images - GET
app.get("/livecategories", (req, res) => {
  const sql = "SELECT * FROM  livecategories";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Failed to fetch data" });
    }
    return res.json(data);
  });
});

// Endpoint for searching categories by title
app.get("/livecategories/search", (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM livecategories WHERE title LIKE '%${query}%'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error searching categories:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});
// Live Category Images - POST
app.put("/livecategories/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let image = req.file ? req.file.path : null;
  let sql;
  let params;

  if (image) {
    sql =
      "UPDATE livecategories SET title = ?, image = IFNULL(?, image) WHERE id = ?";
    params = [title, image, id];
  } else {
    sql = "UPDATE livecategories SET title = ? WHERE id = ?";
    params = [title, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error updating record:", err);
      return res.status(500).json({ message: "Failed to update data" });
    }

    // Retrieve the updated entry to send back to the client
    db.query(
      "SELECT * FROM livecategories WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log("Error fetching updated record:", err);
          return res
            .status(500)
            .json({ message: "Failed to fetch updated data" });
        }
        res.json(results[0]);
      }
    );
  });
});

// Live Category Images - DELETE
app.delete("/livecategories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT image FROM livecategories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length == 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = result[0].image;
    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.log("Error deleting image file:", unlinkErr);
        return res.status(500).json({ message: "Failed to delete image" });
      }
      const deleteSql = "DELETE FROM livecategories WHERE id = ?";
      db.query(deleteSql, [id], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error("Error deleting record:", deleteErr);
          return res.status(500).json({ message: "Failed to delete record" });
        }
        res.json(deleteResult);
      });
    });
  });
});
// Count Images by Path - GET
app.get("/image-count", (req, res) => {
  const query = `
        SELECT image, COUNT(*) as count
        FROM new_cat
        GROUP BY image HAVING COUNT(*) >= 1;
    `;
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Category Images - GET
app.get("/new_cat", (req, res) => {
  const sql = "SELECT * FROM new_cat";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Failed to fetch data" });
    }
    return res.json(data);
  });
});

// Endpoint for searching categories by title
app.get("/new_cat/search", (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM categories WHERE title LIKE '%${query}%'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error searching categories:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});

// Category Images - POST
app.post("/new_cat", upload.single("image"), (req, res) => {
  const { id, title, count } = req.body;
  const image = req.file.path;

  const sql =
    "INSERT INTO new_cat (id, title, count, image) VALUES (?, ?, ?, ?)";

  db.query(sql, [id, title, count, image], (err, result) => {
    if (err) {
      console.log("Error inserting into database:", err);
      return res.status(500).json({ message: "Failed to insert data" });
    }
    res.json(result);
  });
});

// Category Images - PUT
app.put("/new_cat/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let image = req.file ? req.file.path : null;
  let sql;
  let params;

  if (image) {
    sql = "UPDATE new_cat SET title = ?, image = IFNULL(?, image) WHERE id = ?";
    params = [title, image, id];
  } else {
    sql = "UPDATE new_cat SET title = ? WHERE id = ?";
    params = [title, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error updating record:", err);
      return res.status(500).json({ message: "Failed to update data" });
    }

    // Retrieve the updated entry to send back to the client
    db.query("SELECT * FROM new_cat WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.log("Error fetching updated record:", err);
        return res
          .status(500)
          .json({ message: "Failed to fetch updated data" });
      }
      res.json(results[0]);
    });
  });
});

// Category Images - DELETE
app.delete("/new_cat/:id", (req, res) => {
  const { id } = req.params;
  const getImageSql = "SELECT image FROM new_cat WHERE id = ?";
  db.query(getImageSql, [id], (err, result) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = result[0].image;
    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.log("Error deleting image file:", unlinkErr);
        return res.status(500).json({ message: "Failed to delete image" });
      }
      const deleteSql = "DELETE FROM new_cat WHERE id = ?";
      db.query(deleteSql, [id], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error("Error deleting record:", deleteErr);
          return res.status(500).json({ message: "Failed to delete record" });
        }
        res.json(deleteResult);
      });
    });
  });
});

// Wallpaper Gallery - GET
app.get("/wallpaper_gallery", (req, res) => {
  const sql = "SELECT * FROM wallpaper_gallery";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Failed to fetch data" });
    }
    return res.json(data);
  });
});

// Endpoint for searching Wallpapers by category, tags
app.get("/wallpaper_gallery/search", (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM wallpaper_gallery WHERE category LIKE '%${query}%'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error searching wallpapers:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});

// Wallpaper Gallery - POST

app.post("/wallpaper_gallery", upload.single("image"), (req, res) => {
  const { id, category, type, tags, featured } = req.body;
  const image = req.file.path;
  const sql =
    "INSERT INTO wallpaper_gallery (id, image, category, type, tags, featured) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, image, category, type, tags, featured], (err, result) => {
    if (err) {
      console.log("Error inserting into database:", err);
      return res.status(500).json({ message: "Failed to insert data" });
    }
    res.json(result);
  });
});

// wallpaper feature update

app.put("/wallpaper_gallery/:id/featured", (req, res) => {
  const { id } = req.params;
  const { featured } = req.body; // expecting boolean value
  const query = "UPDATE wallpaper_gallery SET featured = ? WHERE id = ?";

  db.query(query, [featured, id], (error, results) => {
    if (error) {
      console.error("Error updating featured status:", error);
      return res
        .status(500)
        .json({ error: "Failed to update featured status" });
    }
    res.status(200).json({ message: "Featured status updated successfully" });
  });
});

// Wallpaper Gallery - PUT
app.put("/wallpaper_gallery/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { category, type, tags } = req.body;
  let image = req.file ? req.file.path : null;

  // Fetch the existing entry
  const fetchSql = "SELECT * FROM wallpaper_gallery WHERE id = ?";
  db.query(fetchSql, [id], (fetchErr, fetchResult) => {
    if (fetchErr) {
      console.log("Error fetching record:", fetchErr);
      return res.status(500).json({ message: "Failed to fetch data" });
    }

    if (fetchResult.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    const currentRecord = fetchResult[0];

    // Use current values if new values are not provided
    const updatedCategory = category || currentRecord.category;
    const updatedType = type || currentRecord.type;
    const updatedTags = tags || currentRecord.tags;
    const updatedImage = image || currentRecord.image;

    // Update the entry
    const updateSql =
      "UPDATE wallpaper_gallery SET category = ?, type = ?, tags = ?, image = ? WHERE id = ?";
    const params = [
      updatedCategory,
      updatedType,
      updatedTags,
      updatedImage,
      id,
    ];

    db.query(updateSql, params, (updateErr, updateResult) => {
      if (updateErr) {
        console.log("Error updating record:", updateErr);
        return res.status(500).json({ message: "Failed to update data" });
      }
      res.json({
        id,
        category: updatedCategory,
        type: updatedType,
        tags: updatedTags,
        image: updatedImage,
      });
    });
  });
});

// Wallpaper Gallery - DELETE
app.delete("/wallpaper_gallery/:id", (req, res) => {
  const { id } = req.params;
  const getImageSql = "SELECT image FROM wallpaper_gallery WHERE id = ?";
  db.query(getImageSql, [id], (err, result) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = result[0].image;
    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.log("Error deleting image file:", unlinkErr);
        return res.status(500).json({ message: "Failed to delete image" });
      }
      const deleteSql = "DELETE FROM wallpaper_gallery WHERE id = ?";
      db.query(deleteSql, [id], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.log("Error deleting record:", deleteErr);
          return res.status(500).json({ message: "Failed to delete record" });
        }
        res.json(deleteResult);
      });
    });
  });
});

// Server Listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
