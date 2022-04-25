export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      getPosts().then((postData) => setPosts(postData));
    }, []);
  
    return ()