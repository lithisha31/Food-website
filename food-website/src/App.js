import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {

  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(()=>{
      const fetchFoodData = async() => {
        setLoading(true);
        try{
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setLoading(false);
        console.log(json);
        setFetchData(json);
        setFilteredData(json)
     }catch(error){
      setError("Unable to fetch data");
    }
  };
  fetchFoodData();
  },[])

  const filterData = (e) =>{
    const searchValue = e.target.value;
    console.log(searchValue);

    if(searchValue === ""){
      setFilteredData(null);
    }

    const filter = fetchData?.filter((food) =>
        food.name.toLowerCase().includes(searchValue.toLowerCase()))

    setFilteredData(filter);
  }

 const filterFood = (type) => {
  if(type === "all"){
    setFilteredData(fetchData);
    setSelectedBtn("all");
    return;
  }

  const filter = fetchData?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase()));

  setFilteredData(filter);
  setSelectedBtn(type);
}

const filterBtns = [
  {
    name : "All",
    type : "all",
  },
  {
    name : "Breakfast",
    type : "breakfast",
  },
  {
    name : "Lunch",
    type : "lunch",
  },
  {
    name : "Dinner",
    type : "dinner",
  },
]
  
  if(error) return <div>{error}</div>
  if(loading) return <div>Loading...</div>

  return (
    <Main>
        <TopSection>
          <div className="logo">
            <img src="/food-logo.jpg" alt="food logo"/>
            <input type="text" placeholder="Search food" onChange={filterData}/>
          </div>
          <FilterContainer>
            {filterBtns.map((value)=> (
              <Button key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>
            ))}
          </FilterContainer>
        </TopSection>
        <SearchResult data={filteredData}/>    
    </Main>
  );
}

export default App;

const Main = styled.div`
    height: 100vh;
`;

const TopSection = styled.section`
    img{
        height : 5rem;
        width : 5rem;
        border-radius : 50%;
      }
    .logo{
        display : flex;
        justify-content : space-between;
        align-items : center;

        @media (0 < width < 450px ){
          flex-direction : column;
          display : flex;
          justify-content : space-between;
          align-items : center;
          gap : 2px;
      }
    }
    input{
      height : 1.5rem;
      width : 10rem;
      background-color: transparent;
      border : 1px solid red;
      border-radius : 4px;
      padding : 2px 5px;
      font-size : 15px;
    }
    padding : 1rem 4rem;
    background-color : #323334;

    @media (0 < width < 450px ){
      gap : 5px;
    }

`;

const FilterContainer = styled.section`
  display : flex;
  justify-content : center;
  gap : 5px;
  margin-top : 3px;
`;

export const Button = styled.button`
  background-color : #ff4343;
  border-radius : 5px;
  padding : 6px 12px;
`;

