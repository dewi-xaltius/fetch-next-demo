import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffc857;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

export const Card = styled.div`
  width: 150px;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;
