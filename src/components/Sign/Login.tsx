import React, { useState } from 'react';
import Eyesvg from '@/assets/images/eye.svg';
import * as S from './SignStyle';
import axios from 'axios';

function Login() {
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });

  const { id, password } = inputs; //구조분해할당

  const regExp = new RegExp('[a-z]+[a-z0-9]{5,19}$/g'); //id 정규식
  const regPass = new RegExp('(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}'); //비밀번호 정규식

  const onChange = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const showPassword = () => {
    const test: any = document.getElementById('password');
    test.type === 'password' ? (test.type = 'text') : (test.type = 'password');
  };

  const onSubmit = () => {
    axios
      .post(`/login`, inputs)
      .then((res) => {
        console.log(res);
        switch (res.status) {
          case 200:
            localStorage.setItem('id', `${res.data.id}`);
            document.location.href = '/';
            break;
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <S.SignWrapper>
      <S.SignCard>
        <S.SignPanel signStart={true}>
          <S.FormTitle>LOGIN</S.FormTitle>
          <S.InputWrap>
            <S.FormInput name="id" value={id} onChange={onChange} />
            <S.InputTitle value={id} data-placeholder="ID"></S.InputTitle>
          </S.InputWrap>
          <S.InputWrap data-validate="Enter password">
            <S.ShownPw onClick={showPassword}>
              <img src={Eyesvg} alt="" />
            </S.ShownPw>
            <S.FormInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="영문과 특수문자 숫자를 포함하며 8자 이상"
            />
            <S.InputTitle value={password} data-placeholder="Password"></S.InputTitle>
          </S.InputWrap>
          <S.SignLink href="/signup">Don’t have an account?</S.SignLink>
          <S.SignBtn onClick={onSubmit}>LOGIN</S.SignBtn>
        </S.SignPanel>
        <S.ImgPanel imgStart={false}></S.ImgPanel>
      </S.SignCard>
    </S.SignWrapper>
  );
}

export default Login;