import React, { useState, useEffect } from 'react';
import '../style/calculator.css';

const Calculator = () => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const handleKeyPress = (e) => {
            if ('0123456789+-*/.'.includes(e.key)) {
                setInput((prev) => prev + e.key);
            } else if (e.key === 'Enter') {
                handleCalculate();
            } else if (e.key === 'Escape') {
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleCalculate = () => {
        try {
            const evaluated = Function('"use strict";return (' + input + ')')();
            setInput(evaluated.toFixed(10));
        } catch (error) {
            setInput('Error');
        }
    };

    const handleClear = () => {
        setInput('');
    };

    return (
        <div className="calculator">
            <div className="display">
                <input type="text" value={input} readOnly />
            </div>
            <div className="buttons">
                <button onClick={() => handleClick('1')}>1</button>
                <button onClick={() => handleClick('2')}>2</button>
                <button onClick={() => handleClick('3')}>3</button>
                <button onClick={() => handleClick('+')} className="operator">+</button>
                <button onClick={() => handleClick('4')}>4</button>
                <button onClick={() => handleClick('5')}>5</button>
                <button onClick={() => handleClick('6')}>6</button>
                <button onClick={() => handleClick('-')} className="operator">-</button>
                <button onClick={() => handleClick('7')}>7</button>
                <button onClick={() => handleClick('8')}>8</button>
                <button onClick={() => handleClick('9')}>9</button>
                <button onClick={() => handleClick('*')} className="operator">*</button>
                <button onClick={() => handleClick('0')}>0</button>
                <button onClick={() => handleClick('.')}>.</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={() => handleClick('/')} className="operator">/</button>
                <button onClick={handleClear} className="operator">C</button>
            </div>
        </div>
    );
};

export default Calculator;
