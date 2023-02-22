class YoutubeConnector {
  isExternal = true;

  getParameters() {
    return [
      {
        id: 'key',
        label: 'API key',
        type: 'text',
        required: true,
      },
      {
        id: 'channel',
        label: 'YouTube channel ID',
        type: 'text',
      },
      {
        id: 'account',
        label: 'YouTube account name (without @ prefix)',
        type: 'text',
      },
    ];
  }

  handleParameters(params) {
    localStorage.setItem('YOUTUBE_API_KEY', params.key);
    if (params.account && !params.channel) {
      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${params.account}&key=${params.key}`,
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.items.length > 0) {
            localStorage.setItem('YOUTUBE_CHANNEL', response.items[0].id);
          } else {
            throw new Error('No channel found');
          }
        });
    } else {
      localStorage.setItem('YOUTUBE_CHANNEL', params.channel);
    }
  }

  getFiles(query, pageSize, nextPageToken) {
    const apiKey = localStorage.getItem('YOUTUBE_API_KEY');
    const channel = localStorage.getItem('YOUTUBE_CHANNEL');
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&order=date&maxResults=${
      pageSize || 50
    }&channelId=${channel}&q=${encodeURIComponent(query)}&key=${apiKey}`;
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        return {
          items: response.items
            .filter((video) => video.id.kind === 'youtube#video')
            .map((item) => ({
              uuid: item.id.videoId,
              title: item.snippet.title,
              originalId: item.id.videoId,
            })),
          nextPage: response.nextPageToken ? () => this.getFiles(query, pageSize, response.nextPageToken) : undefined,
        };
      });
  }

  getLink(item) {
    return Promise.resolve({ uri: `https://www.youtube.com/watch?v=${item.originalId}` });
  }
}

const YOUTUBE_CONNECTOR = {
  id: 'youtube',
  title: 'YouTube',
  logo: 'https://nuclia.github.io/status/connectors/youtube.svg',
  description: 'Online video sharing',
  factory: () => new YoutubeConnector(),
};
registerConnector(YOUTUBE_CONNECTOR);
