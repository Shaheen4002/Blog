import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress ,Container} from '@mui/material';
import { useParams } from 'react-router-dom';

interface Post {
  title: string;
  description: string;
  content: string;
  image?: string;
}

 

const EditPostForm = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {id} = useParams();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState<Post>({
    title: '',
    description: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    // Fetch existing post data
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3004/posts/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        
        setPost(data);
        setFormData({
          title: data.title,
          description: data.description,
          content: data.content,
          image: data.image || '',
        });
      } catch (err) {
        setError('Failed to fetch post  ' + err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('content', formData.content);
    if (formData.image) {
      form.append('image', formData.image); // If image exists, append
    }

    try {
      const response = await fetch(`http://localhost:3004/posts/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`  ,
        },
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Post updated successfully');
        setPost(data);  // Optionally update the state with the new data
      } else {
        throw new Error('Failed to update post');
      }
    } catch (err) {
      setError("Failed to update post");
      alert(error)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ width: "30%", mt: 4,}}>
  <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
    Edit Post
  </Typography>
  <form onSubmit={handleSubmit}>
    <TextField
      label="Title"
      variant="outlined"
      fullWidth
      margin="normal"
      name="title"
      value={formData.title}
      onChange={handleChange}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      margin="normal"
      name="description"
      value={formData.description}
      onChange={handleChange}
    />
    <TextField
      label="Content"
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      margin="normal"
      name="content"
      value={formData.content}
      onChange={handleChange}
    />
    {/* Styled button for file upload */}
    <Button
      variant="contained"
      color="primary"
      fullWidth
      component="label"
      sx={{ mt: 2 }}
    >
      Upload Image
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </Button>
    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:2}}>
      Update Post
    </Button>
  </form>
</Container>

  );
};

export default EditPostForm;
