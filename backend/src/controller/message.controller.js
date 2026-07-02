const Message = require('../model/Message'); // Assumes you have a Message.js model

/**
 * @brief Submit a new contact message (POST /api/messages)
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Validate required inputs on the controller level (additional security)
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All contact fields are required' });
        }

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({ 
            message: 'Message submitted successfully!', 
            data: newMessage 
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/**
 * @brief Retrieve all contact messages (GET /api/messages - Admin only)
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getAllMessages = async (req, res) => {
    try {
        // Find all messages sorted by the newest first
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            message: 'Messages loaded successfully', 
            data: messages 
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages
};

