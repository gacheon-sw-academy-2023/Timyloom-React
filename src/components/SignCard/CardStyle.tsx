import styled from 'styled-components';
import background from '@/assets/images/signMain.png';
import { ReactComponent as EyeSvg } from '@/assets/images/eye.svg';
import { Link } from 'react-router-dom';

export const SignCard = styled.div`
  display: flex;
  width: 50vw;
  height: 75vh;
  border-radius: 20px;
  margin: auto;

  @media (max-width: 1400px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    width: 70vw;
  }

  @media (max-width: 425px) {
    width: 80vw;
  }
`;

export const ImgPanel = styled.div<{ imgStart: boolean }>`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  flex-grow: 4;
  border-radius: 20px;

  border-top-left-radius: ${(props) => (props.imgStart ? 'none' : '0')};
  border-bottom-left-radius: ${(props) => (props.imgStart ? 'none' : '0')};

  border-top-right-radius: ${(props) => (props.imgStart ? '0' : 'none')};
  border-bottom-right-radius: ${(props) => (props.imgStart ? '0' : 'none')};

  @media (max-width: 1400px) {
    display: none;
  }
`;

export const SignPanel = styled.div<{ signStart: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 0.5;
  background: ${(props) => props.theme.white};
  padding: 1rem 5rem;
  border-radius: 20px;
  border-top-left-radius: ${(props) => (props.signStart ? 'none' : '0')};
  border-bottom-left-radius: ${(props) => (props.signStart ? 'none' : '0')};

  border-top-right-radius: ${(props) => (props.signStart ? '0' : 'none')};
  border-bottom-right-radius: ${(props) => (props.signStart ? '0' : 'none')};

  @media (max-width: 1400px) {
    border-radius: 20px;
  }
`;

export const FormTitle = styled.div`
  font-size: 1.9rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
  justify-content: space-evenly;
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid ${(props) => props.theme.gray_2};
  margin-bottom: 1.5vh;
`;

export const InputForm = styled.input`
  width: 100%;
  height: 4vh;
  padding: 0 5px;
  outline: none;
  border: none;

  &:focus {
    ::placeholder {
      color: #808080;
    }
  }

  ::placeholder {
    color: transparent;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    ::placeholder {
      font-size: 6px;
    }
  }
`;

export const InputTitle = styled.div<{ value: string; isReg?: boolean }>`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  ::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${(props) => (props.value ? '100%' : '0')};
    height: 2px;
    transition: all 0.4s;
    background: rgb(238, 174, 202);
    background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
  }

  ::after {
    font-size: 15px;
    color: ${(props) => (props.isReg ? props.theme.gray_2 : props.theme.secondaryColor)};
    line-height: 1.2;
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: ${(props) => (props.value ? '-15px' : '10px')};
    left: 0px;
    padding-left: 5px;
    transition: all 0.4s;
  }
  ${InputForm}:focus ~ & {
    ::before {
      width: 100%;
    }
    ::after {
      top: -15px;
    }
  }

  @media (max-width: 425px) {
    ::after {
      font-size: 5px;
    }
  }
`;

export const SignLink = styled(Link)`
  margin: 0.8rem;
  color: ${(props) => props.theme.gray_1};
  text-align: center;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

export const EyeIcon = styled((props) => <EyeSvg {...props} />)<{ $isShow: boolean }>`
  color: ${(props) => (props.$isShow ? props.theme.pupple : props.theme.gray_2)};
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  padding-right: 5px;
  cursor: pointer;

  transition: all 0.4s;
  &:hover {
    color: ${(props) => props.theme.pupple};
  }
`;
