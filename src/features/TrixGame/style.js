import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100dvh - 76px);
  /* background-color: red; */
  margin-top: 76px;
  background-color: white;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export const Player = styled.div`
  flex: 1;
`;

export const Hand = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  padding-top: 10px;
`;
