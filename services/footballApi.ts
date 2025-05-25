import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { BASE_URL } from '@constants/api';
import { FOOTBALL_API_KEY } from '@env';

console.log('Football API Key:', FOOTBALL_API_KEY);

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY || '' },
});

const CACHE_TTL = 24 * 60 * 60 * 1000;

interface Cached<T> {
  timestamp: number;
  data: T;
}

async function getCachedOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();

  const { isConnected } = await NetInfo.fetch();

  const raw = await AsyncStorage.getItem(key);
  if (raw) {
    try {
      const { timestamp, data } = JSON.parse(raw) as Cached<T>;
      if (!isConnected || now - timestamp < CACHE_TTL) {
        return data;
      }
    } catch {}
  }

  const data = await fetcher();

  await AsyncStorage.setItem(key, JSON.stringify({ timestamp: now, data } as Cached<T>));
  return data;
}

const TOP_IDS = [39, 140, 135, 78, 61];

export const fetchTopLeagues = () =>
  getCachedOrFetch('topLeagues', async () => {
    const response = await api.get('/leagues');
    return response.data.response
      .filter((item: any) => TOP_IDS.includes(item.league.id))
      .map((item: any) => ({
        id: item.league.id,
        name: item.league.name,
        logo: item.league.logo,
        country: item.country.name,
      }));
  });

export const fetchLeagueTable = (leagueId: string) =>
  getCachedOrFetch(`leagueTable_${leagueId}`, async () => {
    const response = await api.get(`/standings?league=${leagueId}&season=2023`);

    return response.data.response[0]?.league.standings[0] || [];
  });

export const fetchTeamDetails = (teamId: string) =>
  getCachedOrFetch(`teamDetails_${teamId}`, async () => {
    const teamResp = await api.get(`/teams?id=${teamId}`);
    const team = teamResp.data.response[0]?.team;
    const squadResp = await api.get(`/players?team=${teamId}&season=2023`);
    const squad = squadResp.data.response.map((p: any) => p.player);
    return { ...team, squad };
  });
