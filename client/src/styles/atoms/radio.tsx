import React, { useState } from "react";
import { Radio, Input } from "antd";
import { rem } from "polished";

const RadioComponent = ({ answer, activeEdit, setActiveEdit }) => {
    const [inputValue, setInputValue] = useState(answer.value);

    const radioStyle = {
        display: "block",
        height: rem(30),
        lineHeight: rem(30),
        marginBottom: rem(10),
    };

    const onInputChange = value => {
        setInputValue(value);
    };

    return (
        <Radio style={radioStyle} value={1}>
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
        </Radio>
    );
};

export const RadiosComponent = ({ activeEdit, setActiveEdit }) => {
    const [value, setValue] = useState(1);

    const onChange = e => {
        setValue(e.target.value);
    };

    const answers = [
        { value: "answer1", id: "answer1" },
        { value: "answer2", id: "answer2" },
        { value: "answer3", id: "answer3" },
        { value: "answer4", id: "answer4" },
    ];

    return (
        <Radio.Group onChange={onChange} value={value}>
            {answers.map(answer => (
                <React.Fragment key={answer.id}>
                    <RadioComponent
                        activeEdit={activeEdit}
                        answer={answer}
                        setActiveEdit={setActiveEdit}
                    />
                </React.Fragment>
            ))}
        </Radio.Group>
    );
};
