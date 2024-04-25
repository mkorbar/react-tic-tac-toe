import { React } from 'react';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import App from './App';

const X_PLAYER = 'X';
const O_PLAYER = 'O';

describe('Basic fuctionality of the app', () => {

  it('has a title', () => {
    render(<App />);
    const linkElement = screen.getAllByRole('heading')[0];
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.innerHTML).toMatch(/tic tac toe/i);
  });

  it('shows the next player', () => {
    render(<App />);
    const statusText = screen.getByText(/Next player.*/i);
    expect(statusText).toBeInTheDocument();
  });

  it('has 9 buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(9);
  });

  it('shows x on click', () => {
    render(<App />);
    const button = screen.getAllByRole('button')[0];
    expect(button.innerHTML).toBe('')
    fireEvent.click(button);
    expect(button.innerHTML).toMatch(/[XO]/);
  });

  it('switches to next player', () => {
    render(<App />);
    const statusText = screen.getByText(/Next player.*/i);
    const button = screen.getAllByRole('button')[0];
    expect(statusText.innerHTML.substr(-1)).toBe(X_PLAYER);
    fireEvent.click(button);
    expect(statusText.innerHTML.substr(-1)).toBe(O_PLAYER);
  });
})

describe('wins counter', () => {

  it('exists', ()=>{
    render(<App/>)

    const scoreCounter = screen.getByText(/Score tracker/i);
    expect(scoreCounter).toBeDefined()
  })

})

