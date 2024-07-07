require('dotenv').config()
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wall_snaps'
});

db.connect(err => {
    if (err) {
        console.error('Connection Failed', err.stack);
        return;
    }
    console.log('Connection Successful to Database');
});

app.use(
    cors({
        origin : ['http://localhost:5173'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        methods : ['GET', 'POST'],
    })
)

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));

app.use(
    session({
        key : "id",
        secret : "sphere",
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires: 60*60*3,
        }
    })
)



// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/assets');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serving Static Files
app.use('/public/assets', express.static('public/assets'));

// User Login


// app.post('/users', (req, res) => {
//     const { username, password } = req.body;
//     const sql = "SELECT * FROM users WHERE username = ? ";
//     db.query(sql, [username], (err, data) => {
  
//         if (err) {
//             console.log('Error querying database:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }
//         if (data.length > 0) {
//             const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//             res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
//             req.session.user = data;
            
//             console.log(data)
//             console.log('Login successful for user:', username);
//             return res.json({ message: "Login Successful", token });
          
//         } else {
//             console.log('No record found for user:', username);
//             return res.status(401).json("Invalid Credentials");
//         }
//       });
//     });


app.get("/users", (req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

// Password reset route
// app.post('/users', (req, res) => {
//     const { username, newPassword } = req.body;
//     const sql = "UPDATE users SET password = ? WHERE id = ?";

//     db.query(sql, [newPassword, username], (err, result) => {
//         if (err) {
//             console.log('Error updating password:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }
//         if (result.affectedRows > 0) {
//             console.log('Password reset successful for user:', username);
//             return res.json({ message: 'Password reset successful' });
//         } else {
//             console.log('No record found for user:', username);
//             return res.status(404).json({ message: 'User not found' });
//         }
//     });
// });

// Privacy Policies - GET
app.get('/privacy_policies', (req, res) => {
    const query = 'SELECT * FROM privacy_policies ORDER BY id DESC LIMIT 1';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                return res.json({ content: results[0].content });
            } else {
                return res.json({ content: '' });
            }
        }
    });
});
// Privacy Policies - POST
app.post('/privacy_policies', (req, res) => {
    const {  content } = req.body;
    const query = 'INSERT INTO privacy_policies ( content) VALUES (?) ON DUPLICATE KEY UPDATE content = VALUES(content) ';
    db.query(query, [ content], (err, result) => {
        if (err) {
            console.log('Error saving privacy policy:', err);
            return res.status(500).json({ message: 'Database error' });
        } else {
            return res.json({ message: 'Privacy Policy saved successfully', content });
        }
    });
});

// Terms of Use - GET
app.get('/termsof_use', (req, res) => {
    const query = 'SELECT * FROM termsof_use ORDER BY id DESC LIMIT 1';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                return res.json({ content: results[0].content });
            } else {
                return res.json({ content: '' });
            }
        }
    });
});
// Terms of Use - POST
app.post('/termsof_use', (req, res) => {S
    const {  content } = req.body;
    const query = 'INSERT INTO termsof_use ( content) VALUES (?) ON DUPLICATE KEY UPDATE content = VALUES(content) ';
    db.query(query, [ content], (err, result) => {
        if (err) {
            console.log('Error saving privacy policy:', err);
            return res.status(500).json({ message: 'Database error' });
        } else {
            return res.json({ message: 'Privacy Policy saved successfully', content });
        }
    });
});


