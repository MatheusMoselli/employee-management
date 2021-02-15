import Link from 'next/link'
import Employee from '../models/Employee'
import dbConnect from '../util/connect'

const Index = ({ users }) => (
  <> 
    {users.map((user) => (
      <div key={user._id}>
        <div className="card">
          <h5 className="employee-first_name">{user.first_name}</h5>
          <div className="main-content">
            <p className="employee-first_name">{user.first_name}</p>
            <p className="employee-last_name">{user.last_name}</p>
            <p className="employee-age">{user.age}</p>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${user._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${user._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

export async function getServerSideProps() {
  await dbConnect()

  const result = await Employee.find({})
  const users = result.map((doc) => {
    const user = doc.toObject()
    user._id = user._id.toString()
    return user
  })

  return { props: { users: users } }
}

export default Index;