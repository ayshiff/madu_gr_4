import React, { useState } from "react";
import { Input } from "antd";
import { rem } from "polished";

const RadioComponent = ({ answer, activeEdit, setActiveEdit }) => {
    const [inputValue, setInputValue] = useState(answer.value);

    const Style = {
        display: "block",
        height: rem(30),
        lineHeight: rem(30),
        marginBottom: rem(10),
    };

    const onInputChange = value => {
        setInputValue(value);
    };

    return (
        <div style={Style}>
            {activeEdit ? (
                <Input
                    placeholder="value"
                    onChange={e => onInputChange(e.target.value)}
                    onPressEnter={() => setActiveEdit(false)}
                    value={inputValue}
                />
            ) : (
                inputValue
            )}
        </div>
    );
};

export const RadiosComponent = ({ activeEdit, setActiveEdit }) => {
    const answers = [
        { value: "answer1", id: "answer1" },
        { value: "answer2", id: "answer2" },
        { value: "answer3", id: "answer3" },
    ];

    return (
        <div>
            {answers.map(answer => (
                <React.Fragment key={answer.id}>
                    <RadioComponent
                        activeEdit={activeEdit}
                        setActiveEdit={setActiveEdit}
                        answer={answer}
                    />
                </React.Fragment>
            ))}
        </div>
    );
};
