import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";

import { space, radius, color, font } from "styles/const";
import { Title, Button, ButtonWrapper, Emoji } from "styles/atoms";
import { signIn } from "./token-manager";

const StandaloneAppFrameStyle = styled.div`
    width: 80vw;
    height: 80vh;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
const WrapperGoogleConnect = styled.div`
    flex: 0 1 ${rem(430)};
    border: 1px solid ${color.border};
    border-radius: ${rem(radius.base)};
    padding: ${space.lg};
`;
const TextLogin = styled.p`
    font-size: ${space.sm};
    color: ${color.secondary.darker};
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
        <WrapperGoogleConnect>
            {props.title && <Title>{props.title}</Title>}
            {props.children}
        </WrapperGoogleConnect>
    </StandaloneAppFrameStyle>
);

export const The404 = () => (
    <StandaloneAppFrame title={"Ooops, page non trouvé..."}>
        <TextLogin>
            404
            <TextLoginHighlight>{window.location.pathname}</TextLoginHighlight>
        </TextLogin>
        <TextLogin style={{ marginTop: "16px" }}>
            <a href="/">Retour à l'application</a>
        </TextLogin>
    </StandaloneAppFrame>
);

export const BadRequest = () => (
    <StandaloneAppFrame title={"Ooops, mauvaise URL"}>
        <TextLogin>
            Pas besoin de transmettre à la tech, l'URL saisie n'est pas correcte
            <Emoji name="bomb" />
        </TextLogin>
    </StandaloneAppFrame>
);

export const HoustonWeveGotAProblem = () => (
    <StandaloneAppFrame title={"Ooops, on a eu un problème..."}>
        <TextLogin>
            À transmettre à la tech'
            <TextLoginHighlight>{window.location.pathname}</TextLoginHighlight>
        </TextLogin>
    </StandaloneAppFrame>
);

export const Loading = () => <StandaloneAppFrame title={"Chargement en cours..."} />;

export const LoginStandaloneApp = () => {
    const [email, seEmail] = useState("");
    const [passWord, setPassWord] = useState("");

    return (
        <StandaloneAppFrame title={"Connexion à Madu"}>
            <ButtonWrapper align="center">
                <Button
                    style={{ width: "100%", justifyContent: "center" }}
                    type="highlight"
                    size="lg"
                    onClick={() => signIn(email, passWord)}
                >
                    Se connecter
                </Button>
            </ButtonWrapper>
        </StandaloneAppFrame>
    );
};
