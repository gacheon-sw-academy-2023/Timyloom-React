import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logos_orange from '@/assets/images/timyloom_logo_orange.png';

export const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.primaryColor_2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 0px;
  margin: 0 auto;
  padding: 20px 40px;
  transition: all 300ms ease-in;
`;

export const ToggleWrapper = styled.div`
  display: none;
  color: white;
  font-size: 24px;
  position: absolute;
  right: 20px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const LogoWrapper = styled.div`
  box-sizing: border-box;
  margin-left: 25px;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 24px;
  color: black;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px 10px;
`;

export const NavMenu = styled.ul<{ isToggleOpen: boolean }>`
  list-style: none;
  display: flex;
  margin: 0 15px;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? 'block' : 'none')};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

export const NavMenuContent = styled.li`
  border-radius: 10px;
  margin: 0 5px;
  border: 3px solid white;
  &:hover {
    cursor: pointer;
    border-radius: 20px;
  }
  transition: all 100ms ease-in;
`;

export const NameBox = styled.div`
  font-size: 1.3rem;
  color: white;
  &:hover {
    cursor: pointer;
    color: #f38704;
  }
`;

export const Logo = styled.div`
  background-image: url(${Logos_orange});
  background-size: contain;
  background-repeat: no-repeat;
  width: 190px;
  height: 50px;
`;
