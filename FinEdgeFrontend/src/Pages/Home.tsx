type User = {
  name: string;
  surname: string;
  email: string;
  password: string
}

const Home = ({ user }: { user: User }) => {
  return (
    <>
      {user ? (
        `Name: ${user.name}, Surname: ${user.surname}, Email: ${user.email}`
      ) : (
        "You are not logged in"
      )}
    </>
  )
}

export default Home;