import { useItemsContext } from '../hooks/useItemsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ItemDetails = ({ item }) => {
  const { dispatch } = useItemsContext()
  const { user } = useAuthContext()


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/items/' + item._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ITEM', payload: json})
    }
  }

    return (
       


        <div className="item-details">
          <div className="item-text">
            <p><strong>Item: </strong>{item.title}</p>
            <p><strong>Size: </strong> {item.size}</p> 
            <p><strong>Cost: </strong> ${item.cost} </p>
            <p><strong>Added: </strong>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
          </div>

          <div className="pic-details">
            <img src={item.image} alt="qqq" />
          </div>


          

        </div>
        


        
        
        
        


    )
  }
  
  export default ItemDetails