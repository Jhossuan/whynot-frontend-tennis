import { Row as RowAntd } from "antd";
import styled from "styled-components";

export interface TextI {
    textColor?: string;
    textAlign?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    fontSize?: string;
    lineHeight?: string;
    // Responsive Types
    textAlignR?: string
}

export interface InputCardI {
  minHeight?: string
  width?: string
  padding?: string
}

export const Row = styled(RowAntd)`
  width: 100%;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1531315396756-905d68d21b56?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position: center;
  background-repeat: no-repeat;
`;

export const InputCard = styled.div<InputCardI>`
    background: #fff;
    border-radius: 20px;
    min-height: ${(props) => props.minHeight || "60%"};
    width:  ${(props) => props.width || "70%"};
    box-shadow: 10px 10px 10px 0px #0003;
    padding:  ${(props) => props.padding || "50px"};

    @media (min-width: 1600px){
      min-height: 20%;
      width: 50%;
    }

    @media (max-width: 768px){
      width: 90%;
      min-height: 40%;
    }
`

export const CardContainer = styled.div<InputCardI>`
    background: #fff;
    border-radius: 20px;
    min-height: ${(props) => props.minHeight || "60%"};
    width:  ${(props) => props.width || "60%"};
    box-shadow: 10px 10px 10px 0px #0003;
    padding:  ${(props) => props.padding || "50px"};
`

export const BigText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: 3em;
    font-style: normal;
    font-weight: 700;
    text-align: ${(props) => props.textAlign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    margin-top: ${(props) => props.marginTop || "0"};
    margin-bottom: ${(props) => props.marginBottom || "0"};

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"};
      font-size: 2.2em
    }
`;

export const MediumText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: ${(props) => props.fontSize || "1.6em"};
    font-style: normal;
    font-weight: 600;
    text-align: ${(props) => props.textAlign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    line-height: ${(props) => props.lineHeight || "40px"};
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"}
    }
`

export const SmallText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: ${(props) => props.fontSize || "1.2em"};
    font-style: normal;
    font-weight: 500;
    text-align: ${(props) => props.textAlign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    line-height: ${(props) => props.lineHeight || "40px"};
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"}
    }
`