import { useState } from "react";
import "./Calculator.css";

export default function Calculator(props){
     const [screenValue, setScreenValue] = useState("")
    function input(char){
       setScreenValue(screenValue + char)
    }

    function evaluate(){
        setScreenValue(eval(screenValue));
    }
    return <div className="calculator">
        <button onClick={props.close} className="btn btn-danger close-btn">X</button>
        <input type="text"  value={screenValue}/>
       <table>
       <tr>
        <td onClick={()=> input(7)}>7</td>
         <td onClick={()=> input(8)}>8</td> 
         <td onClick={()=> input(9)}>9</td> 
       </tr>
       <tr> 
        <td onClick={()=> input(4)}>4</td>
         <td onClick={()=> input(5)}>5</td>
          <td onClick={()=> input(6)}>6</td> 
       </tr>
       <tr>
        <td onClick={()=> input(1)}>1</td>
         <td onClick={()=> input(2)}>2</td>
        <td onClick={()=> input(3)}>3</td> 
       </tr>
       <tr>
        <td onClick={()=> input(0)}>0</td>
         <td onClick={()=> input(".")}>.</td>
          <td onClick={evaluate}>=</td>
       </tr>
       <tr>
       <td onClick={()=> input("/")}>/</td>
        <td onClick={()=> input("*")}>X</td>
        <td onClick={()=> input("+")} >+</td>
       </tr>
       <tr>
        {/* <td onClick={()=> input("-")}>-</td> <td>DEL</td> */}
       </tr>
       </table>
    </div>
}