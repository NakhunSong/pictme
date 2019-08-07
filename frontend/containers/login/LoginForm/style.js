import styled from 'styled-components';
import { Form } from 'antd';

export const LoginFormWrapper = styled.div`
  max-width: 390px;
  max-height: 450px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
`;
export const LoginFormInnerWrapper = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  background: white;
  padding: 10px;
  height: 100%;
`;
export const TitleWrapper = styled.div`
  margin-top: 10px;
  .title {
    font-size: 50px;
    font-weight: 700;
    text-align: center;
  }
  .description {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  button {
    margin-top: 15px;
  }
  .seperator {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
    margin-top: 1.5rem;
    position: relative;
    margin-bottom: 1.5rem;
    .or {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-weight: 900;
        color: e6e6e6;
        font-size: 0.9rem;
    }
  }
`;
export const FormWrapper = styled(Form)`
  margin-top: 2rem;
  vertical-align: baseline;
  input {
    margin-bottom: 6px;
  }
  button {
    margin-top: 10px;
  }
  .policy {
    margin-top: 2rem;
    font-size: 18px;
    text-align: center;
  }
`;