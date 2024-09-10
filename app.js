const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

// Route for handling file uploads and LLM processing
app.post('/generate-instructions', upload.array('screenshots', 10), async (req, res) => {
    const context = req.body.context || '';
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No screenshots uploaded' });
    }

    try {
        // Simulate multimodal LLM request with uploaded files and context
        const response = await axios.post('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning', {
            image: files[0],  // Handle image upload
            context: context  // Optional text
        }, {
            headers: {
                'Authorization': `Bearer YOUR_HUGGINGFACE_API_KEY`
            }
        });
        

        const instructions = response.data;
        res.json(instructions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating instructions' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
