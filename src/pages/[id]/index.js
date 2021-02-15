import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import dbConnect from '../../util/connect'
import Employee from '../../models/Employee'

const UserPage = ({ user }) => {
    const router = useRouter()
    const [ message, setMessage ] = useState('')
    const handleDelete = async () => {
        const userID = router.query.id

        try {
            await fetch(`/api/users/${userID}`, {
                method: 'Delete'
            })
            router.push('/')
        } catch (err) {
            setMessage('Failed to delete the employee')
        }
    }

    return (
        <div key={user._id}>
            <div className="card">
                <h5 className="employee-first_name">{user.first_name}</h5>
                <div className="main-content">
                    <p className="employee-first_name">{user.first_name}</p>
                    <p className="employee-last_name">{user.last_name}</p>
                    <p className="employee-age">{user.age}</p>
                </div>

                <div className="btn-container">
                    <Link href="/[id]/edit" as={`/${user._id}/edit`}>
                        <button className="btn edit">Edit</button>
                    </Link>
                    <button className="btn delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect()

    const user = await Employee.findById(params.id).lean()
    user._id = user._id.toString()

    return { props: { user }}
}

export default UserPage