import React, {useState} from 'react';
import styled from "styled-components";
import Calculator from "../../../Components/Calculator/Calculator"
import axios from 'axios';

const PageWrapper = styled.div`
  margin : 2rem;
`;

const WrapperDiv = styled.div`
  & + & {
    margin-top : 1rem;
  }
  justify-content : center;
  margin-bottom : 1rem;
  display : flex;
  flex-direction : column;
`;

const InputLable = styled.label`
  font-size : 1.5rem;
  float: left;
`;

const Input = styled.input`
  height : 3rem;
  width : 13rem;
  background-color : #F2F0F0;
  font-size : 1.5rem;
  border-radius : 10px;
  line-height : 2.5rem;
  padding-left : 0.5rem;
  padding-right : 0.5rem;
  margin-top : 0.7rem;
  margin-right : 0.5rem;
  margin-left : 1.0rem;
`;

const Form = styled.form`
  display : flex;
  justify-content : center;
  flex-direction : column;
`;

const CheckButton = styled.button`
  width : 4rem;
  height : 3.5rem;
  font-size : 1.2rem;
  background-color : #C4C4C4;
  margin-top : 2rem;
  margin-right : 1rem;
  border-radius : 0.5rem;
  padding : 0;
`;

const CategorySelector = styled.select`
  height : 3.2rem;
  width : 10rem;
  background-color : #F2F0F0;
  font-size : 1.5rem;
  border-radius : 10px;
  line-height : 2.5rem;
  padding-left : 0.5rem;
  padding-right : 0.5rem;
  margin-top : 0.7rem;
  margin-right : 2.0rem;
  margin-left: 1.0rem;
`;

const Title = styled.h1`
  text-align:center;
`

const AddStock = ({onClickAdd}) => {

    const [quantity , setQuantity] = useState('');
    const [stockName, setStockName] = useState('');

    const handleClick = async (e) =>{
        e.preventDefault();
        if(window.confirm("정말로 추가하시겠습니까?")){
            await addStockHandler();
            alert("추가되었습니다.");
            onClickAdd();
            setQuantity('');
            setStockName('');
        }
        console.log("Click test : preventDefault");
    }

    const changeQuantity = (change) =>{
        setQuantity(change);
    }

    const addStockHandler = async () =>{
        // let managerId = window.localStorage.getItem('')
        const time = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        const ingredients = [{
            time : time,
            quantityChanged : +quantity,
            employeeId : 1,
        }];
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            stockName : stockName,
            managerId : managerId,
            quantity : quantity,
            stockDetailList : ingredients,
        };
        console.log(data.stockDetailList);
        await axios.post('http://localhost:8080/stock/add', JSON.stringify(data), {
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            console.log(res);
            setQuantity('');
            setStockName('');
        }).catch(e=>console.log(e));
    };


    return (
        <>
            <PageWrapper>
                <Title>재고 추가</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>재고 이름
                            <Input placeholder = {"재고명"} style={{flexGrow:3}} 
                            value={stockName} 
                            onChange={(e)=>setStockName(e.target.value)}/>
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량
                            <Input placeholder = {"0"} style={{flexGrow:3}}
                                   value = {quantity} onChange={(e)=> setQuantity(e.target.value)}/>인분
                        </InputLable>
                    </WrapperDiv>
                    <WrapperDiv>
                        <Calculator num={"3.0rem"} num2={"6.0rem"} quantity={quantity} changeQuantity={changeQuantity}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>담당
                            <CategorySelector>
                                <option value="서혜민" selected>서혜민</option>
                                <option value="최지환" selected>최지환</option>
                                <option value="이호준" selected>이호준</option>
                            </CategorySelector>
                            <CheckButton onClick = {handleClick}>추가</CheckButton>
                            <CheckButton>닫기</CheckButton>
                        </InputLable>
                    </WrapperDiv>
                </Form>
            </PageWrapper>
        </>
    );
};

export default AddStock;