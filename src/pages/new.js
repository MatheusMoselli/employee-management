import { mutate } from 'swr'
import Form from '../components/Form'

const newUser = () => {
    const userForm = {
        first_name: '',
        last_name: '',
        age: 0
    }

    return <Form formId="add-user-form" userForm={userForm} />
}

export default newUser