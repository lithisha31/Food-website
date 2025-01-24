import styled from "styled-components";
import { BASE_URL } from "../../App";
import { Button } from "../../App";

export default function SearchResult({data}){
    return(
        <FoodCardContainer>
            <FoodCards>
                {data?.map((food)=> <FoodCard key={food.name}>
                    <div className="food-image">
                        <img src={BASE_URL + food.image} alt="food-image" />
                    </div>
                    <div className="food-info">
                        <div className="info">
                            <h3>{food.name}</h3>
                            <p>{food.text}</p>
                        </div>
                        <Button>{food.price.toFixed(2)}</Button>
                    </div>
                </FoodCard>)}
            </FoodCards>           
        </FoodCardContainer>
    )
}

const FoodCardContainer = styled.div`
  background-image : url("./food-bg.jpg");
  background-size:cover;
  min-height: calc(100vh - 143.2px);
  width: 100%;
}
`;

const FoodCards = styled.div`
    display : flex;
    flex-wrap : wrap;
    padding : 0.5rem 5rem;
    row-gap : 20px;
    column-gap : 20px;
    justify-content : center;
    align-items : center;
`;

const FoodCard = styled.div`
    height : 200px;
    width: 300px;
    border : 1px solid black;
    border-radius : 8px;
    display : flex;
    .food-info{
        display : flex;
        flex-direction : column;
        align-items : end;
        padding : 8px;
        .info{
        font-size : 0.8rem;
        @media (0 < width < 350px ){
            font-size : 12px;
            }
        }
        Button {
        width : 5rem;
        }
    }   
    backdrop-filter: blur(26.368392944335938px)
    
`;
