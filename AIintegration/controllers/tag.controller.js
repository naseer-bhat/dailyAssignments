
import Tag from '../models/Tag.model.js';
export const createTag = async (req, res) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};