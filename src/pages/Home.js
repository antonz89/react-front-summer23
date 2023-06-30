import { useEffect} from "react"
import { useItemsContext } from "../hooks/useItemsContext"
import { useAuthContext } from "../hooks/useAuthContext"


//components
import ItemDetails from "../components/ItemDetails"
import ItemForm from "../components/ItemForm"

const Home = () => {
  // const [items, setItems] = useState(null)

  const { items, dispatch } = useItemsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:4000/items',{
        headers: {'Authorization': `Bearer ${user.token}`},
      } )
      const json = await response.json()

      if (response.ok) {
        // setItems(json)
        dispatch({type: 'SET_ITEMS', payload: json})
      }
    }
    
    if (user) {
      fetchItems()
    }

    
  }, [dispatch,user])

    return (
      <div className="home">
        <div className="items">
          {items && items.map(item => (
            <ItemDetails item={item} key={item._id} />
          ))}
        </div>
        <ItemForm />
      </div>
    )
  }
  
  export default Home