import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, userForm, forNewUser = true }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [ errors, setErrors ] = useState({})
    const [ message, setMessage ] = useState('')

    const [ form, setForm ] = useState({
        first_name: userForm.first_name,
        last_name: userForm.last_name,
        age: userForm.age
    })

    const putData = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType
                },
                body: JSON.stringify(form)
            })

            if(!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`api/pets/${id}`, data, false)
            router.push('/')
        } catch (err) {
            setMessage('Failed to update employee')
        }
    }
    
    const postData = async (form) => {

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType
                },
                body: JSON.stringify(form)
            })

            if(!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (err) {
            setMessage('Failed to add employee')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewUser ? postData(form) : putData(form)
        } else {
            setErrors({ errs })
        }
    }

    const formValidate = () => {
        let err = {}
        if (!form.first_name) err.first_name = 'Name is required'
        if (!form.last_name) err.last_name = 'Name is required'

        return err
    }

    return (
        <> 
            <form id={formId} onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text"
                    maxLength="20"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text"
                    maxLength="30"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age</label>
                <input 
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                />

                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => {
                    <li key={index}>{err}</li>
                })}
            </div>
        </>
    )
}

export default Form