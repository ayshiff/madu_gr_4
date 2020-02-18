import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { Button, Input, Form, Icon } from "antd";
import GlobalStyle from "styles";
import "madu/app.css";

import { space, font } from "styles/const";
import { signIn } from "./token-manager";

const StandaloneAppFrameStyle = styled.div`
    width: 80vw;
    height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const TextLogin = styled.p`
    font-size: ${space.sm};
    margin: 0;
`;
const TextLoginHighlight = styled.span`
    background: "#eee";
    padding: ${rem(3)} ${rem(6)};
    font-weight: ${font.weight.bold};
`;

type StandalonAppFrameProps = {
    title: string;
    children?: ReactNode;
};

const StandaloneAppFrame = (props: StandalonAppFrameProps) => (
    <StandaloneAppFrameStyle>
        <h1>{props.title}</h1>
        {props.children}
    </StandaloneAppFrameStyle>
);

export const The404 = () => (
    <StandaloneAppFrame title={"Ooops, page non trouvé..."}>
        <TextLogin>
            404
            <TextLoginHighlight>{window.location.pathname}</TextLoginHighlight>
        </TextLogin>
        <TextLogin style={{ marginTop: rem(16) }}>
            <a href="/">Retour à l'application</a>
        </TextLogin>
    </StandaloneAppFrame>
);

export const BadRequest = () => (
    <StandaloneAppFrame title={"Ooops, mauvaise URL"}>
        <TextLogin>L'URL saisie n'est pas correcte</TextLogin>
    </StandaloneAppFrame>
);

export const NukeTown = () => (
    <StandaloneAppFrame title={"Ooops, on a eu un problème..."}>
        <TextLogin>
            À transmettre à la tech'
            <TextLoginHighlight>{window.location.pathname}</TextLoginHighlight>
        </TextLogin>
    </StandaloneAppFrame>
);

export const Loading = () => <StandaloneAppFrame title={"Chargement en cours..."} />;

export const LoginStandaloneAppUnconnected = props => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { getFieldDecorator } = props.form;
    return (
        <StandaloneAppFrame title={"Connexion à Madu"}>
            <GlobalStyle />
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator("username", {
                        rules: [{ required: true, message: "Please input your username!" }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Username"
                            onChange={e => setEmail(e.target.value)}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your Password!" }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={() => signIn(email, password)}
                    >
                        Se connecter
                    </Button>
                </Form.Item>
            </Form>
        </StandaloneAppFrame>
    );
};

export const LoginStandaloneApp = Form.create()(LoginStandaloneAppUnconnected);
