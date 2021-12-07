import styled from "@emotion/styled";

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

`;


export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 100px;
        font-size: 1.8rem;
        color: rgba(82, 87, 92, 0.84);
        
    }

    input {
        flex: 1;
        padding: 1rem;
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.5;
        color: #a4aeb8;
        background-color: #fff;
        background-clip: padding-box;
        border: 0.3px solid #dbdde0;
        border-radius: 0.35rem;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        input::focus {
            border-color: #308af3;
        }

    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    border-radius: 0.250rem;
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    padding: 0.5rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #f38989;
    text-align: center;
    margin: 0;

`;