import { getAllUsers } from "./usersManager";

export const PostList = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getAllUsers().then((postData) => setUsers(postData));
    }, []);
  
    return ()