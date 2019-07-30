import React, { FunctionComponent } from 'react';
import { useContext } from "../Store"
import { Fab } from "@material-ui/core";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";

const FullSizedCount = styled.div`
  font-size: 320px;
  text-align: center;
  user-select: none;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Counter: FunctionComponent = () => {
  const { count, increment, decrement } = useContext();
  return (
    <>
    <FullSizedCount>{count}</FullSizedCount>
    <ButtonContainer>
      <Fab variant="extended" color="primary" size="large" onClick={increment}>
        <Add />Count-up
      </Fab>
      <Fab variant="extended" color="secondary" size="large" onClick={decrement}>
        <Remove />Count-down
      </Fab>
    </ButtonContainer>
    </>
  );
}
