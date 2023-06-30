import { useState} from "react"
import TargetDetails from "../components/TargetDetails"



const Target = () => {

  const [title, setTitle] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  
  const [data, setData]=useState([])

  

  const handleSubmit = async (e) => {
    e.preventDefault()
      
    // let url = (process.env.TARGET_URL);
    const url = "https://api.redcircleapi.com/request?api_key=40C9D6A03BBC4507ABE00BD01F6D4BD7&type=search&search_term=${title}&sort_by=best_seller"
    
    const response = await fetch(url)
    const json = await response.json()
    setData(json.search_results)
    
    setTitle('')
    // setSize('')
    setColor('')

  }

  return (
    <div className="home">
      
      <div className="items">
        
          {data.length>1 &&<TargetDetails data={data} size={size} />}
            
      </div>

      
        
        <div className="create" >
          <form onSubmit={handleSubmit}> 
            <h3>Search Target Store</h3>

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

            <label>Item Color:</label>
            <input 
              type="text" 
              onChange={(e) => setColor(e.target.value)} 
              value={color}
            />
            <button>Search</button>
          </form>
        </div>
    </div>

  )
}
  
export default Target



  

      
  