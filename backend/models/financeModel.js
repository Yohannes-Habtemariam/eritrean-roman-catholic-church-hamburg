import mongoose from "mongoose";

const { Schema } = mongoose;

const financeSchema = new Schema({
    offer: { type: Number, required: true },
    donation: { type: Number, required: true },
    priestExpense: { type: Number, required: true },
    choirExpense: { type: Number, required: true },
    generalExpense: { type: Number, required: true },
    date: { type: Date, required: true, unique: true },
    total: { type: Number, required: false }
}, { timestamps: true });

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;