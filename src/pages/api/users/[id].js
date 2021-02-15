import dbConnect from '../../../util/connect'
import Employee from '../../../models/Employee'

export default async function handler(req, res) {
    const { 
        query: { id },
        method
    } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const user = await Employee.findById(id)
                if(!user) {
                    res.status(404).json({ sucess: false })
                }
                res.status(200).json({ data: user })
            } catch (err) {
                res.status(404).json({ sucess: false })
            }
            break;
        case 'PUT': 
            try {
                const user = await Employee.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })
                if (!user) {
                    return res.status(404).json({ sucess: false })
                }
                res.status(201).json({ data: user })
            } catch (err) {
                res.status(404).json({ sucess: false })
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await Employee.deleteOne({ _id: id })
                if (!deletedUser) {
                    res.status(404).json({ sucess: false })
                }
                res.status(200).json({ data: user })
            } catch (err) {      
                res.status(404).json({ sucess: false })
            }
            break;
        default:
            res.status(404).json({ sucess: false })
            break;
    }
}