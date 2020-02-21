import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { Button, Input, Form, Icon } from "antd";
import GlobalStyle from "styles";
import "madu/app.css";

import { space, font } from "styles/const";
import { signIn } from "./token-manager";
import { forgotPassword, resetPassword } from "madu/services/login";

const StandaloneAppFrameStyle = styled.div`
    width: 80vw;
    height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CustomForm = styled(Form)`
    background: #e3e9f770;
    padding: ${rem(20)} ${rem(40)};
    border-radius: 4px;
    & > div{
        margin-bottom:${rem(6)};
    }
}
`;

const Link = styled.p`
    color: #1890ff;
    cursor: pointer;
    margin-bottom: ${rem(4)};
    &:hover {
        text-decoration: underline;
    }
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

export const ForgottenPasswordAppUnconnected = props => {
    const [password, setPassword] = useState<string | null>(null);
    const { getFieldDecorator } = props.form;

    const checkForm = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                resetPassword(password, props.token).then(v => {
                    if (v.statusCode === 200) {
                        window.location.replace("/");
                    }
                });
            }
        });
    };

    return (
        <StandaloneAppFrame title={"Réinitialisation de mot de passe"}>
            <GlobalStyle />
            <CustomForm>
                <Form.Item label="Mot de passe">
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Merci de rentrer un mot de passe!" }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="*******"
                            onChange={e => setPassword(e.target.value)}
                            size="large"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={() => {
                            checkForm();
                        }}
                    >
                        Validé
                    </Button>
                </Form.Item>
            </CustomForm>
        </StandaloneAppFrame>
    );
};

export const ForgottenPasswordApp = Form.create()(ForgottenPasswordAppUnconnected) as any;

export const LoginStandaloneAppUnconnected = props => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { getFieldDecorator } = props.form;

    const checkForm = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                signIn(email, password);
            }
        });
    };

    return (
        <StandaloneAppFrame title={"Connexion à Madu"}>
            <GlobalStyle />
            <CustomForm>
                <Form.Item label="Identifiant">
                    {getFieldDecorator("username", {
                        rules: [{ required: true, message: "Merci de rentrer un identifiant!" }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Identifiant"
                            onChange={e => setEmail(e.target.value)}
                            size="large"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Mot de passe">
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Merci de rentrer un mot de passe!" }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="*******"
                            onChange={e => setPassword(e.target.value)}
                            size="large"
                        />
                    )}
                </Form.Item>
                <Link onClick={() => forgotPassword(email)}>Mot de passe oublié</Link>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={checkForm}
                    >
                        Se connecter
                    </Button>
                </Form.Item>
            </CustomForm>
        </StandaloneAppFrame>
    );
};

export const LoginStandaloneApp = Form.create()(LoginStandaloneAppUnconnected);
