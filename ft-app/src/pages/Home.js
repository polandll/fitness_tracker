import astraZephyrLogo from '../astra_zephyr2.png';
import CreateUserForm from '../components/CreateUserForm';
import '../index.css'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <img src={astraZephyrLogo} alt="astraZephyrLogo" width="50" height="100" />
      <CreateUserForm />
    </div>
  );
}

export default Home;
