import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';

// Create new user function
const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).json({
            message: 'User created successfully'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// List all users function
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Retrieve user profile
const read = (req, res) => {
    req.profile.hash_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

// Update user profile
const update = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hash_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Remove user function
const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hash_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Find Specific User function
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default {create, list, read, update, remove, userByID};