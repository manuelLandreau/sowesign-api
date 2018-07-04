import * as mongoose from 'mongoose';

export const RdsSchema = new mongoose.Schema({
    id: Number,
    idUser: Number,
    name: String,
});
