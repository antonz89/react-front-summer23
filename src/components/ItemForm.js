import { useState } from 'react'
import { useItemsContext } from '../hooks/useItemsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const ItemForm = () => {
  const { dispatch } = useItemsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [size, setSize] = useState('')
  const [cost, setCost] = useState('')
  const [error, setError] = useState(null)

  //---------image------------------------------------------
  const [image, setImage] = useState('')
  
  const convertToBase64 =(e)=>{
    // console.log(e)
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      // console.log(reader.result); // base64emcoded string
      setImage(reader.result)
      // console.log(image)
    }
    reader.onerror = error =>{
      console.log("Error: ", error)
    }
  }
  //------------------------------------------==================

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    //---- user logged in?
    if (!user) {
      setError('You must be logged in')
      return
    }
    //------------adding item to DB-------------------
    const item = {title, size, cost, image}
    
    const response = await fetch('http://localhost:4000/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setSize('')
      setCost('')
      setImage('')
      dispatch({type: 'CREATE_ITEM', payload: json})

      console.log('new item added:', json)
    }
    

  }
  

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Item</h3>

      <label>Item Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Size:</label>
        <select 
            value={size} 
            onChange={(e) => setSize(e.target.value)}>
                <option >Plese Select Your Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
        </select>

      <label>Cost ($):</label>
        <input 
            type="number" 
            onChange={(e) => setCost(e.target.value)} 
            value={cost} 
        />
      
      <label>Upload Image</label>
      <input 
        type="file" 
        accept="image/*"
        onChange={convertToBase64}
      />

      {image===""||image===null? "":<img width={100} height={100} src={image} alt='img'/>}
      

      <button>Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ItemForm