import { rest } from '..';
const youtubeService = rest.Youtube;

const playlistLessThan100 = 'https://www.youtube.com/watch?v=TKYsuU86-DQ&list=PL0eyrZgxdwhwNC5ppZo_dYGVjerQY3xYU';

const playlistGreaterThan100 = 'https://www.youtube.com/playlist?list=PLuUrokoVSxlcgocBXbDF76yWd3YKWpOH9';

const mockSongOne = {
  artist: 'Undefined',
  track: 'Dio - Dansen In Jou live op Lowlands 2012'
};

const mockSongTwo = {
  artist: undefined,
  track: 'alt-j she she she live op lowlands 2012'
};

const mockSongThree = {
  artist: '',
  track: 'The Black Keys - Gold on the Ceiling'
};

describe('Youtube tests', () => {
  it('should able to get playlist less than 100 tracks', async () => {
    const tracks = await youtubeService.handleYoutubePlaylist(playlistLessThan100);
    expect(tracks.length).toBeGreaterThan(0);

    const oneTrack = tracks[0];
    expect(oneTrack.name.length).not.toEqual(0);
    expect(oneTrack.thumbnail.length).not.toEqual(0);
    expect(oneTrack.artist).toBeDefined();
    expect(oneTrack.streams.length).toEqual(1);
    expect(oneTrack.streams[0].id.length).not.toEqual(0);
    expect(oneTrack.streams[0].source).toBe('Youtube');
  });

  it('should able to get playlist more than 100 track', async () => {
    const tracks = await youtubeService.handleYoutubePlaylist(playlistGreaterThan100);
    expect(tracks.length).toBeGreaterThan(100);

    const oneTrack = tracks[0];
    expect(oneTrack.name.length).not.toEqual(0);
    expect(oneTrack.thumbnail.length).not.toEqual(0);
    expect(oneTrack.artist).toBeDefined();
    expect(oneTrack.streams.length).toEqual(1);
    expect(oneTrack.streams[0].id.length).not.toEqual(0);
    expect(oneTrack.streams[0].source).toBe('Youtube');
  });

  it('should run search queries without error when artist is not given or Undefined', async () => {
    let errorOccurrence = false;

    try {
      const resultOne = await youtubeService.trackSearchByString(mockSongOne, 'youtube');
      const resultTwo = await youtubeService.trackSearchByString(mockSongTwo, 'youtube');
      const resultThree = await youtubeService.trackSearchByString(mockSongThree, 'youtube');
    } catch (error) {
      errorOccurrence = true;
    }

    expect(errorOccurrence).toBe(false);
  });

  it('should return empty array if the url is invalid', async () => {
    const tracks = await youtubeService.handleYoutubePlaylist('invalid url');
    expect(tracks).toHaveLength(0);
  });
});
