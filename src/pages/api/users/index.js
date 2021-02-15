import connectDb from '../../../util/connect';
import Employee from '../../../models/Employee';

export default async function handler(req, res) {
    const { method } = req

    await connectDb();

    switch (method) {
        case 'GET':
            try {
                const users = await Employee.find({})
                res.status(200).json({ data: users })
            } catch (err) {
                res.status(405).json({ sucess: false })
            }
            break;
        case 'POST':
            try {
                const user = await Employee.create(
                    req.body
                )
                res.status(201).json({ data: user })
            } catch (err) {
                res.status(405).json({ sucess: false })
            }
            break;
        default:
            res.status(405).json({ sucess: false })
            break;
    }
}