import styled from 'styled-components';

export const Button = styled.button`
  width: 128px;
  height: 32px;
  border: 1px solid red;
  color: red;
`;

export const Code = styled.pre`
  width: 100%;
  text-align: left;
  max-height: 600px;
  overflow-y: scroll;
`;

export const ProductPanel = styled.div`
  display: flex;
`;

export const DevicePanel = styled.div`
  flex: 1 1 0;
`;

export const SwitchUI = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 64px;
  height: 32px;
  border-radius: 16px;
  border: 3px solid #012622;
  position: relative;
  margin: 0px 4px;
  &:after {
    content: ' ';
    position: absolute;
    ${({ value }) => (value ? 'width: 32px' : 'width: 20px')};
    height: 20px;
    background-color: #012622;
    border-radius: 10px;
    ${({ value }) => (value ? 'right: 3px' : 'left: 3px')};
    top: 3px;
    bottom: auto;
  }
  opacity: ${({ enabled }) => (enabled ? 1 : 0.2)};
`;

export const ListUI = styled.p`
  text-align: left;
  & ol li {
    border: 1px solid #cccccc;
    margin-left: 20px;
  }
`;

export const View = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 20px;
  border: 1px solid #cccccc;
  padding: 20px;
`;
