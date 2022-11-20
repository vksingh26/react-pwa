import { useEffect, useRef, useState } from "react";
import { getProductList } from "./productList";

function App() {
  const [productList, setProductList] = useState([]);
  const isEffectCalledOnce = useRef(true);

  useEffect(() => {
    if (isEffectCalledOnce.current) {
        isEffectCalledOnce.current = false;
        fetchData();
    }
  }, []);

  const fetchData = async() => {
    const data = await getProductList();
    console.log(data);
    setProductList(data?.products);
  }

  return (
    <div className="App">
      <div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '90%', margin: 'auto' }}>
        {
          productList?.map((product) => {
            return (
              <div key={product.id} style={{width: '400px', height: '100%', border: '2px solid #333', margin: '30px 10px'}}>
                <img src={product.thumbnail} alt="product" style={{width: '100%', height: '300px'}}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
