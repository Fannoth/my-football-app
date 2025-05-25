import { render } from '@testing-library/react-native';
import PlayerCard from '../components/PlayerCard';

describe('PlayerCard', () => {
  const player = {
    id: 7,
    name: 'Jan Kowalski',
    position: 'Napastnik',
    age: 25,
    nationality: 'Polska',
    photo: 'https://photo.test/jan-kowalski.jpg',
  };

  it('wyświetla imię i szczegóły zawodnika oraz jego zdjęcie', () => {
    const { getByText, getByTestId } = render(<PlayerCard player={player} />);

    expect(getByText('Jan Kowalski')).toBeTruthy();

    expect(getByText('Napastnik | Polska | 25 lat')).toBeTruthy();

    const img = getByTestId('player-photo');
    expect(img.props.source).toEqual({ uri: player.photo });
  });
});
