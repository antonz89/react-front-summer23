import { useState } from 'react'
import { useItemsContext } from '../hooks/useItemsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const AddFromTarget = ({d,x}) => {
    const [title, setTitle] = useState(d.product.title)
    const [size, setSize] = useState(x)
    const [cost, setCost] = useState(d.offers.primary.price)
    const [image, setImage] = useState(d.product.main_image)

    // const [image, setImage] = useState('')

    const { dispatch } = useItemsContext()
    const { user } = useAuthContext()
    


    const handleSubmit = async (e)=>{
        e.preventDefault()

        const item = {title,cost,size, image}
        console.log(item)
        
        const response = await fetch('http://localhost:4000/items', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
            }
        })
    const json = await response.json()

    // if (!response.ok) {
    //   setError(json.error)
    // }
    if (response.ok) {
    //   setError(null)
    //   setTitle('')
    //   setSize('')
    //   setCost('')
    //   setImage('')
      dispatch({type: 'CREATE_ITEM', payload: json})

      console.log('new item added:', json)
    }
    }


    return ( 
        <div>
            {/* <p>{d.product.title}</p>
            <p>{d.product.cost}</p> */}
            <button onClick={handleSubmit}>ADD</button>
        </div> 
    );
}
 
export default AddFromTarget;