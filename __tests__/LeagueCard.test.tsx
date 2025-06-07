import { useRouter } from 'expo-router';
import { render, fireEvent } from '@testing-library/react-native';

import LeagueCard from '../components/LeagueCard';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('LeagueCard', () => {
  const mockPush = jest.fn();
  const league = {
    id: 99,
    name: 'Ekstraklasa',
    logo: 'https://logo.test/ekstraklasa.png',
    country: 'Polska',
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockPush.mockClear();
  });

  it('wyświetla nazwę ligi, kraj i logo', () => {
    const { getByText, getByTestId } = render(<LeagueCard league={league} />);
    expect(getByText('Ekstraklasa')).toBeTruthy();
    expect(getByText('Polska')).toBeTruthy();

    const logo = getByTestId('league-logo');
    expect(logo.props.source).toEqual({ uri: league.logo });
  });

  it('nawiguje do odpowiedniej ścieżki po naciśnięciu', () => {
    const { getByTestId } = render(<LeagueCard league={league} />);
    fireEvent.press(getByTestId('league-card'));
    expect(mockPush).toHaveBeenCalledWith('/league/99');
  });
});
