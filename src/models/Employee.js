import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'O campo first_name é obrigatório'],
        maxlength: [20, 'Não pode ultrapassar 20 caracteres']
    }, 
    last_name: {
        type: String,
        required: [true, 'O campo last_name é obrigatório'],
        maxlength: [30, 'Não pode ultrapassar 30 caracteres']
    },
    age: {
        type: Number,
    }
})

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)