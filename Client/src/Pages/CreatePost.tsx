 import  { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error , setError] = useState("");

    const handleImageChange = (e : any) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        if(!title || !description || !content ){
            setError("check submited data");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3004/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your JWT handling
                },
            });
            alert("post created successfully")
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container sx={{width:"30%" , mt:4 ,mb:8}}>
            <Typography variant="h5" sx={{textAlign : "center", mb:2}}>Create Post</Typography>
            <Box mb={2}>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Content"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                />
            </Box>
            <Box mb={2}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                    <Button
                        variant="contained"
                        component="span"
                        fullWidth
                    >
                        Upload Image
                    </Button>
                </label>
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Create Post
            </Button>
            {error && (
              <Typography sx={{ color: "red", textAlign: "center" ,mt:2 }}>
                {error}
              </Typography>
            )}
            </Container>
        </form>
    );
};

export default CreatePost;
