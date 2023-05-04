import "./UI.css";
import {useState} from "react";

function UI(): JSX.Element {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const operators = ['+', '-', '*', '/', '.'];

    const updateCalc = (value: string) => {
        if(
            operators.includes(value) && calc === '' ||
            operators.includes(value) && operators.includes(calc.slice(-1))
        ){
            return;
        }
        setCalc(calc + value);

        if(!operators.includes(value)){
            setResult(eval(calc + value).toString());
        }
    }


    const createDigits = () =>{
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
            );
        }
        return digits;
    }


    const calculate = () => {
        setCalc(eval(calc).toString())
        setResult('');
    }

    const deleteLast = () => {
        if(calc === '')
            return;

        const value = calc.slice(0, -1);
        setCalc(value);
        setResult(value);
    }

    const deleteAll = () => {
        setCalc('');
        setResult('');
    }

    return (
        <div className="UI">
			<div className={"calculator"}>
                <div className={"display"}>
                    {calc || 0}<br/>
                    {result ? <span> {result} </span> : ''}
                </div>

                <div className={"operators"}>
                    <button onClick={() => deleteAll()}>AC</button>
                    <button onClick={() => updateCalc('/')}>&divide;</button>
                    <button onClick={() => updateCalc('*')}>&times;</button>
                    <button onClick={() => updateCalc('+')}>&#43;</button>
                    <button onClick={() => updateCalc('-')}>&minus;</button>
                    <button onClick={() => deleteLast()}>&#x232b;</button>
                </div>

                <div className={"digits"}>
                    { createDigits() }
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button id={"equals"} onClick={() => calculate()}>&#61;</button>
                </div>
            </div>


            <footer>Created by Sergey Dragoner</footer>
        </div>
    );
}

export default UI;