//Live Wallpaper Images - GET
app.get('/livewallpapers', (req, res) => {
    const sql = "SELECT * FROM  livewallpapers";
    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Failed to fetch data' });
        }
        return res.json(data);
    });
});
// Live Wallpaper Images - POST
app.post('/livewallpapers', upload.single('image'),(req, res) => {
    const { id,  category, type, tags, featured } = req.body;
    const thumbnail = req.file.path;
    const video = req.file.mimetype.startsWith('video');
    const newWallpaper = {
        id,
        thumbnail:video ? null : thumbnail,
        video: video ? thumbnail : null,
        category,
        type,
        tags,
        featured
    };

    const sql = 'INSERT INTO livewallpapers (id, thumbnail, video, category, type, tags, featured) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [newWallpaper], (err, result) => {
        if (err) {
            console.log('Error inserting into database:', err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }
        res.json(result);
    });
});
// Live Wallpapers Images - DELETE
app.delete('/livewallpapers/:id', (req, res) => {
    const { id } = req.params;
    const getImageSql = 'SELECT thumbnail FROM livewallpapers WHERE id = ?';
    db.query(getImageSql, [id], (err, result) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const imagePath = result[0].image;
        fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Error deleting image file:', unlinkErr);
                return res.status(500).json({ message: 'Failed to delete image' });
            }
            const deleteSql = 'DELETE FROM livewallpapers WHERE id = ?';
            db.query(deleteSql, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.log('Error deleting record:', deleteErr);
                    return res.status(500).json({ message: 'Failed to delete record' });
                }
                res.json(deleteResult);
            });
        });
    });
});
//Live Category Images - GET
app.get('/livecategories', (req, res) => {
    const sql = "SELECT * FROM  livecategories";
    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Failed to fetch data' });
        }
        return res.json(data);
    });
});
// Live Category Images - POST
app.post('/livecategories', upload.single('image'), (req, res) => {
    const { id, title, wallpapercount } = req.body;
    const image = req.file.path;

    const sql = 'INSERT INTO livecategories (id, image, title, wallpapercount) VALUES (?, ?, ?, ?)';

    db.query(sql, [id, image, title, wallpapercount], (err, result) => {
        if (err) {
            console.log('Error inserting into database:', err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }
        res.json(result);
    });
});

// Live Category Images - DELETE
app.delete('/livecategories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT image FROM livecategories WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const imagePath = result[0].image;
        fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Error deleting image file:', unlinkErr);
                return res.status(500).json({ message: 'Failed to delete image' });
            }
            const deleteSql = 'DELETE FROM livecategories WHERE id = ?';
            db.query(deleteSql, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting record:', deleteErr);
                    return res.status(500).json({ message: 'Failed to delete record' });
                }
                res.json(deleteResult);
            });
        });
    });
});
// Count Images by Path - GET
app.get('/image-count', (req, res) => {
    const query = `
        SELECT image, COUNT(*) as count
        FROM categories
        GROUP BY image
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});
// Category Images - GET
app.get('/new_cat', (req, res) => {
    const sql = "SELECT * FROM new_cat";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Failed to fetch data' });
        }
        return res.json(data);
    });
});

// Category Images - POST
app.post('/new_cat', upload.single('image'), (req, res) => {
    const { id, title, count } = req.body;
    const image = req.file.path;

    const sql = 'INSERT INTO new_cat (id, title, count, image) VALUES (?, ?, ?, ?)';

    db.query(sql, [id, title, count, image], (err, result) => {
        if (err) {
            console.log('Error inserting into database:', err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }
        res.json(result);
    });
});

// Category Images - PUT
app.put(`/new_cat/:id`,upload.single('image') ,(req, res) => {
    let  params;
    const { id } = req.params;
    const { title } = req.body;
    let image = req.file ? req.file.path : null;

    
    if (image) {
        sql = 'UPDATE new_cat SET title = ?, image = ? WHERE id = ?';
        params = [title, image, id];
    } else {
        sql = 'UPDATE new_cat SET title = ? WHERE id = ?';
        params = [title, id];
    }


    db.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error updating record:', err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }
       
        res.json(result);
    });
});

// Category Images - DELETE
app.delete('/new_cat/:id', (req, res) => {
    const { id } = req.params;
    const getImageSql = 'SELECT image FROM new_cat WHERE id = ?';
    db.query(getImageSql, [id], (err, result) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const imagePath = result[0].image;
        fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Error deleting image file:', unlinkErr);
                return res.status(500).json({ message: 'Failed to delete image' });
            }
            const deleteSql = 'DELETE FROM new_cat WHERE id = ?';
            db.query(deleteSql, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting record:', deleteErr);
                    return res.status(500).json({ message: 'Failed to delete record' });
                }
                res.json(deleteResult);
            });
        });
    });
});

// Wallpaper Gallery - GET
app.get('/wallpaper_gallery', (req, res) => {
    const sql = "SELECT * FROM wallpaper_gallery";
    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Failed to fetch data' });
        }
        return res.json(data);
    });
});

// Wallpaper Gallery - POST

app.post('/wallpaper_gallery', upload.single('image'), (req, res) => {
    const { id, category, type, tags, featured } = req.body;
    const image = req.file.path;
    const sql = 'INSERT INTO wallpaper_gallery (id, image, category, type, tags, featured) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [id, image, category, type, tags, featured], (err, result) => {
        if (err) {
            console.log('Error inserting into database:', err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }
        res.json(result);
    });
});

// Wallpaper Gallery - PUT
app.put('/wallpaper_gallery/:id', (req, res) => {
    const { id } = req.params;
    const { src, category, type, tags, featured } = req.body;
    const sql = 'UPDATE wallpaper_gallery SET src = ?, category = ?, type = ?, tags = ?, featured = ? WHERE id = ?';
    db.query(sql, [src, category, type, tags, featured, id], (err, result) => {
        if (err) {
            console.log('Error updating record:', err);
            return res.status(500).json({ message: 'Failed to update record' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(result);
    });
});

// Wallpaper Gallery - DELETE
app.delete('/wallpaper_gallery/:id', (req, res) => {
    const { id } = req.params;
    const getImageSql = 'SELECT image FROM wallpaper_gallery WHERE id = ?';
    db.query(getImageSql, [id], (err, result) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const imagePath = result[0].image;
        fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Error deleting image file:', unlinkErr);
                return res.status(500).json({ message: 'Failed to delete image' });
            }
            const deleteSql = 'DELETE FROM wallpaper_gallery WHERE id = ?';
            db.query(deleteSql, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.log('Error deleting record:', deleteErr);
                    return res.status(500).json({ message: 'Failed to delete record' });
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
