// NavbarStyles.js

import { Link } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';
import styled from "styled-components";

export const Navegacion = styled.nav`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px){
    justify-content: space-around;
  }
`;

export const Panel = styled.nav`
  background: #000000b8;
  color: #f2f2f2;
  position: fixed;
  backdrop-filter: blur(2px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease;
  transform: translate(-150%, 0);
  z-index: 98;
  margin-top:4em;
  &.active {
    transform: translate(0, 0);
  }
  @media screen and (min-width: 768px){
    margin-top:0;
    transform: translate(0, 0);
    background: none;
    position: relative;
  }
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  @media screen and (min-width: 768px){
    flex-direction: row;
    width: 20rem;
    width: inherit;
  }
`;

export const NavLink = styled(Link)`
  padding: 1rem;
  width: inherit;
  font-size: 1rem;
  text-decoration: none;
  transition: 0.2s;
  color: #000;
  &:hover {
    color: #0366d6;
    font-weight: 700;
  }
  @media screen and (max-width: 768px){
    padding: 1.5rem;
    color: #fff;
    &:hover {
      background: #0365d682;
      color: #fff;
    }
  }
`;

export const InverseContainerUser = styled.div`
  display: none;
  @media screen and (max-width: 768px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
  }
`;

export const Logo = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  display: none;
  span {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #0366d6;
  }
  @media screen and (min-width: 768px){
    display: block;
    margin-right: 0;
  }
`;

export const BurgerBtn = styled(MenuOutlined)`
  display: flex;
  z-index: 99;
  cursor: pointer;
  position: relative;
  transition: 0.5s;
  font-size: 30px;
  left: 0.5rem;
  color: #000;
  &.active {
    rotate: 90deg
  };
  @media screen and (min-width: 768px){
    display: none;
  }
`;

export const ContainerUser = styled.div`
  display: block;
  @media screen and (max-width: 768px){
    display: none;
  }
`
