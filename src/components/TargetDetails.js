import AddFromTarget from "./AddFromTarget";

const TargetDetails = ({data,size}) => {
    console.log(data)

    

    return ( 
        
        
           <div>

                {data.map((d)=>(
                    <div key={d.product.title}>
                        <p>{d.product.title}</p>
                        <img src={d.product.main_image} alt="q" onClick={()=>window.open(d.product.link)}  />
                        {/* <button onClick={handleSubmit}>ADD</button> */}
                        <AddFromTarget d={d} x={size}/>
                    </div>
                    
                    
                ))}
               
           </div>
        
    );
}

 
export default TargetDetails;