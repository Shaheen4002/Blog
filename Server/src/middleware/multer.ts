import multer from 'multer';
import path from "path";

// in storage object we define where we going to store the images , the file name .... 
const storage = multer.diskStorage({
    // file is a variable contain the actual file
    destination : (req , file , cb)=>{
        // cb take two arguments first one what we gonna do if an error accours and second one the actual destination
        cb(null,"../Client/public")
    },

    filename : (req , file , cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage});

export default upload;