import { render, fireEvent } from '@testing-library/react-native';
import TeamCard from '../components/TeamCard';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('TeamCard', () => {
  const mockPush = jest.fn();
  const team = { id: 1, name: 'Test FC', logo: 'https://logo.test.png' };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockPush.mockClear();
  });

  it('renderuje nazwę drużyny i logo', () => {
    const { getByText, getByTestId } = render(<TeamCard team={team} />);
    expect(getByText('Test FC')).toBeTruthy();

    const logo = getByTestId('team-logo');
    expect(logo.props.source).toEqual({ uri: team.logo });
  });

  it('wywołuje nawigację z poprawną ścieżką po naciśnięciu', () => {
    const { getByTestId } = render(<TeamCard team={team} />);
    fireEvent.press(getByTestId('team-card'));
    expect(mockPush).toHaveBeenCalledWith('/team/1');
  });
});
